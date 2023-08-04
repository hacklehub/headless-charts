import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, sum } from 'd3-array';
import { pointer, select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';

import { defaultChartClassNames } from '../../../utils';
import { format } from 'd3-format';
import { mergeTailwindClasses } from '../../../utils';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

interface DataItem {
  [key: string]: any;
}

interface Column {
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
  text?: (data: DataItem, column: Column) => string;
}

interface ReferenceLine {
  x?: number;
  className?: string;
}

interface BarChartStackedProps {
  data: DataItem[];
  id: string;
  className?: string;
  direction?: string;
  paddingBar?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  referenceLines?: ReferenceLine[];
  waterfall?: any;
  x: Column[];
  tickFormat?: string;
  y: Column;
  tooltip?: ToolTip;
  drawing?: Drawing;
  dataLabel?: DataLabel;
}

const BarChartStacked = ({
  data = [],
  id,
  className,
  direction = 'right',
  paddingBar = 0.3,
  paddingLeft = 0,
  paddingBottom = 0,
  paddingTop = 0,
  paddingRight = 0,
  marginLeft = 60,
  marginRight = 20,
  marginTop = 20,
  marginBottom = 40,
  referenceLines = [],
  waterfall,
  x,
  tickFormat,
  y,
  tooltip,
  drawing,
  dataLabel,
}: BarChartStackedProps) => {
  /* eslint-disable */
  const formatMapping = {
    '%': '.0%',
    $: '($.2f',
    tri: ',.2r',
    hex: '#x',
    SI: '.2s',
  };

  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const yFn = scaleBand()
      .domain(data.map((d) => d[y.key]))
      .range([marginTop + paddingTop, height - marginBottom - paddingBottom])
      .padding(paddingBar);

    const xFnRange =
      direction === 'left'
        ? [width - marginRight - paddingRight, marginLeft + paddingLeft]
        : [marginLeft + paddingLeft, width - marginRight - paddingRight];

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
          drawing && drawing.duration
            ? 0
            : waterfall
            ? xFn(d[column.key] || 0) - xFn(0)
            : xFn(sum(afterColumns.map((c) => d[c])) + (d[column.key] || 0)) -
              xFn(0)
        )
        .attr(
          'height',
          waterfall
            ? yFn.bandwidth() / x.length - (waterfall.padding || 0)
            : yFn.bandwidth()
        )
        .on('mouseenter', function (event, d) {
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
                : `${d[y.key]} <br/> ${column.key} ${
                    tickFormat
                      ? // @ts-ignore
                        formatMapping[tickFormat]
                        ? // @ts-ignore
                          format(formatMapping[tickFormat])(d[column.key])
                        : format(tickFormat)
                      : d[column.key]
                  }`
            );
          }
        })
        .on('mousemove', function (event) {
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

      drawing &&
        drawing.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          // @ts-ignore
          .delay((idx) => i * (drawing.delay || 100) + idx * 100)
          .attr('width', (d) => {
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
        .attr('y2', height - marginBottom - paddingBottom)
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

    const tooltipDiv = select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr('class', `tooltip ${(tooltip && tooltip.className) || ''}`);

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
        `translate(${direction === 'left' ? width : marginLeft},0)`
      );

    xAxisG
      .attr(
        'transform',
        // @ts-ignore
        `translate(0, ${x.axis === 'top' ? marginTop : height - marginBottom})`
      )
      .call(xAxis);

    yAxisG.call(yAxis);
  };
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
