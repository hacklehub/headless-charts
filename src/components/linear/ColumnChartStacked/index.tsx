import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { max, sum } from 'd3-array';
import { pointer, select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';

import { format } from 'd3-format';
import { transition } from 'd3';

interface DataItem {
  [key: string]: number | string;
}

interface ColumnChartStackedProps {
  data: DataItem[];
  id: string;
  className?: string;
  x: {
    key: string;
    axis?: 'top' | 'bottom';
  };
  y: {
    key: string;
    axis?: 'left' | 'right';
    className: string;
  }[];
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
  paddingBar?: number;
  waterfall?: boolean;
  tooltip?: {
    className?: string;
    html?: (data: any) => string;
    keys?: string[];
  };
  referenceLines?: {
    y: number;
    className?: string;
  }[];
  tickFormat?: string;
  drawing?: {
    duration?: number;
  };
}

interface drawHLineProps {
  x: number;
  y: number;
  direction?: 'left' | 'right';
  className?: string;
  dashed?: boolean;
}

const ColumnChartStacked = ({
  data = [],
  id,
  className,
  x,
  y,
  margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  },
  padding = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  paddingBar = 0.2,
  waterfall,
  tooltip,
  referenceLines = [],
  tickFormat,
  drawing = undefined,
}: ColumnChartStackedProps) => {
  const formatMapping = {
    '%': '.0%',
    $: '($.2f',
    tri: ',.2r',
    hex: '#x',
    SI: '.2s',
  };

  const refreshChart = useCallback(() => {
    /* eslint-disable */
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();
    const g = svg.append('g');

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const xFn = scaleBand()
      // @ts-ignore
      .domain(data.map((d) => d[x.key]))
      .range([margin.left + padding.left, width - margin.right - padding.right])
      .padding(paddingBar);

    const yFnRange = [
      height - margin.bottom - padding.bottom,
      margin.top + padding.top,
    ];

    const yFn = scaleLinear()
      // @ts-ignore
      .domain([0, max(data.map((d) => sum(y.map((value) => d[value.key]))))])
      .range(yFnRange);

    y.map((column, i) => {
      const barsG = g.append('g');
      const beforeColumns = y.filter((_, idx) => idx <= i).map((c) => c.key);

      const bars = barsG
        .selectAll('g')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', `${column.className} fill-current`)
        .attr('z-index', 100 - i)
        .attr(
          'x',
          (d) =>
            // @ts-ignore
            xFn(d[x.key]) + (waterfall ? (xFn.bandwidth() / y.length) * i : 0)
        )
        .attr('y', (d: any) => yFn(sum(beforeColumns.map((c: any) => d[c]))))
        .style('z-index', 10 + i)
        .attr('width', () =>
          waterfall
            ? // @ts-ignore
              xFn.bandwidth() / y.length - (waterfall.padding || 0)
            : xFn.bandwidth()
        )
        .attr('height', (d: any) =>
          drawing?.duration ? 0 : yFn(0) - yFn(d[column.key])
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
                : `${d[x.key]} <br/> ${column.key} ${
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

      transition();

      if (drawing?.duration) {
        bars
          .transition()
          .duration(drawing.duration)
          .attr('height', (d: any) => yFn(0) - yFn(d[column.key]));
      }
    });

    function drawHLine({
      x,
      y,
      direction = 'left',
      className,
      dashed = false,
    }: drawHLineProps) {
      const horizontalLine = g
        .append('line')
        .attr('class', mergeTailwindClasses(className, 'line stroke-current'))
        .attr('x1', direction === 'left' ? margin.left : x)
        .attr('x2', direction === 'left' ? x : width + margin.left)
        .attr('y1', y)
        .attr('y2', y)
        .attr('clip-path', 'url(#clip)')
        .attr('stroke', '#dddddd');
      dashed && horizontalLine.style('stroke-dasharray', '10,5');
    }

    referenceLines.map((object) => {
      object.y &&
        drawHLine({
          x: width - margin.right,
          y: yFn(object.y),
          className: `${object.className || ''} reference-line`,
        });
    });

    const tooltipDiv = select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr('class', `tooltip ${(tooltip && tooltip.className) || ''}`);

    // @ts-ignore
    const yAxis = y.axis === 'right' ? axisRight(yFn) : axisLeft(yFn);

    tickFormat &&
      yAxis.tickFormat(
        // @ts-ignore
        formatMapping[tickFormat]
          ? // @ts-ignore
            format(formatMapping[tickFormat])
          : format(tickFormat)
      );

    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        // @ts-ignore
        `translate(${y.axis === 'right' ? margin.left + width : margin.left},0)`
      );
    yAxisG.call(yAxis);

    const xAxis = x.axis === 'top' ? axisTop(xFn) : axisBottom(xFn);

    const xAxisG = g.append('g').attr('class', 'axis--x axis');

    xAxisG
      .attr(
        'transform',
        `translate(0, ${
          x.axis === 'top' ? margin.top : height - margin.bottom
        })`
      )
      .call(xAxis);
  }, [data]);

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

export default ColumnChartStacked;
