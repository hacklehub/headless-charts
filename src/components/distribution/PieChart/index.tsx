import { arc, pie } from 'd3';
import { pointer, select } from 'd3-selection';
import { useCallback, useEffect } from 'react';

import { defaultChartClassNames } from '../../../utils';
import { interpolate } from 'd3-interpolate';
import { mergeTailwindClasses } from '../../../utils';
import { min } from 'd3-array';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface DataItem {
  name: string;
  [key: string]: any;
}

interface ClassNamePoints {
  classMap: { [key: string]: string };
}

interface DrawingOptions {
  duration: number;
}

interface LabelOptions {
  radius?: number;
  key: string;
  text?: (data: DataItem) => string;
  className?: string;
  labelsMap?: { [key: string]: string };
}

interface PieChartProps {
  data: DataItem[];
  id: string;
  className?: string;
  classNamePoints?: ClassNamePoints;
  paddingBar?: number;
  padding?: {
    left: number;
    right?: number;
    top: number;
    bottom?: number;
  };
  paddingAngle?: number;
  cornerRadius?: number;
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  value: string;
  drawing?: DrawingOptions;
  tooltip?: {
    className?: string;
    html?: (d: any) => string;
    keys?: string[];
  };
  labels: LabelOptions;
}

const PieChart = ({
  data,
  id,
  className = '',
  classNamePoints = { classMap: {} },
  padding = {
    left: 0,
    top: 0,
  },
  paddingAngle = 1,
  startAngle = 0,
  endAngle = 360,
  cornerRadius = 0,
  margin = {
    left: 40,
    right: 40,
    top: 40,
    bottom: 40,
  },
  innerRadius = 0,
  value,
  drawing,
  tooltip,
  labels,
}: PieChartProps) => {
  const refreshChart = useCallback(() => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0];
    const height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const pieFn = pie<DataItem>()
      .value((d: { [x: string]: any }) => d[value])
      .startAngle((startAngle / 180) * Math.PI || 0)
      .endAngle((endAngle / 180) * Math.PI || 2 * Math.PI)
      .padAngle(paddingAngle);

    const chartArea = [
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ];

    const radius =
      min(
        endAngle - startAngle <= 180 ? chartArea : chartArea.map((a) => a / 2)
      ) || 0;

    const arcFn = arc()
      .innerRadius(radius * innerRadius)
      .outerRadius(radius)
      .padAngle((paddingAngle / 360) * (2 * Math.PI))
      .cornerRadius(cornerRadius);

    const labelArc =
      labels?.radius &&
      arc<DataItem>()
        .innerRadius(radius * labels.radius)
        .outerRadius(radius * labels.radius);

    const arcs = pieFn(data);

    const pathsG = g
      .append('g')
      .attr(
        'transform',
        `translate(${padding.left + margin.left + chartArea[0] / 2},${
          endAngle - startAngle <= 180
            ? height - margin.bottom - (padding.bottom || 0)
            : margin.top + padding.top + chartArea[1] / 2
        })`
      );
    const tooltipDiv = select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr('class', `${tooltip?.className || ''}`);

    const paths = pathsG
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('class', (d) =>
        mergeTailwindClasses(
          classNamePoints.classMap[d.data.name],
          'fill-current stroke-current'
        )
      )
      /* eslint-disable */
      // @ts-ignore
      .attr('d', arcFn)
      .on('mouseenter', function (event: MouseEvent, d: any) {
        if (tooltip) {
          tooltipDiv.style('opacity', 1);
          const [bX, bY] = pointer(event, select('body'));
          tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
          tooltipDiv.html(
            tooltip && tooltip.html
              ? tooltip.html(d)
              : tooltip.keys
              ? tooltip.keys
                  .map((key) => `${key}: ${d.data[key] || ''}`)
                  .join('<br/>')
              : `${d.data.name} = ${d.data[value]} `
          );
        }
      })
      .on('mousemove', function (event: MouseEvent) {
        const [bX, bY] = pointer(event, select('body'));
        tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
      })
      .on('mouseleave', function () {
        tooltip &&
          tooltipDiv
            .style('opacity', '0')
            .style('left', '0px')
            .style('top', '0px');
      });

    drawing &&
      drawing.duration &&
      paths
        .transition()
        .duration(drawing.duration)
        .attrTween('d', function (d) {
          const i = interpolate({ startAngle: 0, endAngle: 0 }, d);

          // @ts-ignore
          return (t) => arcFn(i(t));
        });

    const labelsG = labelArc && pathsG.append('g').attr('class', 'labels');

    labelArc &&
      labelsG &&
      labelsG
        .selectAll('g')
        .data(arcs)
        .enter()
        .append('text')
        .attr(
          'transform',
          // @ts-ignore
          (d: { data: DataItem }) => `translate(${labelArc.centroid(d)})`
        )
        .attr('text-anchor', 'middle')
        .attr(
          'class',
          `${labels?.className || ''} ${
            (labels.labelsMap && labels.labelsMap[labels.key]) || ''
          } fill-current`
        )
        .text((d: { data: DataItem }) =>
          labels.text ? labels.text(d.data) : d.data[labels.key]
        );
    /* eslint-enable */
  }, [
    id,
    startAngle,
    endAngle,
    paddingAngle,
    margin,
    innerRadius,
    cornerRadius,
    labels,
    data,
    padding,
    tooltip,
    drawing,
    value,
    classNamePoints,
  ]);

  useEffect(() => {
    refreshChart();
  }, [data, refreshChart]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(defaultChartClassNames, className)}
    />
  );
};

export default PieChart;
