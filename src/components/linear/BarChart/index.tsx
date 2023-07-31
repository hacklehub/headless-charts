/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { max, min } from 'd3-array';
import { pointer, select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';

import { ChartProps } from '../../../types';
import React from 'react';
import { transition } from 'd3-transition';

interface ColumnType {
  axis?: 'top' | 'bottom';
  axisTicks?: number;
  axisLabel?: string;
  className?: string;
  classNameNegative?: string;
  key: string;
  start?: number;
  end?: number;
  rx?: number;
}

export interface BarChartProps extends ChartProps {
  x: ColumnType[] | [];
  direction?: 'left' | 'right';
  y: {
    key: string;
    className?: string;
    padding?: number;
  };
  dataLabel?: {
    className?: string;
  };
  tooltip?: {
    className?: string;
    html?: (d: any) => string;
    keys?: string[];
  };
}

const BarChart = ({
  data,
  id,
  className,
  x,
  y,
  direction = 'right',
  padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    bar: 0.1,
  },
  margin = {
    top: x && x.some((column) => column.axis === 'top') ? 60 : 40,
    right: direction === 'right' ? 20 : 40,
    bottom: x && x.some((column) => column.axis === 'bottom') ? 60 : 40,
    left: 60,
  },
  drawing = {
    duration: 0,
  },
  dataLabel,
  tooltip,
}: BarChartProps) => {
  const refreshData = React.useCallback(() => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const minStart = min(x.map((column: ColumnType) => column.start || 0)),
      minX = min(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        x.map((column: ColumnType) => min(data, (d: any) => d[column.key]))
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      maxX = max(x.map((column) => max(data, (d: any) => d[column.key]))),
      maxEnd = max(x.map((column: ColumnType) => column.end || maxX)),
      areAllGreaterThanZero = minX > 0;

    const xFnRange =
      direction === 'left'
        ? [
            width - margin.right - (padding.right || 0),
            margin.left + (padding.left || 0),
          ]
        : [
            margin.left + (padding.left || 0),
            width - margin.right - (padding.right || 0),
          ];

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(minStart) ? minStart : areAllGreaterThanZero ? 0 : minX,
        Number.isFinite(maxEnd) ? maxEnd : maxX,
      ])
      .range(xFnRange);

    const yFn = scaleBand()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .domain(data.map((d: any) => d[y.key]))
      .range([
        margin.top + (padding.top || 0),
        height - margin.bottom - (padding.bottom || 0),
      ])
      .padding(padding.bar || 0); // add paddingBar here

    const g = svg.append('g');

    const xAxis =
      x && x.some((column) => column.axis === 'top')
        ? axisTop(xFn).ticks(5)
        : axisBottom(xFn).ticks(5);

    const xAxisG = g
      .append('g')
      .attr('class', 'axis--x axis ')
      .attr('data-testid', 'x-axis');

    const yAxis = direction === 'left' ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append('g')
      .attr('class', `yAxis axis ${y.className || ''}`)
      .attr(
        'transform',
        `translate(${
          direction === 'left' ? width - margin.right : margin.left
        },0)`
      )
      .attr('data-testid', 'y-axis');

    yAxisG.call(yAxis);

    xAxisG
      .attr(
        'transform',
        `translate(0, ${
          x && x.some((column) => column.axis === 'top')
            ? margin.top
            : height - margin.bottom
        })`
      )
      .call(xAxis);

    xAxisG
      .append('text')
      .attr('class', mergeTailwindClasses('fill-current'))
      .attr('x', width - (margin.right || 0))
      .attr('text-anchor', 'end')
      .attr('y', x && x.some((column) => column.axis === 'top') ? -20 : 30)
      .text(
        x
          .map((column: ColumnType) => column.axisLabel || column.key || '')
          .join(', ')
      );

    const tooltipDiv = select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr('class', `${tooltip?.className || ''}`);

    x.map((column, i) => {
      const barsG = g.append('g');

      const bars = barsG
        .selectAll('g')
        .data(data)
        .enter()
        .append('rect')
        .attr(
          'class',
          (d: any) =>
            `fill-current ${
              (column.classNameNegative && d[column.key] < 0
                ? column.classNameNegative
                : column.className) || ''
            }`
        )
        .attr('rx', column.rx || 0)
        .attr('x', (d: any) =>
          direction === 'left'
            ? d[column.key] < 0
              ? xFn(0)
              : xFn(d[column.key])
            : d[column.key] < 0
            ? xFn(d[column.key])
            : xFn(minStart || 0)
        )
        .attr(
          'y',
          (d: any) => (yFn(d[y.key]) || 0) + (i * yFn.bandwidth()) / x.length
        )
        .attr('width', (d: any) =>
          drawing?.duration
            ? 0
            : direction === 'left'
            ? xFn(minStart || 0) - xFn(Math.abs(d[column.key]))
            : d[column.key] < 0
            ? xFn(minStart || 0) - xFn(d[column.key])
            : xFn(Math.abs(d[column.key])) - xFn(minStart || 0)
        )
        .attr('height', yFn.bandwidth() / x.length - (y.padding || 0))
        .on('mouseenter', function (event: MouseEvent, d: any) {
          if (tooltip) {
            tooltipDiv.style('opacity', 1);
            const [bX, bY] = pointer(event, select('body'));
            tooltipDiv
              .style('left', `${bX + 10}px`)
              .style('top', `${bY + 10}px`);
            tooltipDiv.html(
              tooltip && tooltip.html
                ? tooltip.html(d)
                : tooltip.keys
                ? tooltip.keys
                    .map((key) => `${key}: ${d[key] || ''}`)
                    .join('<br/>')
                : `${d[y.key]} <br/> ${column.key} ${d[column.key]}`
            );
          }
        })
        .on('mousemove', function (event: MouseEvent) {
          const [bX, bY] = pointer(event, select('body'));
          tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
        })
        .on('mouseleave', function () {
          tooltip &&
            tooltipDiv
              .style('opacity', '0')
              .style('left', `0px`)
              .style('top', `0px`);
        });

      transition();

      drawing?.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          .delay(
            (_: any, idx: number) => i * (drawing.delay || 100) + idx * 100
          )
          .attr('width', (d: any) =>
            direction === 'left'
              ? xFn(minStart || 0) - xFn(Math.abs(d[column.key]))
              : d[column.key] < 0
              ? xFn(minStart || 0) - xFn(d[column.key])
              : xFn(Math.abs(d[column.key])) - xFn(minStart || 0)
          );

      dataLabel &&
        barsG
          .selectAll('g')
          .data(data)
          .enter()
          .append('text')
          .text((d: any) => d[column.key])
          .attr(
            'class',
            mergeTailwindClasses('fill-current', dataLabel.className || '')
          )
          .attr('data-testid', 'label')
          .attr('text-anchor', direction === 'left' ? 'start' : 'end')
          .attr(
            'x',
            (d: any) => xFn(d[column.key]) + (direction === 'left' ? 5 : -2)
          )
          .attr('font-size', '0.5em')
          .attr(
            'y',
            (d: any) =>
              (yFn(d[y.key]) || 0) +
              ((i + 1) * yFn.bandwidth()) / x.length -
              yFn.bandwidth() / x.length / 4
          );
    });
  }, [data, direction, drawing, id, margin, padding, x, y, dataLabel, tooltip]);

  React.useEffect(() => {
    refreshData();
  }, [data, refreshData]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(defaultChartClassNames, className)}
      data-testid='bar-chart'
    />
  );
};

export default BarChart;
