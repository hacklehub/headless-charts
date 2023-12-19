import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { extent, max, min } from 'd3-array';
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
} from 'd3-force';
import useTooltip, { TooltipObjectType } from '../../../hooks/useTooltip';

import { ChartProps } from '../../../types';
import React from 'react';
import { drag } from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { zoom } from 'd3-zoom';

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

export interface NetworkProps extends ChartProps {
  id: string;
  className?: string;
  nodes: Array<NodeType>; // Data of actual nodes
  edges: Array<EdgeType>; // Data of edges connecting the nodes
  dragging?: {
    enabled?: boolean;
    snapToNewPosition?: boolean;
  };
  zooming?: {
    enabled?: boolean;
    min?: number;
    max?: number;
  };
  nodeDef: {
    idKey: string;
    weightKey?: string;
    className?: string; // tailwindClass, Applies to all nodes
    classNameKey?: string; // Style by this key
    classNameMap?: object; // Provide mapping for styling by this key
    x?: {
      key: string;
      ticks?: number;
      showAxis?: boolean;
    };
    y?: {
      key: string;
      ticks?: number;
      showAxis?: boolean;
    };

    size?: SizeType;
    tooltip?: TooltipObjectType;
  };
  edgeDef: {
    sourceKey: string;
    targetKey: string;
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
  padding = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  },
  margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
  },
  nodeDef = {
    idKey: 'id',
  },
  edgeDef = {
    sourceKey: 'source',
    targetKey: 'target',
  },
  zooming = {},
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

    const g = svg.append('g');

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const xScale =
      nodeDef?.x?.key &&
      scaleLinear()
        .range([
          (padding?.left || 0) + (margin?.left || 0),
          width - (margin?.right || 0) - (padding.right || 0),
        ])
        .domain(
          // @ts-ignore
          extent(nodes, (d: any) => d[nodeDef?.x?.key])
        );

    const yScale =
      nodeDef?.y?.key &&
      scaleLinear()
        .range([
          height - (padding?.bottom || 0) - (margin?.bottom || 0),
          (padding?.top || 0) + (margin?.top || 0),
        ])
        .domain(
          // @ts-ignore
          extent(nodes, (d: any) => d[nodeDef?.y?.key])
        );

    const xAxisFn = xScale && axisBottom(xScale).ticks(5);

    xAxisFn &&
      g
        .append('g')
        .attr('transform', `translate(0,${height - (margin?.bottom || 0)})`)
        .call(xAxisFn);

    const yAxisFn = yScale && axisLeft(yScale).ticks(5);

    yAxisFn &&
      g
        .append('g')
        .attr('transform', `translate(${margin?.left || 0},0)`)
        .call(yAxisFn);

    const ticked = () => {
      link.attr('d', (d: any) => {
        const x1 =
          nodeDef?.x?.key && xScale
            ? xScale(d.source[nodeDef?.x?.key])
            : d.source.x;
        const y1 =
          nodeDef?.y?.key && yScale
            ? yScale(d.source[nodeDef?.y?.key])
            : d.source.y;
        const x2 =
          nodeDef?.x?.key && xScale
            ? xScale(d.target[nodeDef?.x?.key])
            : d.target.x;
        const y2 =
          nodeDef?.y?.key && yScale
            ? yScale(d.target[nodeDef?.y?.key])
            : d.target.y;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const dr = distance * (edgeDef?.curve || 0);

        return `M${x1},${y1}A${dr},${dr} 0 0,1 ${x2},${y2}`;
      });

      node
        .attr('cx', (d) =>
          nodeDef?.x?.key && xScale ? xScale(d[nodeDef?.x?.key]) : d.x
        )
        .attr('cy', (d) =>
          nodeDef?.y?.key && yScale ? yScale(d[nodeDef?.y?.key]) : d.y
        );
    };

    // @ts-ignore
    const simulation = forceSimulation(nodes)
      .force(
        'link',
        // @ts-ignore
        forceLink(edges).id((d) => d[nodeDef?.idKey])
      )
      // @ts-ignore
      .tick(ticked);

    simulation
      .force(`center`, forceCenter(width / 2, height / 2))
      .force('charge', forceManyBody().strength(-400));

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

    const link = g
      .append('g')
      .selectAll('line')
      .data(edges)
      .join('path')
      .attr('class', (d: any) =>
        mergeTailwindClasses(
          d.className,
          edgeDef?.className,
          'stroke-black fill-none'
        )
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

    const node = g
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
          d.className,
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

    if (zooming?.enabled) {
      const zoomed = ({ transform }: any) => {
        g.attr('transform', transform);
      };

      const zoomFn =
        zooming?.min &&
        zooming?.max &&
        zoom()
          .scaleExtent([zooming.min, zooming.max])
          .translateExtent([
            [0, 0],
            [width, height],
          ])
          .on('zoom', zoomed);
      // @ts-ignore
      svg.call(zoomFn);
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
