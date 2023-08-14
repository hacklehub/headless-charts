import React, { useEffect, useRef } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValueFn, pointer, select, selectAll } from 'd3';

import { interpolate } from 'd3-interpolate';
import { mergeTailwindClasses } from '../../../utils';
import { scaleLinear } from 'd3';

interface LinearGaugeProps {
  id: string;
  className?: string;
  label:
    | string
    | number
    | boolean
    | ValueFn<SVGTextElement, unknown, string | number | boolean | null>
    | null;
  data?: number;
  max?: number;
  error?: { data: number; className?: string };
  gaugeHeight?: number;
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  drawing?: { duration: number };
  tooltip?: {
    html?: string;
    className?: string;
  };
  classNameGauge?: string;
  classNameGaugeBg?: string;
  startAngle?: number;
  nameKey: string;
  // endAngle?: number;
}

const LinearGauge = ({
  id,
  className,
  label,
  data = 0,
  max = 1,
  error,
  gaugeHeight = 6,
  margin = {
    left: 40,
    top: 30,
    right: 40,
    bottom: 10,
  },
  drawing = { duration: 1000 },
  tooltip = undefined,
  classNameGauge = '',
  classNameGaugeBg = '',
  startAngle = 0,
  nameKey = 'name',
}: // endAngle = 360 + startAngle,
LinearGaugeProps) => {
  const setup = React.useCallback(() => {
    const svg = select(`#${id}`);

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0];
    const height = +svg.style('height').split('px')[0];

    const xFn = scaleLinear()
      .domain([0, max])
      .range([margin.left || 0, width - (margin.right || 0)]);

    const g = svg.append('g');

    const gaugeG = g.append('g');

    gaugeG
      .append('text')
      .attr('class', 'fill-current text-lg')
      .text(label)
      .attr('text-anchor', 'middle')
      .attr(
        'x',
        (margin.left || 0) +
          (width - (margin.left || 0) - (margin.right || 0)) / 2
      )
      .attr('y', height - (margin.top || 0));

    gaugeG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses(
          'fill-current stroke-current text-gray-300 dark:text-gray-700',
          classNameGaugeBg
        )
      )
      .attr('x', margin.left || 0)
      .attr('y', height - (margin.bottom || 0) - gaugeHeight)
      .attr('width', width - (margin.left || 0) - (margin.right || 0))
      .attr('height', gaugeHeight)
      .attr('ry', gaugeHeight / 2)
      .on('mouseenter', function () {
        tooltip &&
          tooltipDiv
            .style('opacity', 1)
            .html(
              tooltip?.html || `Data: ${data} <br/> Error: ${error?.data || 0} `
            );
      })
      .on('mousemove', function (event) {
        const [bX, bY] = pointer(event, select('body'));
        tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
      })
      .on('mouseleave', function () {
        tooltip &&
          tooltipDiv
            .style('opacity', '0')
            .style('left', `0px`)
            .style('top', `0px`);
      });

    gaugeG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses(
          'data-rect fill-current stroke-current',
          classNameGauge
        )
      )
      .attr('x', margin.left || 0)
      .attr('y', height - (margin.bottom || 0) - gaugeHeight)
      .attr('width', 0)
      .attr('height', gaugeHeight)
      .attr('ry', gaugeHeight / 2)
      .transition()
      .duration(drawing.duration)
      .attr('width', xFn(data) - xFn(0));

    error &&
      error.data &&
      gaugeG
        .append('rect')
        .attr(
          'class',
          mergeTailwindClasses(
            'data-rect fill-current stroke-current text-red-700',
            (error && error.className) || ''
          )
        )
        .attr('x', width - (margin.right || 0))
        .attr('y', height - (margin.bottom || 0) - gaugeHeight)
        .attr('ry', gaugeHeight / 2)
        .attr('width', 0)
        .attr('height', gaugeHeight)
        .transition()
        .duration(drawing.duration)
        .attr('x', () => xFn(max - (error.data || 0)))
        .attr('width', () => {
          return xFn(max) - xFn(max - (error.data || 0));
        });

    const tooltipDiv = select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr(
        'class',
        mergeTailwindClasses('tooltip ', tooltip && tooltip.className)
      );
  }, [
    classNameGauge,
    classNameGaugeBg,
    data,
    drawing,
    error,
    gaugeHeight,
    id,
    label,
    margin,
    max,
    tooltip,
  ]);

  const previousArcs = useRef<any[]>([]);

  const refreshChart = React.useCallback(() => {
    const svg = select(`#${id}`);
    const width = +svg.style('width').split('px')[0];
    /* eslint-disable */

    const xFn = scaleLinear()
      .domain([0, max])
      .range([margin.left || 0, width - (margin.right || 0)]);

    select('.data-rect')
      .transition()
      .duration(drawing?.duration || 0)
      .attr('width', xFn(data) - xFn(0))
      .attrTween('d', function (d) {
        const previousArc = previousArcs.current.find(
          // @ts-ignore
          (a) => a.data[nameKey] === d.data[nameKey]
        );

        const i = interpolate(
          {
            startAngle: previousArc?.startAngle || (startAngle / 180) * Math.PI,
            endAngle: previousArc?.endAngle || (startAngle / 180) * Math.PI,
          },
          // @ts-ignore
          d
        );

        // @ts-ignore
        return (t) => arcFn(i(t));
      });

    const timeOut = setTimeout(() => {
      // @ts-ignore
      previousArcs.current = arcs;
    }, drawing?.duration);

    /* eslint-enable */
    return () => {
      clearTimeout(timeOut);
    };
  }, [data, drawing, id, margin, max]);

  useEffect(() => {
    setup();
  }, [setup]);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll('.tooltip').remove();
    };
  }, [data, max, refreshChart]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(
        className,
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart `
      )}
    />
  );
};

export default LinearGauge;
