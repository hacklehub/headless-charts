import React from 'react';
import { axisBottom } from 'd3-axis';
import { mergeTailwindClasses } from '../../../utils';
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
  classNameData = 'text-blue-500',
  label = '',
  min = 0,
  classNameBase = 'text-gray-300 dark:text-gray-600',
  base,
  classNameTarget = 'text-black',
  target,
  threshold,
  classNameThreshold = `text-gray-200 dark:text-gray-700`,
  max,
  classNameMax = `text-gray-100 dark:text-gray-800`,
  margin = {
    left: 120,
    top: 10,
    right: 20,
    bottom: 0,
  },

  axisHeight = 20,
  height = 50,
}: BulletChartProps) => {
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
      .attr('class', `stroke-current ${className}`)
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
      .attr('class', `${classNameThreshold} fill-current`)
      .attr('x', xFn(min))
      .attr('y', 0)
      .attr('width', xFn(threshold))
      .attr('height', height - axisHeight);

    bulletG
      .append('rect')
      .attr('class', `${classNameBase} fill-current`)
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
      .attr('class', `${classNameData} fill-current`)
      .attr('x', xFn(min))
      .attr('y', margin.top)
      .attr('width', 0)
      .attr('height', height - axisHeight - margin.top * 2)
      .transition()
      .duration(1000)
      .attr('width', xFn(data));

    const xAxisG = g.append('g').attr('class', 'axis--x axis ');

    const xAxis = axisBottom(xFn).ticks(5);

    xAxisG
      .attr('transform', `translate(${margin.left}, ${height - axisHeight})`)
      .call(xAxis);
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
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart h-12`,
        className
      )}
    />
  );
};

export default BulletChart;
