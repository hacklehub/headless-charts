import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { max, sum } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';

interface Y {
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
  padding?: {
    left: number;
    right: number;
    bottom: number;
    top: number;
  };
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  y: Y;
  x: Array<any>;
}

const SpineChart = ({
  data = [],
  id,
  className,
  paddingBar = 0.3,
  padding = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 20,
  },
  y,
  x,
}: SpineChartProps) => {
  const refreshChart = useCallback(() => {
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
      (width - padding.left - margin.left - padding.right - margin.right) / 2;

    const xRightFn = scaleLinear()
      // @ts-ignore
      .domain([0, extreme])
      .range([padding.left + margin.left + halfWidth, width - margin.right]);

    const xLeftFn = scaleLinear()
      // @ts-ignore
      .domain([0, extreme])
      .range([padding.left + margin.left + halfWidth, padding.left + margin.left]);

    const xLeftAxis =
      // @ts-ignore
      x.axis === 'top'
        ? // @ts-ignore
          axisTop(xLeftFn).ticks(x.axisTicks)
        : // @ts-ignore
          axisBottom(xLeftFn).ticks(x.axisTicks);

    const xRightAxis =
      // @ts-ignore
      x.axis === 'top'
        ? // @ts-ignore
          axisTop(xRightFn).ticks(x.axisTicks)
        : // @ts-ignore
          axisBottom(xRightFn).ticks(x.axisTicks);

    const xRightAxisG = g.append('g').attr('class', 'right-axis--x axis ');

    g.append('line')
      .attr('x1', xLeftFn(0))
      .attr('x2', xLeftFn(0))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('class', 'stroke-current stroke-1');

    const yFn = scaleBand()
      // @ts-ignore
      .domain(data.map((d) => d[y.key]))
      .range([margin.top + padding.top, height - padding.bottom - margin.bottom])
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
        `translate(0, ${x.axis === 'top' ? margin.top : height - margin.bottom})`
      )
      .call(xRightAxis);

    const xLeftAxisG = g.append('g').attr('class', 'left-axis--x axis ');

    xLeftAxisG
      .attr(
        'transform',
        // @ts-ignore
        `translate(0, ${x.axis === 'top' ? margin.top : height - margin.bottom})`
      )
      .call(xLeftAxis);

    const yAxis = y.direction === 'left' ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${y.direction === 'left' ? width : margin.left},0)`
      );

    yAxisG.call(yAxis);
  },[data, x, padding, margin, paddingBar, y]);

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
      className={mergeTailwindClasses(defaultChartClassNames, className)}
    />
  );
};

export default SpineChart;
