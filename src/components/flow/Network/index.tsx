import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { extent, max, min } from 'd3-array';
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';
import {
  symbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye,
} from 'd3-shape';
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

interface ShapeType {
  key?: string;
  map?: {
    [key: string]:
      | 'circle'
      | 'diamond'
      | 'triangle'
      | 'square'
      | 'cross'
      | 'star'
      | 'wye';
  };
  default?: string;
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
      axis?: 'top' | 'bottom';
      className?: string;
    };
    y?: {
      key: string;
      ticks?: number;
      axis?: 'left' | 'right';
    };
    size?: SizeType;
    tooltip?: TooltipObjectType;
    shape?: ShapeType;
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
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
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

    if (xScale && nodeDef?.x?.axis) {
      const xAxisFn =
        nodeDef?.x?.axis === 'top'
          ? axisTop(xScale).ticks(nodeDef?.x?.ticks || 5)
          : // @ts-ignore
            axisBottom(xScale).ticks(nodeDef?.x?.ticks || 5);

      g.append('g')
        .attr(
          'transform',
          `translate(0,${
            nodeDef?.x?.axis === 'top'
              ? margin.top
              : height - (margin?.bottom || 0)
          })`
        )
        .attr('class', mergeTailwindClasses(nodeDef?.x?.className))
        .call(xAxisFn);
    }

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

    if (yScale && nodeDef?.y?.axis) {
      const yAxisFn =
        nodeDef?.y?.axis === 'right'
          ? axisRight(yScale).ticks(nodeDef?.y?.ticks || 5)
          : // @ts-ignore
            axisLeft(yScale).ticks(nodeDef?.y?.ticks || 5);

      // @ts-ignore

      g.append('g')
        .attr(
          'transform',
          `translate(${
            nodeDef?.y?.axis === 'right'
              ? width - (margin.right || 0)
              : margin?.left || 0
          },0)`
        )
        .call(yAxisFn);
    }
    // Do similar for x

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
        .attr('d', (d: any) => {
          return symbol(
            nodeDef?.shape?.map
              ? // @ts-ignore
                shapeMapping[nodeDef?.shape?.map[d[nodeDef?.shape.key]]]
              : symbolCircle,
            sizeScale
              ? // @ts-ignore
                sizeScale(d[nodeDef?.size?.key])
              : nodeDef?.size?.default || 75
          )();
        })
        .attr(
          'transform',
          (d: any) =>
            `translate(${
              nodeDef?.x?.key && xScale ? xScale(d[nodeDef?.x?.key]) : d.x
            },${nodeDef?.y?.key && yScale ? yScale(d[nodeDef?.y?.key]) : d.y})`
        );
    };

    // @ts-ignore
    const simulation = forceSimulation(nodes)
      // Need to force links as edges
      .force(
        'link',
        // @ts-ignore
        forceLink(edges).id((d) => d[nodeDef?.idKey])
      )
      // Need to force x so that disjointed nodes don't go out of screen
      .force('x', forceX())
      // Need to force y so that disjointed nodes don't go out of screen
      .force('y', forceY())
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
          'stroke-black fill-none',
          edgeDef?.className,
          edgeDef?.classNameKey &&
            edgeDef?.classNameMap && // @ts-ignore
            edgeDef?.classNameMap[d[edgeDef?.classNameKey]],
          d.className
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

    const shapeMapping: any = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };

    const node = g
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('path')
      .attr('class', (d) =>
        mergeTailwindClasses(
          'fill-black stroke-none',
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
