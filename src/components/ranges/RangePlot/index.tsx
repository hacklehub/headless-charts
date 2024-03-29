import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, min } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
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
import { useCallback, useEffect } from 'react';
import useTooltip, { TooltipObjectType } from '../../../hooks/useTooltip';

import { ChartProps } from '../../../types';
import { defaultChartClassNames } from '../../../utils';
import { transition } from 'd3-transition';
import { twMerge } from 'tailwind-merge';
import { zoom } from 'd3-zoom';

interface RangePlotProps extends ChartProps {
  classNameData?: string;
  shape: 'circle';
  y: {
    [key: string]: string;
    axis: 'left' | 'right';
  };
  x: {
    start: number;
    end: number;
    minKey: string;
    maxKey: string;
    axis: 'bottom' | 'top';
    axisTicks: number;
  };
  tooltip?: TooltipObjectType;
}

const RangePlot = ({
  id,
  className,
  data = [],
  classNameData,
  y = { key: 'label', axis: 'left' },
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
  shape = 'circle',
  tooltip = {},
  zooming,
  style = {},
}: RangePlotProps) => {
  const { onMouseOver, onMouseMove, onMouseLeave } = useTooltip({
    id,
    tooltip,
    defaultHtml: (d: any) => `${d[y.key]}: ${d[x.minKey]} to ${d[x.maxKey]}`,
  });
  const refreshChart = useCallback(() => {
    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0];
    const height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const xFn = scaleLinear()
      /* eslint-disable */
      .domain([
        // @ts-ignore
        Number.isFinite(x.start) ? x.start : min(data.map((d) => d[x.minKey])),
        // @ts-ignore
        Number.isFinite(x.end) ? x.end : max(data.map((d) => d[x.maxKey])),
      ])
      // @ts-ignore
      .range([margin.left, width - padding.right - margin.right]);

    const yFn = scaleBand()
      // @ts-ignore
      .domain(data.map((d) => d[y.key]))
      .range([
        // @ts-ignore
        margin.top + padding.top,
        // @ts-ignore
        height - margin.bottom - padding.bottom,
      ]);

    svg
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', margin.left)
      // @ts-ignore
      .attr('y', margin.top - padding.top - 10)
      .attr('width', width)
      // @ts-ignore
      .attr('height', height + padding.bottom + 8);

    const dataG = g
      .append('g')
      .attr('class', 'data')
      .attr('clip-path', 'url(#clip)');

    const dotRowsG = dataG
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .on('mouseenter', onMouseOver)
      .on('mousemove', onMouseMove)
      .on('mouseleave', onMouseLeave);

    transition();

    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      // @ts-ignore
      .attr('x1', (d) => xFn(d[x.minKey]))
      // @ts-ignore
      .attr('x2', (d) => xFn(d[x.minKey]))
      // @ts-ignore
      .attr('y1', (d) => yFn(d[y.key]) + yFn.bandwidth() / 2)
      // @ts-ignore
      .attr('y2', (d) => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr('class', `dot-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      // @ts-ignore
      .attr('x2', (d) => xFn(d[x.maxKey]));

    dotRowsG
      .append('path')
      .attr('class', `start-dots fill-current ${classNameData || ''} `)
      .attr('d', () => symbol(shapeMapping[shape], 100)())
      .attr(
        'transform',
        (d) =>
          // @ts-ignore
          `translate(${xFn(d[x.minKey])},${
            // @ts-ignore
            yFn(d[y.key]) + yFn.bandwidth() / 2
          })`
      );

    dotRowsG
      .append('path')
      .attr('class', `end-dots fill-current ${classNameData || ''} `)
      .attr('d', () => symbol(shapeMapping[shape], 100)())
      .attr(
        'transform',
        (d) =>
          // @ts-ignore
          `translate(${xFn(d[x.minKey])},${
            // @ts-ignore
            yFn(d[y.key]) + yFn.bandwidth() / 2
          })`
      )
      .transition()
      .duration(1000)
      .attr(
        'transform',
        (d) =>
          // @ts-ignore
          `translate(${xFn(d[x.maxKey])},${
            // @ts-ignore
            yFn(d[y.key]) + yFn.bandwidth() / 2
          })`
      );

    const redraw = () => {
      selectAll('.dot-plot-line')
        // @ts-ignore
        .attr('x1', (d) => xFn(d[x.minKey]))
        // @ts-ignore
        .attr('x2', (d) => xFn(d[x.maxKey]));

      selectAll('.start-dots').attr(
        'transform',
        (d) =>
          // @ts-ignore
          `translate(${xFn(d[x.minKey])},${
            // @ts-ignore
            yFn(d[y.key]) + yFn.bandwidth() / 2
          })`
      );
      selectAll('.end-dots').attr(
        'transform',
        (d) =>
          // @ts-ignore
          `translate(${xFn(d[x.maxKey])},${
            // @ts-ignore
            yFn(d[y.key]) + yFn.bandwidth() / 2
          })`
      );
    };

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

    if (zooming) {
      const extent = [
        [margin.left, margin.top],
        [width, height],
      ];

      const zoomFunc = zoom()
        .scaleExtent([1, 4])
        // @ts-ignore
        .extent(extent)
        // @ts-ignore
        .translateExtent(extent)
        .on('zoom', zoomed);

      // @ts-ignore
      function zoomed(event) {
        xFn.range(
          // @ts-ignore
          [margin.left, width - padding.right - margin.right].map((d) =>
            event.transform.applyX(d)
          )
        );
        xAxisG.call(xAxis);
        redraw();
      }
      /* eslint-enable */
      svg.call(zoomFunc);
    }
  }, [
    classNameData,
    data,
    id,
    margin,
    padding,
    shape,
    x,
    y,
    zooming,
    onMouseLeave,
    onMouseMove,
    onMouseOver,
  ]);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, refreshChart]);
  return (
    <svg
      id={id}
      style={style}
      className={twMerge(defaultChartClassNames, className)}
    />
  );
};

export default RangePlot;
