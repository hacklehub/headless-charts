import { ZoomTransform, zoom } from 'd3-zoom';
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { max, min } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
// pointer,
import { select, selectAll } from 'd3-selection';
import useTooltip, { TooltipObjectType } from '../../../hooks/useTooltip';

import { ChartProps } from '../../../types';
import React from 'react';
import { defaultChartClassNames } from '../../../utils';
import { transition } from 'd3-transition';
import { twMerge } from 'tailwind-merge';

export interface BoxPlotHProps extends ChartProps {
  classNameData?: string;
  x: {
    minKey: string;
    maxKey: string;
    boxStart: string;
    boxEnd: string;
    midKey: string;
    min?: number;
    max?: number;
    axis?: 'top' | 'bottom';
    axisTicks?: number;
    classNameBoxes?: string;
    classNameLines?: string;
    classNameMap?: any;
  };
  y: {
    key: string;
    axis?: 'left' | 'right';
  };
  tooltip?: TooltipObjectType;
}

const BoxPlotH = ({
  className,
  classNameData,
  data,
  id,
  margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 20,
  },
  padding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    bar: 0.2,
  },
  x,
  tooltip,
  y,
  zooming = {
    enabled: false,
  },
  style = {},
}: BoxPlotHProps) => {
  const { onMouseOver, onMouseMove, onMouseLeave } = useTooltip({
    id,
    tooltip,
    defaultHtml: (d: any) =>
      `min: ${d[x.minKey].toFixed(0)} <br/> range: ${d[x.boxStart].toFixed(
        0
      )} to ${d[x.boxEnd].toFixed(0)} <br/> mid: ${d[x.midKey].toFixed(
        0
      )} <br/> max: ${d[x.maxKey].toFixed(0)} `,
  });
  const refreshChart = React.useCallback(() => {
    const svg = select<SVGSVGElement, unknown>(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(x.min) ? x.min : min(data.map((d: any) => d[x.minKey])),
        x.max || max(data.map((d: any) => d[x.maxKey])),
      ])
      .range([margin.left, width - (padding.right || 0) - margin.right]);

    // domainMin is x.min if it exists (including 0), otherwise the min of the data

    const yFn = scaleBand()
      .domain(data.map((d: any) => d[y.key]))
      .range([
        margin.top + (padding.top || 0),
        height - margin.bottom - (padding.bottom || 0),
      ])
      .padding(padding.bar || 0);

    // const clipPath =
    svg
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top - (padding.top || 0) - 10)
      .attr('width', width)
      .attr('height', height + (padding.bottom || 0) + 8);

    const dataG = g
      .append('g')
      .attr('class', 'data')
      .attr('clip-path', 'url(#clip)');

    const dotRowsG = dataG
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .on('mouseenter', onMouseOver)
      .on('mousemove', onMouseMove)
      .on('mouseleave', onMouseLeave);

    transition();

    // End lines
    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('x1', (d: any) => xFn(d[x.minKey]))
      .attr('x2', (d: any) => xFn(d[x.minKey]))
      .attr('y1', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2)
      .attr('y2', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2)
      .attr('class', (d: any) =>
        twMerge(
          'box-plot-line stroke-current',
          x.classNameMap
            ? x.classNameMap[d[y.key]] || ''
            : x.classNameLines || ''
        )
      )
      .transition()
      .duration(1000)
      .attr('x2', (d: any) => xFn(d[x.maxKey]));

    // Min line
    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('x1', (d: any) => xFn(d[x.minKey]))
      .attr('x2', (d: any) => xFn(d[x.minKey]))
      .attr('y1', (d: any) => yFn(d[y.key]) || 0)
      .attr('y2', (d: any) => yFn(d[y.key]) || 0)
      .attr('class', (d: any) =>
        twMerge(
          `box-plot-line stroke-current`,
          x.classNameMap
            ? x.classNameMap[d[y.key]] || ''
            : x.classNameLines || ''
        )
      )
      .transition()
      .duration(1000)
      .attr('y1', (d: any) => yFn(d[y.key]) || 0)
      .attr('y2', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth());

    // Mid line

    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('x1', (d: any) => xFn(d[x.maxKey]))
      .attr('x2', (d: any) => xFn(d[x.maxKey]))
      .attr('y1', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth())
      .attr('y2', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth())
      .attr(
        'class',
        twMerge(`box-plot-line stroke-current`, x.classNameLines || '')
      )
      .transition()
      .duration(1000)
      .attr('y1', (d: any) => yFn(d[y.key]) || 0)
      .attr('y2', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth());

    dotRowsG
      .append('rect')
      .attr('class', (d: any) =>
        twMerge(
          'box-plot-box stroke-current fill-current',
          d.className,
          x.classNameBoxes || ''
        )
      )
      .attr('clip-path', 'url(#clip)')
      .attr('x', (d: any) => xFn(d[x.boxStart]))
      .attr('y', (d: any) => yFn(d[y.key]) || 0)
      .attr('height', yFn.bandwidth())
      .transition()
      .duration(1000)
      .attr('width', (d: any) => xFn(d[x.boxEnd]) - xFn(d[x.boxStart]));

    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('x1', (d: any) => xFn(d[x.midKey]))
      .attr('x2', (d: any) => xFn(d[x.midKey]))
      .attr('y1', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2)
      .attr('y2', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth() / 2)
      .attr('class', twMerge(`box-plot-line stroke-current`, classNameData))
      .transition()
      .duration(1000)
      .attr('y1', (d: any) => yFn(d[y.key]) || 0)
      .attr('y2', (d: any) => (yFn(d[y.key]) || 0) + yFn.bandwidth());

    const yAxis = y.axis === 'right' ? axisRight(yFn) : axisLeft(yFn);

    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${y.axis === 'right' ? margin.left + width : margin.left},0)`
      );

    yAxisG.call(yAxis);

    padding.bottom &&
      yAxisG
        .append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', margin.top + height - padding.bottom)
        .attr('y2', margin.top + height)
        .attr('stroke', 'currentColor');

    const xAxis =
      x.axis === 'top'
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');

    xAxisG
      .attr(
        'transform',
        `translate(0, ${
          x.axis === 'top' ? margin.top : height - margin.bottom
        })`
      )
      .call(xAxis);
    if (zooming?.enabled) {
      const zoomed = ({ transform }: { transform: ZoomTransform }) => {
        // transform g across only x axis
        dotRowsG.attr(
          'transform',
          `translate(${transform.x},0)scale(${transform.k},1)`
        );
        xAxisG.call(xAxis.scale(transform.rescaleX(xFn)));
      };

      const zoomFn = zoom<SVGSVGElement, unknown>()
        .scaleExtent([zooming.min || 1, zooming.max || 2])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on('zoom', zoomed);

      svg.call(zoomFn);
    }
  }, [
    data,
    id,
    margin,
    padding,
    x,
    y,
    classNameData,
    zooming,
    onMouseLeave,
    onMouseMove,
    onMouseOver,
  ]);

  React.useEffect(() => {
    refreshChart();
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, refreshChart]);

  return (
    <svg
      id={id}
      style={style}
      className={twMerge(defaultChartClassNames, className || '')}
    />
  );
};

export default BoxPlotH;
