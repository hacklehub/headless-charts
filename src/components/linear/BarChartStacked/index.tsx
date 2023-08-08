/* eslint-disable @typescript-eslint/ban-ts-comment */
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, sum } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';

import { defaultChartClassNames } from '../../../utils';
import { format } from 'd3-format';
import { mergeTailwindClasses } from '../../../utils';
import { transition } from 'd3-transition';
import useTooltip from '../../../hooks/useTooltip';

interface DataItem {
  [key: string]: any;
}

interface AxisItems {
  key: string;
  className: string;
  axis?: string;
  axisTicks?: any;
}

interface ToolTip {
  html?: (data: DataItem) => string;
  className?: string;
  keys?: string[];
}

interface Drawing {
  duration?: number;
  delay?: number;
}

interface DataLabel {
  text?: (data: DataItem, column: AxisItems) => string;
}

interface ReferenceLines {
  x?: number;
  className?: string;
}

interface BarChartStackedProps {
  data: DataItem[];
  id: string;
  className?: string;
  direction?: string;
  padding?: {
    left: number;
    right: number;
    bottom: number;
    top: number;
    bar: number;
  };
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  referenceLines?: ReferenceLines[];
  waterfall?: any;
  x: AxisItems[];
  tickFormat?: string;
  y: AxisItems;
  tooltip?: ToolTip;
  drawing?: Drawing;
  dataLabel?: DataLabel;
  column?: AxisItems;
}

const BarChartStacked = ({
  data = [],
  id,
  className,
  direction = 'right',
  padding = {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    bar: 0.3,
  },
  margin = {
    left: 60,
    right: 20,
    top: 20,
    bottom: 40,
  },
  referenceLines = [],
  waterfall,
  x,
  tickFormat,
  y,
  tooltip,
  drawing,
  dataLabel,
  column,
}: BarChartStackedProps) => {
  const { onMouseOver, onMouseMove, onMouseLeave } = useTooltip({
    tooltip,
    defaultHtml: (d: any) =>
      `${d[y.key]} <br/> ${column && column.key} ${
        tickFormat
          ? // @ts-ignore
            formatMapping[tickFormat]
            ? // @ts-ignore
              format(formatMapping[tickFormat])(d[column.key])
            : format(tickFormat)
          : column && d[column.key]
      }`,
  });

  /* eslint-disable */
  const formatMapping = {
    '%': '.0%',
    $: '($.2f',
    tri: ',.2r',
    hex: '#x',
    SI: '.2s',
  };

  const refreshChart = useCallback(() => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const yFn = scaleBand()
      .domain(data.map((d) => d[y.key]))
      .range([
        margin.top + padding.top,
        height - margin.bottom - padding.bottom,
      ])
      .padding(padding.bar);

    const xFnRange =
      direction === 'left'
        ? [width - margin.right - padding.right, margin.left + padding.left]
        : [margin.left + padding.left, width - margin.right - padding.right];

    const xFn = scaleLinear()
      // @ts-ignore
      .domain([0, max(data.map((d) => sum(x.map((value) => d[value.key]))))])
      .range(xFnRange);

    x.reverse();

    x.map((column, i) => {
      const barsG = g.append('g');

      // Cumulative columns
      const afterColumns = x.filter((_, idx) => idx > i).map((c) => c.key);

      const bars = barsG
        .selectAll('g')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', `${column.className} fill-current`)
        .attr('z-index', 100 - i)
        .attr('x', (d) =>
          waterfall ? xFn(sum(afterColumns.map((c) => d[c]))) : xFn(0)
        )
        .attr(
          'y',
          (d) =>
            // @ts-ignore
            yFn(d[y.key]) +
            (waterfall ? (yFn.bandwidth() / x.length) * (x.length - i) : 0)
        )
        .style('z-index', 10 + i)
        .attr('width', (d) =>
          drawing?.duration ? 0 : xFn(d[column.key] || 0) - xFn(0)
        )
        .attr(
          'height',
          waterfall
            ? yFn.bandwidth() / x.length - (waterfall.padding || 0)
            : yFn.bandwidth()
        )
        .on('mouseenter', onMouseOver)
        .on('mousemove', onMouseMove)
        .on('mouseleave', onMouseLeave);

      transition();

      drawing?.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          // @ts-ignore
          .delay(
            (_, idx) => i * (drawing.delay || 0) + (drawing.delay || 0) * idx
          )
          // @ts-ignore
          .attr('width', (d, idx) => {
            const columns = x.filter((_, idx) => idx >= i).map((c) => c.key);
            return waterfall
              ? xFn(d[column.key]) - xFn(0)
              : xFn(sum(columns.map((c) => d[c]))) - xFn(0);
          });

      dataLabel &&
        barsG
          .selectAll('g')
          .data(data)
          .enter()
          .append('text')
          .text((d) =>
            dataLabel.text ? dataLabel.text(d, column) : d[column.key]
          )
          .attr('class', 'fill-current')
          .attr('text-anchor', direction === 'left' ? 'start' : 'end')
          .attr(
            'x',
            (d) =>
              // @ts-ignore
              xFn(columns.reduce((sum, c) => sum + d[c], 0)) -
              (direction === 'left' ? 5 : 2)
          )
          .attr('font-size', '0.6em')
          // @ts-ignore
          .attr('y', (d) => yFn(d[y.key]) + yFn.bandwidth() / 2 + 4);
    });
    // @ts-ignore
    function drawVLine({ x, y, className, dashed }: ReferenceLine) {
      const verticalLine = g
        .append('line')
        .attr('class', mergeTailwindClasses(className, 'line stroke-current'))
        // @ts-ignore
        .attr('x1', x)
        // @ts-ignore
        .attr('x2', x)
        .attr('y1', y)
        .attr('y2', height - margin.bottom - padding.bottom)
        .attr('stroke', 'currentColor')
        .attr('clip-path', 'url(#clip)')
        .style('stroke-width', 1);
      dashed && verticalLine.style('stroke-dasharray', '10,7');
    }

    referenceLines.map((object) => {
      object.x &&
        drawVLine({
          x:
            // @ts-ignore
            x.scalingFunction === 'time'
              ? // @ts-ignore
                xFn(toDateTime({ [x.key]: object.x }))
              : xFn(object.x),
          // @ts-ignore
          y: marginTop,
          className: `${object.className || ''} reference-line`,
        });
    });

    const xAxis = x.some((column) => column.axis === 'top')
      ? // @ts-ignore
        axisTop(xFn).ticks(x.axisTicks || 5)
      : // @ts-ignore
        axisBottom(xFn).ticks(x.axisTicks || 5);

    tickFormat &&
      xAxis.tickFormat(
        // @ts-ignore
        formatMapping[tickFormat]
          ? // @ts-ignore
            format(formatMapping[tickFormat])
          : format(tickFormat)
      );

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');

    const yAxis = direction === 'left' ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${direction === 'left' ? width : margin.left},0)`
      );

    xAxisG
      .attr(
        'transform',
        // @ts-ignore
        `translate(0, ${x.axis === 'top' ? marginTop : height - margin.bottom})`
      )
      .call(xAxis);

    yAxisG.call(yAxis);
  }, [
    data,
    id,
    direction,
    padding,
    margin,
    referenceLines,
    waterfall,
    x,
    tickFormat,
    y,
    tooltip,
    drawing,
    dataLabel,
  ]);
  /* eslint-enable */

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll('.tooltip').remove();
    };
  }, [data, refreshChart]);
  return (
    <>
      <svg
        id={id}
        className={mergeTailwindClasses(defaultChartClassNames, className)}
      />
    </>
  );
};

export default BarChartStacked;
