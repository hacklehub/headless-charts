import React, { useEffect } from 'react';
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames } from '../../../utils';
import { twMerge } from 'tailwind-merge';
import { max, min } from 'd3-array';
import { pointer, select, selectAll } from 'd3-selection';
import { scaleLinear, scalePoint } from 'd3-scale';
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
import { transition } from 'd3-transition';

export interface LollipopHChartProps extends ChartProps {
  classNamePoints?: string;
  classNameLines?: string;
  classNameSymbols?: string;
  tooltip?: {
    className?: string;
    html?: (d: any) => string;
    keys?: string[];
  };
  shape?:
    | 'circle'
    | 'diamond'
    | 'triangle'
    | 'square'
    | 'cross'
    | 'star'
    | 'wye';
  x?: {
    key: string;
    start?: number;
    end?: number;
    axis?: 'top' | 'bottom';
    axisTicks?: number;
  };
  y?: {
    key: string;
    axis?: 'left' | 'right';
  };
}

const LollipopHChart = ({
  data = [],
  id,
  className,
  classNamePoints,
  classNameLines,
  classNameSymbols,
  margin = {
    left: 80,
    right: 40,
    top: 40,
    bottom: 40,
  },
  padding = {
    left: 10,
    right: 0,
    top: 0,
    bottom: 20,
  },
  tooltip = undefined,
  shape = 'circle',
  x = { key: 'x', axis: 'bottom', axisTicks: 2 },
  y = { key: 'y', axis: 'left' },
}: LollipopHChartProps) => {
  const refreshChart = React.useCallback(() => {
    const svg = select(`#${id}`);

    // Clear svg

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    data.sort((a: any, b: any) => b[x.key] - a[x.key]);

    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(x.start) ? x.start : min(data, (d: any) => d[x.key]),
        Number.isFinite(x.end) ? x.end : max(data, (d: any) => d[x.key]),
      ])
      .range([
        (margin.left || 0) + (padding.left || 0),
        width - (padding.right || 0) - (margin.right || 0),
      ]);

    const yFn = scalePoint()
      .domain(data.map((d: any) => d[y.key]))
      // .range([height + (margin.top ||0) - (padding.bottom ||0), (margin.top ||0) + (padding.top ||0)])
      .range([
        (margin.top || 0) + (padding.top || 0),
        height - (margin.bottom || 0) - (padding.bottom || 0),
      ]);

    const g = svg.append('g');

    const xAxis =
      x.axis === 'top'
        ? axisTop(xFn).ticks(x.axisTicks || 2)
        : axisBottom(xFn).ticks(x.axisTicks || 2);

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');

    xAxisG
      .attr(
        'transform',
        `translate(0, ${
          x.axis === 'top' ? margin.top || 0 : height - (margin.bottom || 0)
        })`
      )
      .call(xAxis);

    const yAxis = y.axis === 'right' ? axisRight(yFn) : axisLeft(yFn);

    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${
          y.axis === 'right' ? (margin.left || 0) + width : margin.left || 0
        },0)`
      );

    (padding.left || 0) &&
      xAxisG
        .append('line')
        .attr('x1', margin.left || 0)
        .attr('x2', (margin.left || 0) + (padding.left || 0))
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', 'currentColor');

    (padding.bottom || 0) &&
      yAxisG
        .append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', (margin.top || 0) + height - (padding.bottom || 0))
        .attr('y2', (margin.top || 0) + height)
        .attr('stroke', 'currentColor');

    yAxisG.call(yAxis);

    const dataGroup = g.append('g');

    const drawLinesAndCircles = () => {
      const pointGroup = dataGroup
        .selectAll('.line')
        .data(data)
        .enter()
        .append('g')
        .on('mouseover', function (event, d: any) {
          tooltip && tooltipDiv.style('opacity', 1);
          const [bX, bY] = pointer(event, select('body'));
          tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
          tooltipDiv.html(
            tooltip && tooltip.html
              ? tooltip.html(d)
              : tooltip?.keys
              ? tooltip?.keys
                  .map((key) => `${key}: ${d[key] || ''}`)
                  .join('<br/>')
              : `${d[y.key]}: ${d[x.key]}`
          );
        })
        .on('mouseleave', function () {
          tooltip && tooltipDiv.style('opacity', '0');
        });

      transition();

      pointGroup
        .append('line')
        .attr(
          'class',
          twMerge(
            `stroke-2 stroke-current`,
            classNamePoints || '',
            classNameLines || ''
          )
        )
        .attr('x1', (margin.left || 0) + (padding.left || 0))
        .attr('y1', (d: any) => yFn(d[y.key]) || 0)
        .attr('x2', margin.left || 0)
        .attr('y2', (d: any) => yFn(d[y.key]) || 0)
        .transition()
        .duration(1000)
        .attr('x2', (d: any) => xFn(d[x.key]));

      pointGroup
        .append('path')
        .attr('class', twMerge(classNamePoints || '', classNameSymbols || ``))
        .attr('d', () => symbol(shapeMapping[shape], 100)())
        .attr(
          'transform',
          (d: any) =>
            `translate(${(margin.left || 0) + (padding.left || 0)},${yFn(
              d[y.key]
            )})`
        )
        .transition()
        .duration(1000)
        .attr(
          'transform',
          (d: any) => `translate(${xFn(d[x.key])},${yFn(d[y.key])} )`
        );
    };

    drawLinesAndCircles();

    const tooltipDiv = select('body')
      .append('div')
      .attr('id', `tooltip-${id}`)
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr('class', twMerge(`tooltip`, tooltip?.className || ''));
  }, [
    classNameLines,
    classNamePoints,
    classNameSymbols,
    data,
    id,
    margin,
    padding,
    shape,
    tooltip,
    x,
    y,
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
      className={twMerge(defaultChartClassNames, className)}
      data-testid='bar-chart'
    />
  );
};

export default LollipopHChart;
