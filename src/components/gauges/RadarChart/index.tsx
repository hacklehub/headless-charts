import React, { useCallback } from 'react';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { line, scaleLinear } from 'd3';
import { select, selectAll } from 'd3-selection';

import { ChartProps } from '../../../types';
import { transition } from 'd3-transition';

export interface RadarChartProps extends ChartProps {
  metrics: { key: string }[];
  classNameMap?: any;
  label: { key: string };
  min?: number;
  max?: number;
}

const RadarChart = ({
  id,
  data,
  className,
  metrics = [],
  label = {
    key: 'name',
  },
  classNameMap = {},
  min = 0,
  max = 1,
  margin = { top: 20, bottom: 20, left: 20, right: 20 },
  drawing = undefined,
}: RadarChartProps) => {
  const refreshChart = useCallback(() => {
    const svg = select(`#${id}`);

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0];
    const height = +svg.style('height').split('px')[0];

    const radius =
      Math.min(
        width - margin.left - margin.right,
        height - margin.top - margin.bottom
      ) / 2;

    const g = svg.append('g');
    // .attr('transform', `translate(${width / 2},${height / 2})`);

    const valueFn = scaleLinear().domain([min, max]).range([0, radius]);

    const angleToCoordinate = (angle: number, value: number) => {
      const x = Math.cos(angle) * valueFn(value);
      const y = Math.sin(angle) * valueFn(value);
      return { x: width / 2 + x, y: height / 2 - y };
    };

    const featureData = metrics.map((metric: any, idx: number) => {
      const angle = Math.PI / 2 + (2 * Math.PI * idx) / metrics.length;
      return {
        key: metric.key,
        angle: angle,
        line_coord: angleToCoordinate(angle, max * 0.96),
        label_coord: angleToCoordinate(angle, max * 1.08),
      };
    });

    // draw axis line
    g.selectAll('line')
      .data(featureData)
      .join((enter) =>
        enter
          .append('line')
          .attr('x1', width / 2)
          .attr('y1', height / 2)
          .attr('x2', (d: any) => d.line_coord.x)
          .attr('y2', (d: any) => d.line_coord.y)
          .attr('stroke', 'black')
      );

    // draw axis label
    svg
      .selectAll('.axislabel')
      .data(featureData)
      .join((enter) =>
        enter
          .append('text')
          .attr('class', 'text-xs')
          .attr('x', (d: any) => d.label_coord.x)
          .attr('y', (d: any) => d.label_coord.y)
          .text((d: any) => d.key)
          .attr('text-anchor', 'middle')
      );

    const radarLine: any = line()
      .x((d: any) => d.x)
      .y((d: any) => d.y);

    function getPathCoordinates(d: any) {
      const coordinates = [];
      for (let i = 0; i < metrics.length; i++) {
        const metricName = metrics[i].key;
        const angle = Math.PI / 2 + (2 * Math.PI * i) / metrics.length;
        coordinates.push(angleToCoordinate(angle, d[metricName]));
      }
      coordinates.push(coordinates[0]);
      return coordinates;
    }

    transition();

    const radarArcs = g
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('fill-opacity', 0.7)
      .attr('class', (d: any) =>
        mergeTailwindClasses(
          `stroke-2`,
          d.className,
          classNameMap[d[label.key]]
        )
      )
      .attr('d', (d: any) => {
        if (drawing) {
          const zeroObject = {
            name: d[label.key],
            ...metrics.reduce((acc: any, metric: any) => {
              acc[metric.key] = 0;
              return acc;
            }, {}),
          };

          return radarLine(getPathCoordinates(zeroObject));
        }
        return radarLine(getPathCoordinates(d));
      });

    if (drawing)
      radarArcs
        .transition()
        .duration(drawing?.duration || 1000)
        .delay(drawing.delay || 0)
        .attr('d', (d: any) => {
          return radarLine(getPathCoordinates(d));
        });
  }, [classNameMap, data, id, label, margin, max, metrics, min, drawing]);

  React.useEffect(() => {
    refreshChart();
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, refreshChart]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(className, defaultChartClassNames)}
    />
  );
};

export default RadarChart;
