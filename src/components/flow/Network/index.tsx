import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import {
  forceCenter,
  forceLink,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';
import { max, min } from 'd3-array';
import useTooltip, { TooltipObjectType } from '../../../hooks/useTooltip';

import React from 'react';
import { drag } from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

interface EdgeType {
  source: string;
  target: string;
  [key: string]: any;
}
interface NodeType {
  [key: string]: any;
}

interface SizeType {
  key?: string;
  min?: number;
  max?: number;
  default?: number;
}

export interface NetworkProps {
  id: string;
  className?: string;
  nodes: Array<NodeType>; // Data of actual nodes
  edges: Array<EdgeType>; // Data of edges connecting the nodes
  dragging?: {
    enabled?: boolean;
    snapToNewPosition?: boolean;
  };
  nodeDef: {
    idKey: string;
    weightKey?: string;
    className?: string; // tailwindClass, Applies to all nodes
    classNameKey?: string; // Style by this key
    classNameMap?: object; // Provide mapping for styling by this key
    xKey?: string;
    yKey?: string;
    size?: SizeType;
    tooltip?: TooltipObjectType;
  };
  edgeDef?: {
    size?: SizeType;
    curve?: number;
    className?: string; // tailwindClass, Applies to all edges
    classNameKey?: string; // style by this key
    classNameMap?: object; // Provide mapping to style by this key
    tooltip?: TooltipObjectType;
  };
}

const Network: React.FC<NetworkProps> = ({
  id,
  className,
  nodes,
  edges,
  dragging = {
    enabled: false,
    snapToNewPosition: false,
  },
  nodeDef,
  edgeDef,
  ...props
}) => {
  const refreshData = React.useCallback(() => {
    const svg = select(`#${id}`);

    const {
      onMouseLeave: onMouseLeaveNode,
      onMouseMove: onMouseMoveNode,
      onMouseOver: onMouseOverNode,
    } = useTooltip({
      tooltip: nodeDef?.tooltip,
      defaultHtml: (d: any) => `${d[nodeDef?.idKey]}`,
      id,
    });

    const {
      onMouseLeave: onMouseLeaveEdge,
      onMouseMove: onMouseMoveEdge,
      onMouseOver: onMouseOverEdge,
    } = useTooltip({
      tooltip: edgeDef?.tooltip,
      defaultHtml: (d: any) => {
        return `${d.source[nodeDef.idKey]} -> ${d.target[nodeDef.idKey]}`;
      },
      id,
    });

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const ticked = () => {
      link.attr('d', (d: any) => {
        const x1 = nodeDef?.xKey ? d.source[nodeDef?.xKey] : d.source.x;
        const y1 = nodeDef?.yKey ? d.source[nodeDef?.yKey] : d.source.y;
        const x2 = nodeDef?.xKey ? d.target[nodeDef?.xKey] : d.target.x;
        const y2 = nodeDef?.yKey ? d.target[nodeDef?.yKey] : d.target.y;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const dr = distance * (edgeDef?.curve || 0);

        return `M${x1},${y1}A${dr},${dr} 0 0,1 ${x2},${y2}`;
      });

      node
        .attr('cx', (d) => (nodeDef?.xKey ? d[nodeDef?.xKey] : d.x))
        .attr('cy', (d) => (nodeDef?.yKey ? d[nodeDef?.yKey] : d.y));
    };

    // @ts-ignore
    const simulation = forceSimulation(nodes)
      .force(
        'link',
        // @ts-ignore
        forceLink(edges).id((d) => d.id)
      )
      // @ts-ignore
      .tick(ticked);

    if (nodeDef?.xKey && nodeDef?.yKey) {
      simulation.force(
        'x',
        // @ts-ignore
        (d) => forceX(d).strength(1)
      );
      simulation.force(
        'y',
        // @ts-ignore
        (d) => forceY(d).strength(1)
      );
    } else {
      simulation.force(`center`, forceCenter(width / 2, height / 2));
    }

    const strokeWidthScale =
      edgeDef?.size?.min &&
      edgeDef?.size?.max &&
      scaleLinear()
        .domain([
          min(edges, (d: any) =>
            edgeDef?.size?.key ? d[edgeDef?.size?.key] : 1
          ),
          max(edges, (d: any) =>
            edgeDef?.size?.key ? d[edgeDef?.size.key] : 1
          ),
        ])
        .range([edgeDef?.size.min, edgeDef?.size.max]);

    const link = svg
      .append('g')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(edges)
      .join('path')
      .attr('class', (d: any) =>
        mergeTailwindClasses(edgeDef?.className, 'stroke-black fill-none')
      )
      .attr('stroke-width', (d: any) =>
        strokeWidthScale
          ? // @ts-ignore
            strokeWidthScale(d[edgeDef?.size?.key])
          : edgeDef?.size?.default || 1
      );

    const sizeScale =
      nodeDef?.size &&
      nodeDef?.size.min &&
      nodeDef?.size.max &&
      scaleLinear()
        .domain([
          min(nodes, (d: any) =>
            nodeDef?.size?.key ? d[nodeDef?.size?.key] : 1
          ),
          max(nodes, (d: any) =>
            nodeDef?.size?.key ? d[nodeDef?.size.key] : 1
          ),
        ])
        .range([nodeDef?.size.min, nodeDef?.size.max]);

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) =>
        sizeScale
          ? // @ts-ignore
            sizeScale(d[nodeDef?.size?.key])
          : nodeDef?.size?.default || 5
      )
      .attr('class', (d) =>
        mergeTailwindClasses(
          nodeDef?.className,
          nodeDef?.classNameKey &&
            nodeDef?.classNameMap && // @ts-ignore
            nodeDef?.classNameMap[d[nodeDef?.classNameKey]]
        )
      );

    nodeDef?.tooltip &&
      node
        .on('mouseover', onMouseOverNode)
        .on('mousemove', onMouseMoveNode)
        .on('mouseleave', onMouseLeaveNode);

    edgeDef?.tooltip &&
      link
        .on('mouseover', onMouseOverEdge)
        .on('mousemove', onMouseMoveEdge)
        .on('mouseleave', onMouseLeaveEdge);

    dragging.enabled &&
      node.call(
        // @ts-ignore
        drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
      );

    simulation.on('tick', ticked);

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = dragging.snapToNewPosition ? event.x : null;
      event.subject.fy = dragging.snapToNewPosition ? event.y : null;
    }
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <svg
      className={mergeTailwindClasses(defaultChartClassNames, className)}
      id={id}
      {...props}
    />
  );
};

export default Network;
