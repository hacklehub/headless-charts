import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { max, min } from 'd3-array';
import { pointer, select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';

interface DataItem {
  [key: string]: number | string;
}

interface ColumnChartProps {
  data: DataItem[];
  id: string;
  className?: string;
  x: { key: string; axis?: 'top' | 'bottom' };
  y: {
    key: string;
    start?: number;
    end?: number;
    className?: string;
    classNameNegative?: string;
    axis?: 'left' | 'right';
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
  drawing?: { duration?: number };
  tooltip?: {
    html?: (data: any) => string;
    className?: string;
    keys?: string[];
  };
  referenceLines?: {
    y?: number;
    className?: string;
  }[];
}

interface drawHLineProps {
  x: number;
  y: number;
  direction?: 'left' | 'right';
  className?: string;
  dashed?: boolean;
}

const ColumnChart = ({
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
  drawing,
  tooltip,
  referenceLines = [],
}: ColumnChartProps) => {
  const refreshChart = useCallback(() => {
    /* eslint-disable */
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();
    const g = svg.append('g');

    // @ts-ignore
    const minStart = min(y.map((column) => column.start)),
      // @ts-ignore
      minY = min(y.map((column) => min(data, (d) => d[column.key]))),
      // @ts-ignore
      maxY = max(y.map((column) => max(data, (d) => d[column.key]))),
      // @ts-ignore
      maxEnd = max(y.map((column) => column.end)),
      // @ts-ignore
      areAllGreaterThanZero = minY > 0;

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const xFn = scaleBand()
      // @ts-ignore
      .domain(data.map((d) => d[x.key]))
      .range([margin.left + padding.left, width - margin.right - padding.right])
      .padding(paddingBar);

    const yFn = scaleLinear()
      // @ts-ignore
      .domain([
        Number.isFinite(minStart) ? minStart : minY || 0,
        maxEnd || maxY,
      ])
      .range([
        height - margin.bottom - padding.bottom,
        margin.top + padding.top,
      ]);

    y.map((column, i) => {
      const barsG = g.append('g');

      const bars = barsG
        .selectAll('g')
        .data(data)
        .enter()
        .append('rect')
        .attr(
          'class',
          (d) =>
            `fill-current ${
              // @ts-ignore
              column.classNameNegative && d[column.key] < 0
                ? column.classNameNegative
                : column.className
            }`
        )
        // @ts-ignore
        .attr('x', (d) => xFn(d[x.key]) + (i * xFn.bandwidth()) / y.length)
        .attr('y', (d) =>
          // @ts-ignore
          drawing && drawing.duration ? yFn(0) : yFn(d[column.key])
        )
        .attr('width', xFn.bandwidth() / y.length)
        .attr('height', (d) =>
          drawing && drawing.duration
            ? 0
            : d[column.key]
            ? // @ts-ignore
              height - margin.bottom - padding.bottom - yFn(d[column.key])
            : 0
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
                : `${d[x.key]} <br/> ${column.key} ${d[column.key]}`
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

      drawing?.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          // @ts-ignore
          .attr('y', (d) => yFn(d[column.key]))
          .attr('height', (d) =>
            Number.isFinite(d[column.key])
              ? // @ts-ignore
                height - margin.bottom - padding.bottom - yFn(d[column.key])
              : 0
          );
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

export default ColumnChart;
