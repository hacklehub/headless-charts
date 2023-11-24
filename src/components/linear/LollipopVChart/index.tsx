import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, min } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3';
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
} from 'd3';
import { useCallback, useEffect } from 'react';

import { defaultChartClassNames } from '../../../utils';
import { mergeTailwindClasses } from '../../../utils';

interface DataItem {
  [key: string]: any;
}

interface LollipopVChartProps {
  data: DataItem[];
  valueMin?: number;
  valueMax?: number;
  id: string;
  className?: string;
  classNamePoints?: string;
  classNameLines?: string;
  classNameSymbols?: string;
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  padding?: {
    left: number;
    right: number;
    bottom: number;
    top: number;
  };
  shape:
    | 'circle'
    | 'diamond'
    | 'triangle'
    | 'square'
    | 'cross'
    | 'star'
    | 'wye';
  x?: { axis: 'bottom' | 'top'; axisTicks: number; key: string };
  y?: {
    axis?: 'left' | 'right';
    axisTicks?: number;
    key: string;
    start?: number;
  };
}

const LollipopVChart = ({
  data = [],
  //   valueMin,
  valueMax,
  id,
  className,
  classNamePoints,
  classNameLines,
  classNameSymbols,
  margin = {
    left: 40,
    right: 40,
    top: 40,
    bottom: 40,
  },
  padding = {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  shape = 'circle',
  x = { axis: 'bottom', axisTicks: 0, key: 'x' },
  y = { axis: 'left', key: 'y' },
}: LollipopVChartProps) => {
  const refreshChart = useCallback(() => {
    const svg = select(`#${id}`);
    // Clear svg
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0];
    const height = +svg.style('height').split('px')[0];

    data.sort((a, b) => b[y.key] - a[y.key]);

    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };

    const minValue = Number.isFinite(y.start)
      ? y.start
      : min(data, (d) => d[y.key]);
    const maxValue = Number.isFinite(valueMax)
      ? valueMax
      : max(data, (d) => d[y.key]);

    const xFn = scaleBand()
      .domain(data.map((d) => d[x.key]))
      .range([
        margin.left + padding.left,
        width - margin.right - padding.right,
      ]);

    const yFn = scaleLinear()
      .domain([minValue, maxValue])
      .range([
        height - margin.bottom - padding.bottom,
        margin.top + padding.top,
      ]);

    const g = svg.append('g');

    const xAxis = x.axis === 'top' ? axisTop(xFn) : axisBottom(xFn);

    const xAxisG = g.append('g').attr('class', 'axis--x axis');

    xAxisG
      .attr(
        'transform',
        `translate(0, ${
          x.axis === 'top' ? margin.top : height - margin.bottom
        })`
      )
      .transition()
      .duration(1000)
      .call(xAxis);

    const yAxis =
      y.axis === 'right'
        ? axisRight(yFn).ticks(y.axisTicks || 2)
        : axisLeft(yFn).ticks(y.axisTicks || 2);

    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${y.axis === 'right' ? margin.left + width : margin.left},0)`
      );

    padding.left &&
      xAxisG
        .append('line')
        .attr('x1', 0)
        .attr('x2', padding.left)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', 'currentColor');

    padding.bottom &&
      yAxisG
        .append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', margin.top + height - padding.bottom)
        .attr('y2', margin.top + height)
        .attr('stroke', 'currentColor');

    yAxisG.transition().duration(1000).call(yAxis);

    const dataGroup = g.append('g');
    const drawLinesAndCircles = () => {
      const pointGroup = dataGroup
        .selectAll('.line')
        .data(data)
        .enter()
        .append('g');

      /* eslint-disable */
      pointGroup
        .append('line')
        .attr(
          'class',
          `line stroke-current ${classNamePoints || ''} ${classNameLines || ''}`
        )
        // @ts-ignore
        .attr('x1', (d) => xFn(d[x.key]) + xFn.bandwidth() / 2)
        .attr('y1', () => yFn(minValue))
        // @ts-ignore
        .attr('x2', (d) => xFn(d[x.key]) + xFn.bandwidth() / 2)
        .attr('y2', () => yFn(minValue))
        .transition()
        .duration(1000)
        .attr('y1', (d) => yFn(d[y.key]));

      pointGroup
        .append('path')
        .attr(
          'class',
          `symbols fill-current ${classNamePoints || ''} ${
            classNameSymbols || ''
          }`
        )
        .attr('d', () => symbol(shapeMapping[shape], 100)())
        .attr(
          'transform',
          (d) =>
            //@ts-ignore
            `translate(${xFn(d[x.key]) + xFn.bandwidth() / 2},${yFn(minValue)})`
        )
        .transition()
        .duration(1000)
        .attr(
          'transform',
          (d) =>
            // @ts-ignore
            `translate(${xFn(d[x.key]) + xFn.bandwidth() / 2},${yFn(
              d[y.key]
            )} )`
        );
    };
    /* eslint-enable */
    drawLinesAndCircles();
  }, [
    classNameLines,
    classNamePoints,
    classNameSymbols,
    data,
    id,
    shape,
    valueMax,
    x,
    y,
    margin,
    padding,
  ]);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll('.tooltip').remove();
    };
  }, [data, refreshChart]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(defaultChartClassNames, className)}
    />
  );
};

export default LollipopVChart;
