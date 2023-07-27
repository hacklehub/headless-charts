/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, min } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';

import { ChartProps } from '../../types';
import React from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';
import { select } from 'd3-selection';

interface ColumnType {
  axis?: 'top' | 'bottom';
  className?: string;
  classNameNegative?: string;
  axisTicks?: number;
  key: string;
  start?: number;
  end?: number;
}

export interface BarChartProps extends ChartProps {
  x: ColumnType[] | [];
  direction?: 'left' | 'right';
  y: {
    key: string;
  };
  dataLabel: {
    enabled: boolean;
    className?: string;
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
  },
  margin = {
    top: x && x.some((column) => column.axis === 'top') ? 40 : 20,
    right: direction === 'right' ? 20 : 40,
    bottom: x && x.some((column) => column.axis === 'bottom') ? 40 : 20,
    left: 60,
  },
  drawing = {
    enabled: false,
    duration: 0,
  },
  dataLabel = {
    enabled: false,
    className: '',
  },
}: BarChartProps) => {
  const refreshData = React.useCallback(async () => {
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
        ? [width - margin.right - padding.right, margin.left + padding.left]
        : [margin.left + padding.left, width - margin.right - padding.right];

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
        margin.top + padding.top,
        height - margin.bottom - padding.bottom,
      ])
      .padding(0.1); // add paddingBar here

    const g = svg.append('g');

    const xAxis =
      x && x.some((column) => column.axis === 'top')
        ? axisTop(xFn).ticks(5)
        : axisBottom(xFn).ticks(5);

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');

    const yAxis = direction === 'left' ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${
          direction === 'left' ? width - margin.right : margin.left
        },0)`
      );

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
    yAxisG.call(yAxis);

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
          drawing?.enabled && drawing?.duration
            ? 0
            : direction === 'left'
            ? xFn(minStart || 0) - xFn(Math.abs(d[column.key]))
            : d[column.key] < 0
            ? xFn(minStart || 0) - xFn(d[column.key])
            : xFn(Math.abs(d[column.key])) - xFn(minStart || 0)
        )
        .attr('height', yFn.bandwidth() / x.length);

      drawing?.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          .delay(
            (d: any, idx: number) => i * (drawing.delay || 100) + idx * 100
          )
          .attr('width', (d: any) =>
            direction === 'left'
              ? xFn(minStart || 0) - xFn(Math.abs(d[column.key]))
              : d[column.key] < 0
              ? xFn(minStart || 0) - xFn(d[column.key])
              : xFn(Math.abs(d[column.key])) - xFn(minStart || 0)
          );

      dataLabel?.enabled &&
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
  }, [data, direction, drawing, id, margin, padding, x, y, dataLabel]);

  React.useEffect(() => {
    refreshData();
  }, [data, refreshData]);

  return (
    <svg
      id={id}
      width={600}
      height={300}
      className={mergeTailwindClasses(
        className,
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-80 fill-current stroke-current`
      )}
    />
  );
};

export default BarChart;
