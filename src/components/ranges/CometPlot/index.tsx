/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZoomTransform, zoom } from 'd3-zoom';
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, min } from 'd3-array';
import { pointer, select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
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

import { ChartProps } from '../../../types';
import React from 'react';
import { mergeTailwindClasses } from '../../../utils';
import { transition } from 'd3-transition';

export interface DotPlotProps extends ChartProps {
  y: {
    key: string;
    axis?: 'left' | 'right';
  };
  x: {
    minKey: string;
    maxKey: string;
    start?: number;
    end?: number;
    axis?: 'top' | 'bottom';
    axisTicks?: number;
    className?: string;
  };
  size?: number;
  shape?:
    | 'circle'
    | 'diamond'
    | 'triangle'
    | 'square'
    | 'cross'
    | 'star'
    | 'wye';
  tooltip?: {
    html?: (d: any) => string;
    keys?: string[];
    className?: string;
  };
}

const DotPlot = ({
  id,
  className,
  data = [],
  y = { key: 'label' },
  x,
  margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 20,
  },
  padding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  size,
  shape = 'circle',
  tooltip = {},
  zooming = {
    enabled: false,
  },
}: DotPlotProps) => {
  const refreshChart = React.useCallback(() => {
    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };
    const svg = select<SVGSVGElement, unknown>(`#${id}`);
    // Clear svg

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(x.start)
          ? x.start
          : min(data.map((d: any) => d[x.minKey])),
        Number.isFinite(x.end) ? x.end : max(data.map((d: any) => d[x.maxKey])),
      ])
      .range([margin.left, width - (padding.right || 0) - margin.right]);

    const yFn = scaleBand()
      .domain(data.map((d: any) => d[y.key]))
      .range([
        margin.top + (padding.top || 0),
        height - margin.bottom - (padding.bottom || 0),
      ]);

    const yAxis = y.axis === 'right' ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${y.axis === 'right' ? margin.left + width : margin.left},0)`
      );

    yAxisG.call(yAxis);
    padding.bottom &&
      yAxisG
        .append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', margin.top + height - padding.bottom)
        .attr('y2', margin.top + height)
        .attr('stroke', 'currentColor');

    const xAxis =
      x.axis === 'top'
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');

    xAxisG
      .attr(
        'transform',
        `translate(0, ${
          x.axis === 'top' ? margin.top : height - margin.bottom
        })`
      )
      .call(xAxis);

    const tooltipDiv = select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr('class', `tooltip ${(tooltip && tooltip.className) || ''}`);

    svg
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top - (padding.top || 0) - 10)
      .attr('width', width)
      .attr('height', height + (padding.bottom || 0) + 8);

    const dataG = g
      .append('g')
      .attr('class', 'data')
      .attr('clip-path', 'url(#clip)');

    const dotRowsG = dataG
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .on('mouseenter', function (event: MouseEvent, d: any) {
        tooltip && tooltipDiv.style('opacity', 1);
        const [bX, bY] = pointer(event, select('body'));
        tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
        tooltipDiv.html(
          tooltip && tooltip.html
            ? tooltip.html(d)
            : tooltip.keys
            ? tooltip.keys.map((key) => `${key}: ${d[key] || ''}`).join('<br/>')
            : `${d[y.key]}: ${d[x.minKey]} to ${d[x.maxKey]}`
        );
      })
      .on('mouseleave', function () {
        tooltip &&
          tooltipDiv
            .style('opacity', '0')
            .style('left', `0px`)
            .style('top', `0px`);
      });

    transition();

    dotRowsG
      .append('polyline')
      .attr('clip-path', 'url(#clip)')
      .attr('class', (d: any) =>
        mergeTailwindClasses(
          `comet-tail fill-current stroke-0`,
          x.className || '',
          d.className || ''
        )
      )
      .attr(
        'points',
        (d: any) =>
          `${xFn(d[x.minKey])} ${
            (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2
          }, ${xFn(d[x.minKey])} ${
            (yFn(d[y.key]) || 0) +
            yFn.bandwidth() / 2 -
            Math.sqrt((size || 100) / 4) -
            1
          }, ${xFn(d[x.minKey])} ${
            (yFn(d[y.key]) || 0) +
            Math.sqrt((size || 100) / 4) +
            yFn.bandwidth() / 2 +
            1
          }`
      )
      .transition()
      .duration(1000)
      .attr(
        'points',
        (d: any) =>
          `${xFn(d[x.minKey])} ${
            (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2
          }, ${xFn(d[x.maxKey])} ${
            (yFn(d[y.key]) || 0) -
            Math.sqrt((size || 100) / 4) +
            yFn.bandwidth() / 2 -
            1
          }, ${xFn(d[x.maxKey])} ${
            (yFn(d[y.key]) || 0) +
            Math.sqrt((size || 100) / 4) +
            yFn.bandwidth() / 2 +
            1
          }`
      );

    dotRowsG
      .append('path')
      .attr('class', (d: any) =>
        mergeTailwindClasses(
          `fill-current end-dots stroke-current stroke-0`,
          x.className || '',
          d.className || ''
        )
      )
      .attr('d', () => symbol(shapeMapping[shape], size || 100)())
      .attr(
        'transform',
        (d: any) =>
          `translate(${xFn(d[x.minKey])},${
            (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2
          })`
      )
      .transition()
      .duration(1000)
      .attr(
        'transform',
        (d: any) =>
          `translate(${xFn(d[x.maxKey])},${
            (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2
          })`
      );

    if (zooming?.enabled) {
      const zoomed = ({ transform }: { transform: ZoomTransform }) => {
        // transform g across only x axis
        dotRowsG.attr(
          'transform',
          `translate(${transform.x},0)scale(${transform.k},1)`
        );
        xAxisG.call(xAxis.scale(transform.rescaleX(xFn)));
      };

      const zoomFn = zoom<SVGSVGElement, unknown>()
        .scaleExtent([zooming.min || 1, zooming.max || 2])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on('zoom', zoomed);

      svg.call(zoomFn);
    }
  }, [data, id, margin, padding, shape, size, tooltip, x, y, zooming]);

  React.useEffect(() => {
    refreshChart();

    return () => {
      select(`#${id}`).selectAll('*').remove();
    };
  }, [data, refreshChart, id]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart h-64`,
        className || ''
      )}
    />
  );
};

export default DotPlot;
