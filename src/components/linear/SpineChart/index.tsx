import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, sum } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';

import { mergeTailwindClasses } from '../../../utils';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

interface Column {
  key: string;
  direction: 'left' | 'right';
  className: string;
}

interface DataItem {
  [key: string]: number | string;
}

interface SpineChartProps {
  data: DataItem[];
  id: string;
  className?: string;
  paddingBar?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  y: Column;
  x: Array<any>;
}

const SpineChart = ({
  data = [],
  id,
  className,
  paddingBar = 0.3,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  marginLeft = 40,
  marginRight = 20,
  marginTop = 40,
  marginBottom = 40,
  y,
  x,
}: SpineChartProps) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const leftSeries = x.filter((column) => column.direction === 'left'),
      rightSeries = x.filter((column) => column.direction !== 'left');

    /* eslint-disable */
    // @ts-ignore
    const extreme = max([
      // @ts-ignore
      max(data.map((row) => sum(leftSeries.map((column) => row[column.key])))),
      // @ts-ignore
      max(data.map((row) => sum(rightSeries.map((column) => row[column.key])))),
    ]);

    const halfWidth =
      (width - paddingLeft - marginLeft - paddingRight - marginRight) / 2;

    const xRightFn = scaleLinear()
      // @ts-ignore
      .domain([0, extreme])
      .range([paddingLeft + marginLeft + halfWidth, width - marginRight]);

    const xLeftFn = scaleLinear()
      // @ts-ignore
      .domain([0, extreme])
      .range([paddingLeft + marginLeft + halfWidth, paddingLeft + marginLeft]);

    const xLeftAxis =
      // @ts-ignore
      x.axis === 'top'
        ? // @ts-ignore
          axisTop(xLeftFn).ticks(x.axisTicks || 3)
        : // @ts-ignore
          axisBottom(xLeftFn).ticks(x.axisTicks || 3);

    const xRightAxis =
      // @ts-ignore
      x.axis === 'top'
        ? // @ts-ignore
          axisTop(xRightFn).ticks(x.axisTicks || 3)
        : // @ts-ignore
          axisBottom(xRightFn).ticks(x.axisTicks || 3);

    const xRightAxisG = g.append('g').attr('class', 'right-axis--x axis ');

    g.append('line')
      .attr('x1', xLeftFn(0))
      .attr('x2', xLeftFn(0))
      .attr('y1', marginTop)
      .attr('y2', height - marginBottom)
      .attr('class', 'stroke-current stroke-1');

    const yFn = scaleBand()
      // @ts-ignore
      .domain(data.map((d) => d[y.key]))
      .range([marginTop + paddingTop, height - paddingBottom - marginBottom])
      .padding(paddingBar);

    leftSeries.map((column, i) => {
      const barsG = g.append('g');
      const columns = leftSeries.filter((_, idx) => idx >= i).map((c) => c.key);
      // const bars =
      barsG
        .selectAll('g')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', `${column.className} fill-current`)
        // @ts-ignore
        .attr('y', (d) => yFn(d[y.key]))
        .attr('x', xLeftFn(0))
        .attr('width', 0)
        .attr('height', yFn.bandwidth())
        .transition()
        .duration(1000)
        // @ts-ignore
        .attr('x', (d) => xLeftFn(sum(columns.map((c) => d[c]))))
        .attr(
          'width',
          // @ts-ignore
          (d) => xLeftFn(0) - xLeftFn(sum(columns.map((c) => d[c])))
        );
    });
    rightSeries.map((column, i) => {
      const barsG = g.append('g');
      const columns = rightSeries
        .filter((_, idx) => idx >= i)
        .map((c) => c.key);
      // const bars =
      barsG
        .selectAll('g')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', `${column.className} fill-current`)
        .attr('x', (d) => xRightFn(0))
        .attr('z-index', 100 - i)
        // @ts-ignore
        .attr('y', (d) => yFn(d[y.key]))
        .attr('height', yFn.bandwidth())
        .transition()
        .duration(1000)
        .attr(
          'width',
          // @ts-ignore
          (d) => xRightFn(sum(columns.map((c) => d[c]))) - xRightFn(0)
        );
    });

    // Draw axis

    xRightAxisG
      .attr(
        'transform',
        // @ts-ignore
        `translate(0, ${x.axis === 'top' ? marginTop : height - marginBottom})`
      )
      .call(xRightAxis);

    const xLeftAxisG = g.append('g').attr('class', 'left-axis--x axis ');

    xLeftAxisG
      .attr(
        'transform',
        // @ts-ignore
        `translate(0, ${x.axis === 'top' ? marginTop : height - marginBottom})`
      )
      .call(xLeftAxis);

    const yAxis = y.direction === 'left' ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${y.direction === 'left' ? width : marginLeft},0)`
      );

    yAxisG.call(yAxis);
  };

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll('.tooltip').remove();
    };
  }, [data]);

  /* eslint-enable */

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-64`,
        className || ''
      )}
    />
  );
};

export default SpineChart;
