import { axisBottom, axisLeft, axisTop } from 'd3-axis';
import { max, min } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3';
import { select, selectAll } from 'd3-selection';
import {
  stack,
  stackOffsetDiverging,
  stackOffsetExpand,
  stackOffsetWiggle,
  stackOrderInsideOut,
  stackOrderReverse,
} from 'd3';
import { useCallback, useEffect } from 'react';

import { ChartProps } from '../../../types';
import { DateTime } from 'luxon';
import { TooltipObjectType } from '../../../hooks/useTooltip';
import { area } from 'd3-shape';
import { defaultChartClassNames } from '../../../utils';
import { twMerge } from 'tailwind-merge';
import { zoom } from 'd3-zoom';

interface XAxis {
  key: string;
  scalingFunction?: 'linear' | 'time';
  convert?: (d: any) => any;
  axis?: 'bottom' | 'top';
  format?: string;
  axisTicks?: number;
  axisLabel?: string;
  axisLabelPosition?: 'right' | 'bottom';
  start?: object | number;
  end?: object | number;
}

interface AreaChartProps extends ChartProps {
  data: any[];
  id: string;
  className?: string;
  x: XAxis;
  y: Array<{
    key: string;
    axis?: 'left' | 'right';
    start?: number;
    end?: number;
    ticks?: number;
    className?: string;
    curve?: 'rounded' | 'step' | 'line' | 'bumpX' | undefined;
    symbol?:
      | 'none'
      | 'circle'
      | 'square'
      | 'star'
      | 'triangle'
      | 'wye'
      | 'cross'
      | 'diamond';
    size?: number;
    unknown?: any;
  }>;
  stacking?: {
    type?: 'normal' | '100%' | 'streamgraph' | 'diverging';
  };

  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  tooltip?: TooltipObjectType;
  zooming?: {
    enabled: boolean;
    min?: number;
    max?: number;
  };
}

const AreaChart = ({
  data = [],
  id,
  className,
  x,
  y,
  stacking = {
    type: 'normal',
  },
  // tooltip,

  padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40,
  },
  zooming,
  style = {},
}: AreaChartProps) => {
  const refreshChart = useCallback(() => {
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    svg
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', margin?.left || 0)
      .attr('y', (margin?.top || 0) - (padding.top || 0))
      .attr(
        'width',
        width -
          (padding?.right || 0) -
          (margin?.right || 0) -
          (margin?.left || 0)
      )
      .attr('height', height);

    // const shapeMapping = {
    //   circle: symbolCircle,
    //   diamond: symbolDiamond,
    //   triangle: symbolTriangle,
    //   square: symbolSquare,
    //   cross: symbolCross,
    //   star: symbolStar,
    //   wye: symbolWye,
    //   default: symbolCircle,
    // };

    // const curveMapping = {
    //   rounded: curveCatmullRom,
    //   step: curveStep,
    //   line: curveLinear,
    //   bumpX: curveBumpX,
    //   default: curveLinear,
    // };

    // @ts-ignore
    const toDateTime = (d) => DateTime.fromFormat(d[x.key], x.format);

    const xFn =
      x.scalingFunction === 'time' ? scaleTime().nice() : scaleLinear();

    const setDefaultXDomain = (xFunction: any) => {
      x.scalingFunction === 'time'
        ? xFunction.domain([
            Number.isFinite(x.start)
              ? x.start
              : min(data.map((d) => toDateTime(d))),
            Number.isFinite(x.end)
              ? x.end
              : max(data.map((d) => toDateTime(d))),
          ])
        : xFunction.domain([
            Number.isFinite(x.start)
              ? x.start
              : !x.convert
              ? min(data.map((d: any) => d[x.key]))
              : // @ts-ignore
                min(data.map((d: any) => x.convert(d))),
            Number.isFinite(x.start)
              ? x.end
              : x.convert
              ? // @ts-ignore
                max(data.map((d) => x.convert(d)))
              : max(data.map((d: any) => d[x.key])),
          ]);
    };

    setDefaultXDomain(xFn);
    xFn.range([
      (margin?.left || 0) + (padding?.left || 0),
      width - (margin?.right || 0) - (padding?.right || 0),
    ]);

    const xAxis =
      x.axis === 'top'
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');
    xAxisG
      .attr(
        'transform',
        `translate(0, ${
          x.axis === 'top' ? margin?.top || 0 : height - (margin?.bottom || 0)
        })`
      )
      .call(xAxis);

    const stackerFn = stack().keys(y.map((column) => column.key));

    stacking?.type === '100%' && stackerFn.offset(stackOffsetExpand);

    stacking?.type === 'streamgraph' &&
      stackerFn.offset(stackOffsetWiggle).order(stackOrderInsideOut);

    stacking?.type === 'diverging' &&
      stackerFn.offset(stackOffsetDiverging).order(stackOrderReverse);

    const dataStacked = stackerFn(data);

    const yFn = scaleLinear()
      // @ts-ignore
      .domain([
        min(dataStacked, (d) => min(d, (d) => d[0])),
        max(dataStacked, (d) => max(d, (d) => d[1])),
      ])
      .range([
        height - (margin?.bottom || 0) - (padding?.bottom || 0),
        (margin?.top || 0) + (padding?.top || 0),
      ]);

    const yAxis = axisLeft(yFn).ticks(y[0].ticks || 5);

    const yAxisG = g.append('g').attr('class', 'axis--y axis ');

    yAxisG.attr('transform', `translate(${margin?.left || 0}, 0)`).call(yAxis);

    const areaFn = area()
      .x((d: any) =>
        x.scalingFunction === 'time' ? xFn(toDateTime(d)) : xFn(d.data[x.key])
      )
      .y0((d: any) => yFn(d[0]))
      .y1((d: any) => yFn(d[1]));

    const areaG = g.append('g').attr('class', 'area');

    const redraw = () => {
      areaG
        .selectAll('path')
        .data(dataStacked)
        .join('path')

        // @ts-ignore
        .attr('d', areaFn)
        .attr('class', (d: any, i) =>
          twMerge(
            'fill-current stroke-1 [fill-opacity:50%]',
            y[i].className,
            d?.className || ''
          )
        )
        .attr('clip-path', 'url(#clip)');
    };
    redraw();

    const extent = [
      [margin?.left || 0, margin?.top || 0],
      [width, height],
    ];

    if (zooming?.enabled) {
      const zoomFunc = zoom()
        .scaleExtent([zooming?.min || 1, zooming?.max || 1.2])
        // @ts-ignore
        .extent(extent)
        // @ts-ignore
        .translateExtent(extent)
        .on('zoom', zoomed);

      function zoomed(event: MouseEvent) {
        xFn.range(
          [
            (margin?.left || 0) + (padding?.left || 0),
            width - (margin?.right || 0) - (padding?.right || 0),
          ].map(
            // @ts-ignore
            (d: any) => event.transform.applyX(d)
          )
        );
        xAxisG.call(xAxis);
        redraw();
      }
      svg.call(zoomFunc);
    }
  }, []);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, refreshChart]);

  return (
    <svg
      id={id}
      style={style}
      className={twMerge(defaultChartClassNames, className)}
    />
  );
};

export default AreaChart;
