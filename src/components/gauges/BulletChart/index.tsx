import React, { useRef } from 'react';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';

import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';

export interface BulletChartProps {
  id: string;
  className?: string;
  data: number;
  classNameData?: string;
  label?: string;
  min?: number;
  classNameBase?: string;
  base: number;
  classNameTarget?: string;
  target: number;
  threshold: number;
  classNameThreshold?: string;
  max: number;
  classNameMax?: string;
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  axisHeight?: number;
  height?: number;
}

const BulletChart = ({
  id,
  className,
  data = 0,
  classNameData = 'fill-blue-500 stroke-blue-500',
  label = '',
  min = 0,
  classNameBase = 'fill-gray-300 dark:fill-gray-500 dark:stroke-gray-500',
  base,
  classNameTarget = 'fill-black stroke-black dark:fill-white dark:stroke-white',
  target,
  threshold,
  classNameThreshold = `fill-gray-200 stroke-gray-200 dark:fill-gray-600 dark:stroke-gray-600`,
  max,
  classNameMax = `fill-gray-100 stroke-grey-100 dark:fill-gray-700 dark:stroke-gray-700`,
  margin = {
    left: 120,
    top: 10,
    right: 20,
    bottom: 0,
  },

  axisHeight = 20,
  height = 50,
}: BulletChartProps) => {
  const previousData = useRef(0);
  const refreshData = React.useCallback(() => {
    const svg = select(`#${id}`);

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0];

    const xFn = scaleLinear()
      .domain([min, max])
      .range([0, width - margin.left - margin.right]);

    const g = svg.append('g');

    g.append('text')
      .text(label)
      .attr(
        'class',
        mergeTailwindClasses(`fill-current stroke-current `, className)
      )
      .attr('text-anchor', 'end')
      .attr('font-size', '0.8em')
      .attr('x', margin.left - 10)
      .attr('y', height - axisHeight - 5);

    const bulletG = g
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`);

    bulletG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses('fill-current stroke-current ', classNameMax)
      )
      .attr('x', xFn(min))
      .attr('y', 0)
      .attr('width', xFn(max))
      .attr('height', height - axisHeight);

    bulletG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses(`fill-current stroke-current `, classNameThreshold)
      )
      .attr('x', xFn(min))
      .attr('y', 0)
      .attr('width', xFn(threshold))
      .attr('height', height - axisHeight);

    bulletG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses(`fill-current stroke-current `, classNameBase)
      )
      .attr('x', xFn(min))
      .attr('y', 0)
      .attr('width', xFn(base))
      .attr('height', height - axisHeight);

    bulletG
      .append('line')
      .attr('y1', 5)
      .attr('y2', height - axisHeight - 5)
      .attr('x1', xFn(target))
      .attr('x2', xFn(target))
      .attr(
        'class',
        mergeTailwindClasses(`stroke-1 stroke-current `, classNameTarget)
      );

    transition();

    bulletG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses(`fill-current stroke-current `, classNameData)
      )
      .attr('x', xFn(min))
      .attr('y', margin.top)
      .attr('width',  xFn(previousData.current) - xFn(min))
      .attr('height', height - axisHeight - margin.top * 2)
      .transition()
      .duration(1000)
      .attr('width', xFn(data) - xFn(min));

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');

    const xAxis = axisBottom(xFn).ticks(5);

    xAxisG
      .attr('transform', `translate(${margin.left}, ${height - axisHeight})`)
      .call(xAxis);

    previousData.current = data;
  }, [
    axisHeight,
    base,
    className,
    classNameBase,
    classNameData,
    classNameMax,
    classNameTarget,
    classNameThreshold,
    data,
    height,
    id,
    label,
    margin.left,
    margin.right,
    margin.top,
    max,
    min,
    target,
    threshold,
  ]);
  React.useEffect(() => {
    refreshData();
  }, [data, refreshData]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(
        defaultChartClassNames,
        `h-12`,
        className
      )}
    />
  );
};

export default BulletChart;
