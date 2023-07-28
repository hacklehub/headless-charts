// import { axisBottom } from 'd3';
import { ValueFn, pointer, select, selectAll } from 'd3';

import { mergeTailwindClasses } from '../../../utils';
import { scaleLinear } from 'd3';
import { useEffect } from 'react';

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
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  drawing?: { duration: number };
  tooltip?: {
    html?: (
      data: number,
      error: { data: number; className?: string | undefined } | undefined
      /* eslint-disable */
    ) => any;
    /* eslint-enable */
    className: string;
  };
  classNameGauge?: string;
  classNameGaugeBg?: string;
}

const LinearGauge = ({
  id,
  className,
  label,
  data = 0,
  max = 1,
  error,
  gaugeHeight = 6,
  marginLeft = 40,
  marginTop = 30,
  marginRight = 40,
  marginBottom = 10,
  drawing = { duration: 1000 },
  tooltip,
  classNameGauge = '',
  classNameGaugeBg = '',
}: LinearGaugeProps) => {
  const setup = () => {
    const svg = select(`#${id}`);

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const xFn = scaleLinear()
      .domain([0, max])
      .range([marginLeft, width - marginRight]);

    const g = svg.append('g');

    const gaugeG = g.append('g');

    gaugeG
      .append('text')
      .attr('class', 'fill-current text-lg')
      .text(label)
      .attr('text-anchor', 'middle')
      .attr('x', marginLeft + (width - marginLeft - marginRight) / 2)
      .attr('y', height - marginTop);

    gaugeG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses(
          'fill-current stroke-current text-gray-300 dark:text-gray-700',
          classNameGaugeBg
        )
      )
      .attr('x', marginLeft)
      .attr('y', height - marginBottom - gaugeHeight)
      .attr('width', width - marginLeft - marginRight)
      .attr('height', gaugeHeight)
      .attr('ry', gaugeHeight / 2);

    gaugeG
      .append('rect')
      .attr(
        'class',
        mergeTailwindClasses(
          'data-rect fill-current stroke-current',
          classNameGauge
        )
      )
      .attr('x', marginLeft)
      .attr('y', height - marginBottom - gaugeHeight)
      .attr('width', 0)
      .attr('height', gaugeHeight)
      .attr('ry', gaugeHeight / 2)
      .on('mouseenter', function () {
        // event, d
        tooltip &&
          tooltipDiv
            .style('opacity', 1)
            .html(tooltip.html ? tooltip.html(data, error) : data);
      })
      .on('mousemove', function (event) {
        // d
        const [bX, bY] = pointer(event, select('body'));
        tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
      })
      .on('mouseleave', function () {
        // event, d
        tooltip &&
          tooltipDiv
            .style('opacity', '0')
            .style('left', `0px`)
            .style('top', `0px`);
      })
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
        .attr('x', width - marginRight)
        .attr('y', height - marginBottom - gaugeHeight)
        .attr('ry', gaugeHeight / 2)
        .attr('width', 0)
        .attr('height', gaugeHeight)
        .on('mouseenter', function () {
          // event, d
          tooltip &&
            tooltipDiv
              .style('opacity', 1)
              .html(tooltip.html ? tooltip.html(data, error) : error);
        })
        .on('mousemove', function (event) {
          // , d
          const [bX, bY] = pointer(event, select('body'));
          tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
        })
        .on('mouseleave', function () {
          // event, d
          tooltip &&
            tooltipDiv
              .style('opacity', '0')
              .style('left', `0px`)
              .style('top', `0px`);
        })
        .transition()
        .duration(drawing.duration)
        .attr('x', () => xFn(max - (error.data || 0)))
        // d
        .attr('width', () => {
          // d
          return xFn(max) - xFn(max - (error.data || 0));
        });

    const tooltipDiv = select('#root')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', '0')
      .attr(
        'class',
        mergeTailwindClasses('tooltip ', tooltip && tooltip.className)
      );
  };

  const refreshChart = () => {
    const svg = select(`#${id}`);
    const width = +svg.style('width').split('px')[0];
    //   height = +svg.style('height').split('px')[0];

    const xFn = scaleLinear()
      .domain([0, max])
      .range([marginLeft, width - marginRight]);

    select('.data-rect')
      .transition()
      .duration(drawing.duration)
      .attr('width', xFn(data) - xFn(0));
  };

  useEffect(() => {
    setup();
  }, []);
  useEffect(() => {
    refreshChart();
    return () => {
      selectAll('.tooltip').remove();
    };
  }, [data, max]);
  return (
    <svg
      id={id}
      className={`w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-12 ${
        className || ''
      }`}
    />
  );
};

export default LinearGauge;
