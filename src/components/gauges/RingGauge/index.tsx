import { PieArcDatum, arc } from 'd3-shape';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { pointer, select, selectAll } from 'd3-selection';

// import { axisBottom } from 'd3-axis';
import { interpolateNumber } from 'd3-interpolate';
import { min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { transition } from 'd3-transition';

export interface RingGaugeProps {
  id: string;
  className?: string;
  labelKey: string;
  targetKey: string;
  dataKey: string;
  errorKey?: string;
  labels?: {
    position?: 'top' | 'bottom';
    className?: string;
  };
  data?: any[];
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  padding?: {
    arc?: number;
  };
  minRadius?: number;
  startAngle?: number;
  endAngle?: number;
  cornerRadius?: number;
  drawing?: {
    duration?: number;
    delay?: number;
  };
  tooltip?: {
    className?: string;
    html?: (d: any) => string;
  };
  classNameGauge?: string;
  classNameGaugeBg?: string;
}

const RingGauge = ({
  className,
  id,
  labelKey,
  targetKey,
  dataKey,
  data = [],
  margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  },
  padding = {
    arc: 5,
  },
  minRadius = 10,
  cornerRadius = 2,
  drawing = { duration: 1000, delay: 0 },
  startAngle = 0,
  endAngle = 270,
  tooltip,
  classNameGaugeBg = '',
  labels = { position: 'top' },
}: RingGaugeProps) => {
  const PI = Math.PI,
    numArcs = data.length;

  const refreshChart = React.useCallback(() => {
    const svg = select(`#${id}`);

    svg.selectAll('*').remove();

    const tooltipDiv =
      tooltip && select('#tooltip').node()
        ? select('#tooltip')
        : select('body')
            .append('div')
            .attr('id', 'tooltip')
            .style('position', 'absolute')
            .style('opacity', '0')
            .attr('class', mergeTailwindClasses(tooltip?.className));

    const g = svg.append('g');

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const getInnerRadius = (index: number) =>
        minRadius + (numArcs - (index + 1)) * (arcWidth + (padding.arc || 0)),
      getOuterRadius = (index: number) => getInnerRadius(index) + arcWidth;

    g.attr('transform', `translate(${width / 2},${height / 2})`);

    const innerWidth = width - (margin.left || 0) - (margin.right || 0),
      innerHeight = height - (margin.top || 0) - (margin.bottom || 0),
      chartRadius = Math.min(innerHeight, innerWidth) / 2;

    const scale = scaleLinear()
      .domain([0, 1])
      .range([0, (endAngle / 180) * PI]);

    const arcWidth =
      (chartRadius - minRadius - numArcs * (padding.arc || 5)) / numArcs;

    const arcFn = arc<PieArcDatum<any> | number>()
      .innerRadius((_d: any, i: number) => getInnerRadius(i))
      .outerRadius((_d: any, i: number) => getOuterRadius(i))
      .startAngle(((startAngle / 90) * PI) / 2)
      .endAngle((d: any) => scale(d))
      .cornerRadius(cornerRadius);

    g.append('g')
      .attr('class', `background-arcs`)
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr(
        'class',
        mergeTailwindClasses(
          ` fill-current text-gray-200 dark:text-gray-700`,
          classNameGaugeBg
        )
      )
      .attr('d', function (_d, i: number) {
        return arcFn(1, i);
      });

    transition();

    g.append('g')
      .attr('class', 'data')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', (d: any) =>
        mergeTailwindClasses('data-arc fill-current ', d.className)
      )
      .attr('d', '')
      .on('mouseenter', function (_event, d) {
        tooltipDiv.attr(
          'class',
          mergeTailwindClasses(tooltip?.className, 'tooltip')
        );
        tooltipDiv
          .style('opacity', 1)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .html(
            tooltip?.html
              ? tooltip.html(d)
              : `${d[labelKey]} <br/>${d[dataKey]}/${d[targetKey]}`
          );
      })
      .on('mousemove', function (event) {
        const [bX, bY] = pointer(event, select('body'));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
      })
      .on('mouseleave', function () {
        tooltipDiv.style('opacity', 0);
        tooltipDiv.html('');
      })
      .transition()
      .duration(drawing?.duration || 1000)
      .delay(drawing?.delay || 0)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attrTween('d', (d: any, i: number) => {
        const interpolate = interpolateNumber(
          0,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          min([d[dataKey] / d[targetKey], 1])
        );
        return (t: any) => arcFn(interpolate(t), i);
      });

    labels &&
      g
        .append('g')
        .attr('class', 'labels')
        .selectAll('.labels')
        .data(data)
        .enter()
        .append('text')
        .attr('text-anchor', 'end')
        .attr('class', `fill-current text-xs ${labels.className || ''}`)
        .attr('x', -5)
        .attr('y', (_d, i) =>
          labels?.position === 'bottom'
            ? getInnerRadius(i) + arcWidth - 1
            : -getInnerRadius(i) - 2
        )
        .text((d: any) => d[labelKey]);
  }, [
    PI,
    classNameGaugeBg,
    data,
    dataKey,
    drawing?.delay,
    drawing?.duration,
    endAngle,
    id,
    labelKey,
    labels,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    minRadius,
    numArcs,
    padding.arc,
    startAngle,
    cornerRadius,
    targetKey,
    tooltip,
  ]);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll('#tooltip').remove();
    };
  }, [data, refreshChart]);
  return (
    <svg
      id={id}
      className={mergeTailwindClasses(defaultChartClassNames, className || '')}
    />
  );
};

export default RingGauge;
