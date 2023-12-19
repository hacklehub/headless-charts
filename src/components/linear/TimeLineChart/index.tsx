import { axisBottom, scaleBand, scaleLinear, scaleTime } from 'd3';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { max, min } from 'd3-array';
import { select, selectAll } from 'd3-selection';
import { useCallback, useEffect } from 'react';

import { ChartProps } from '../../../types';

interface TimeLineChartProps extends ChartProps {
  y?: {
    key: string;
    className?: string;
  };
  events: {
    isTime?: boolean;

    shapeKey?: string;
    shapeMapping?: {
      [key: string]: 'circle' | 'rect' | 'line';
    };
    // Only for rects
    startKey: string;
    endKey?: string;

    classNameKey?: string;
    classNameMapping?: object;
    // only for circles
    sizeKey?: string;
  };
}

const TimeLineChart = ({
  id,
  data,
  className,
  events = {
    startKey: 'start',
  },
  padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    bar: 0.1,
  },
  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  y,
}: TimeLineChartProps) => {
  const refreshChart = useCallback(() => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const xFn = events?.isTime ? scaleTime() : scaleLinear();

    xFn
      .domain([
        // @ts-ignore
        events?.isTime
          ? // @ts-ignore
            new Date(min(data, (d) => d[events.startKey]))
          : // @ts-ignore
            min(data, (d) => d[events.startKey]),
        // @ts-ignore
        events?.isTime
          ? // @ts-ignore
            new Date(max(data, (d) => d[events?.endKey]))
          : // @ts-ignore
            max(data, (d) => d[events?.startKey]),
      ])
      // @ts-ignore
      .range([
        (padding.left || 0) + margin.left,
        width - (padding.right || 0) - margin.right,
      ]);

    const g = svg.append('g');

    const listOfYValues = [
      // @ts-ignore
      ...new Set(data.map((d) => (y?.key ? d[y?.key] : 1))),
    ];

    const yFn = scaleBand()
      .domain(listOfYValues)
      .range([
        (padding.top || 0) + margin.top,
        height - (padding.bottom || 0) - margin.bottom,
      ])
      .padding(padding.bar || 0.1);

    g.append('g')
      .selectAll('rect')
      .data(listOfYValues)
      .enter()
      .append('rect')
      .attr('class', `track ${y?.className || ''}`)
      .attr('x', (padding.left || 0) + margin.left)
      .attr('y', (d) => yFn(d) || 0)
      .attr(
        'width',
        width -
          (padding.right || 0) -
          margin.right -
          (padding.left || 0) -
          margin.left
      )
      .attr('height', yFn.bandwidth());

    const augmentedDataWithShapeClassNameAndSize = data.map((d) => {
      const shape = events?.shapeMapping
        ? // @ts-ignore
          events?.shapeMapping[d[events?.shapeKey]]
        : 'circle';

      // @ts-ignore
      const width =
        shape === 'rect'
          ? // @ts-ignore
            xFn(d[events?.endKey]) - xFn(d[events?.startKey])
          : 0;

      const className = events?.classNameMapping
        ? // @ts-ignore
          events?.classNameMapping[d[events?.classNameKey]]
        : '';
      // @ts-ignore
      const size = events?.sizeKey ? d[events?.sizeKey] : 5;

      return {
        ...d,
        shape,
        className,
        size,
        width,
      };
    });

    console.log(augmentedDataWithShapeClassNameAndSize);

    const xAxis = axisBottom(xFn);

    g.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
  }, []);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, id, className]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(defaultChartClassNames, className)}></svg>
  );
};

export default TimeLineChart;
