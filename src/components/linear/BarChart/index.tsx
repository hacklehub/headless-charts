import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, min } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import useTooltip, { TooltipObjectType } from '../../../hooks/useTooltip';

import { ChartProps } from '../../../types';
import React from 'react';
import { defaultChartClassNames } from '../../../utils';
import { transition } from 'd3-transition';
import { twMerge } from 'tailwind-merge';

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
  tooltip?: TooltipObjectType;
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
  style = {},
}: BarChartProps) => {
  const { onMouseOver, onMouseMove, onMouseLeave } = useTooltip({
    id,
    tooltip,
  });

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
      .attr('class', twMerge('fill-current'))
      .attr('x', width - (margin.right || 0))
      .attr('text-anchor', 'end')
      .attr('y', x && x.some((column) => column.axis === 'top') ? -20 : 30)
      .text(
        x
          .map((column: ColumnType) => column.axisLabel || column.key || '')
          .join(', ')
      );

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
          drawing.duration
            ? xFn(0)
            : direction === 'left' || d[column.key] < 0
            ? xFn(d[column.key])
            : xFn(0)
        )
        .attr(
          'y',
          (d: any) => (yFn(d[y.key]) || 0) + (i * yFn.bandwidth()) / x.length
        )
        .attr('width', (d: any) =>
          drawing?.duration
            ? 0
            : direction === 'left'
            ? xFn(0) - xFn(Math.abs(d[column.key]))
            : d[column.key] < 0
            ? xFn(0) - xFn(d[column.key])
            : xFn(Math.abs(d[column.key])) - xFn(0)
        )
        .attr('height', yFn.bandwidth() / x.length - (y.padding || 0))
        .on('mouseenter', onMouseOver)
        .on('mousemove', onMouseMove)
        .on('mouseleave', onMouseLeave);

      transition();

      drawing?.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          .delay(
            (_: any, idx: number) => i * (drawing.delay || 100) + idx * 100
          )
          .attr('x', (d: any) =>
            direction === 'left' || d[column.key] < 0
              ? xFn(d[column.key])
              : xFn(0)
          )
          .attr('width', (d: any) =>
            Math.abs(xFn(0) - xFn(Math.abs(d[column.key])))
          );

      dataLabel &&
        barsG
          .selectAll('g')
          .data(data)
          .enter()
          .append('text')
          .text((d: any) => d[column.key])
          .attr('class', twMerge('fill-current', dataLabel.className || ''))
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
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, refreshData]);

  return (
    <svg
      id={id}
      style={style}
      className={twMerge(defaultChartClassNames, className)}
      data-testid='bar-chart'
    />
  );
};

export default BarChart;
