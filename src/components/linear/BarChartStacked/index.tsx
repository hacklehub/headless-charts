import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { max, sum } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { useCallback, useEffect } from 'react';
import useTooltip, { TooltipObjectType } from '../../../hooks/useTooltip';

import { format } from 'd3-format';
import { stack } from 'd3';
import { transition } from 'd3-transition';

interface DataItem {
  [key: string]: any;
}

interface AxisItems {
  key: string;
  className?: string;
  axis?: string;
  axisTicks?: number;
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

interface StackedArrayItem {
  0: number;
  1: number;
  data: DataItem;
}

interface StackedDataItem {
  start: number;
  end: number;
  data: DataItem;
  index: number;
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
  waterfall?: boolean;
  x: AxisItems[];
  tickFormat?: string;
  y: AxisItems;
  tooltip?: TooltipObjectType;
  drawing?: Drawing;
  dataLabel?: DataLabel;
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
  drawing = undefined,
  dataLabel,
}: BarChartStackedProps) => {
  const { onMouseOver, onMouseMove, onMouseLeave } = useTooltip({
    id,
    tooltip,
    defaultHtml: (d: any) =>
      `${d.data[y.key]} <br/> ${x
        .map((field) => `${field.key}: ${d.data[field.key]}`)
        .join('<br/>')}`,
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

    const dataStacked = stack().keys(x.map((column) => column.key))(data);

    transition();
    // @ts-ignore
    g.append('g')
      .selectAll('g')
      .data(dataStacked)
      .enter()
      .append('g')
      // @ts-ignore
      .attr('class', (d: any) => x[d.index].className)
      .selectAll('rect')
      .data((d: StackedArrayItem[], index: number) => {
        return d.map((v: StackedArrayItem) => {
          return {
            start: v[0],
            end: v[1],
            data: v.data,
            index,
          };
        });
      })
      .enter()
      .append('rect')
      .attr('x', () => xFn(0))
      .attr('y', (d: StackedDataItem) => {
        return (
          (yFn(d.data[y.key]) || 0) +
          (waterfall ? (yFn.bandwidth() / x.length) * d.index : 0)
        );
      })
      .attr('width', (d: StackedDataItem) =>
        drawing?.duration ? 0 : xFn(d.end) - xFn(d.start)
      )
      .attr('height', waterfall ? yFn.bandwidth() / x.length : yFn.bandwidth())
      .on('mouseenter', onMouseOver)
      .on('mousemove', onMouseMove)
      .on('mouseleave', onMouseLeave)
      .transition()
      .duration(drawing?.duration || 0)
      .delay((_, i) => (drawing?.delay || 0) * i)
      .attr('x', (d: StackedDataItem) => xFn(d.start))
      .attr('width', (d: StackedDataItem) => xFn(d.end) - xFn(d.start));

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
      selectAll(`#tooltip-${id}`).remove();
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
