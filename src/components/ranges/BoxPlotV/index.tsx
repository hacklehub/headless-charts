import { ZoomTransform, zoom } from 'd3-zoom';
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

export interface BoxPlotVProps extends ChartProps {
  classNameData?: string;
  y: {
    minKey: string;
    maxKey: string;
    boxStart: string;
    boxEnd: string;
    midKey: string;
    min?: number;
    max?: number;
    axis?: 'right' | 'left';
    axisTicks?: number;
    classNameBoxes?: string;
    classNameLines?: string;
    classNameMap?: any;
  };
  x: {
    key: string;
    axis?: 'top' | 'bottom';
  };
  tooltip?: TooltipObjectType;
}

const BoxPlotV = ({
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
}: BoxPlotVProps) => {
  const { onMouseOver, onMouseMove, onMouseLeave } = useTooltip({
    id,
    tooltip,
    defaultHtml: (d: any) =>
      `min: ${d[y.minKey].toFixed(0)} <br/> range: ${+d[y.boxStart].toFixed(
        0
      )} to ${+d[y.boxEnd].toFixed(0)} <br/> mid: ${d[y.midKey].toFixed(
        0
      )} <br/> max: ${d[y.maxKey].toFixed(0)} `,
  });
  const refreshChart = React.useCallback(() => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const xFn: any = scaleBand()
      .domain(data.map((d: any) => d[x.key]))
      .range([
        margin.left + (padding.left || 0),
        width - margin.right - (padding.right || 0),
      ])
      .padding(padding.bar || 0.2);

    const yFn = scaleLinear()
      .domain([
        Number.isFinite(y.min) ? y.min : min(data.map((d: any) => d[y.minKey])),
        Number.isFinite(y.max) ? y.max : max(data.map((d: any) => d[y.maxKey])),
      ])
      .range([
        height - margin.bottom - (padding.bottom || 0),
        (padding.top || 0) + margin.top,
      ]);

    svg
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top - (padding.top || 0))
      .attr('width', width)
      .attr('height', height - margin.bottom - margin.top);

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

    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('x1', (d: any) => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr('x2', (d: any) => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr('y1', (d: any) => yFn(d[y.minKey]))
      .attr('y2', (d: any) => yFn(d[y.minKey]))
      .attr('class', `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr('y2', (d: any) => yFn(d[y.maxKey]));

    // Begin lines
    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('x1', (d: any) => xFn(d[x.key]))
      .attr('x2', (d: any) => xFn(d[x.key]))
      .attr('y1', (d: any) => yFn(d[y.minKey]))
      .attr('y2', (d: any) => yFn(d[y.minKey]))
      .attr('class', (d: any) =>
        twMerge('box-plot-line stroke-current', d.className || ``)
      )
      .transition()
      .duration(1000)
      .attr('x1', (d: any) => xFn(d[x.key]))
      .attr('x2', (d: any) => xFn(d[x.key]) + xFn.bandwidth());

    // Mid lines
    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('y1', (d: any) => yFn(d[y.midKey]))
      .attr('y2', (d: any) => yFn(d[y.midKey]))
      .attr('x1', (d: any) => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr('x2', (d: any) => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr('class', `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr('x1', (d: any) => xFn(d[x.key]))
      .attr('x2', (d: any) => xFn(d[x.key]) + xFn.bandwidth());

    // End lines
    dotRowsG
      .append('line')
      .attr('clip-path', 'url(#clip)')
      .attr('y1', (d: any) => yFn(d[y.maxKey]))
      .attr('y2', (d: any) => yFn(d[y.maxKey]))
      .attr('x1', (d: any) => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr('x2', (d: any) => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr('class', `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr('x1', (d: any) => xFn(d[x.key]))
      .attr('x2', (d: any) => xFn(d[x.key]) + xFn.bandwidth());

    // Mid rects
    dotRowsG
      .append('rect')
      .attr(
        'class',
        twMerge(
          'box-plot-box stroke-current fill-current opacity-50 ',
          y.classNameBoxes
        )
      )
      .attr('clip-path', 'url(#clip)')
      .attr('y', () => height - margin.bottom - (padding.bottom || 0))
      .attr('x', (d: any) => xFn(d[x.key]))
      .attr('width', xFn.bandwidth())
      .transition()
      .duration(1000)
      .attr('y', (d: any) => yFn(d[y.boxEnd]))
      .attr('height', (d: any) => yFn(d[y.boxStart]) - yFn(d[y.boxEnd]));

    const yAxis = y.axis === 'right' ? axisRight(yFn) : axisLeft(yFn);

    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
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

    if (zooming?.enabled) {
      const zoomed = ({ transform }: { transform: ZoomTransform }) => {
        // transform g across only y axis
        dotRowsG.attr(
          'transform',
          `translate(0, ${transform.y}) scale(1, ${transform.k})`
        );
        yAxisG.call(yAxis.scale(transform.rescaleY(yFn)));
      };

      const zoomFn: any = zoom<SVGSVGElement, unknown>()
        .scaleExtent([zooming.min || 1, zooming.max || 2])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on('zoom', zoomed);

      svg.call(zoomFn);
    }
  }, [
    classNameData,
    data,
    id,
    margin,
    padding,
    x,
    y,
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

export default BoxPlotV;
