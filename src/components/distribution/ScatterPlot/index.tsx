import React, { useEffect } from 'react';
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
import { defaultChartClassNames } from '../../../utils';
import { twMerge } from 'tailwind-merge';
import {
  line,
  symbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye,
} from 'd3-shape';
import { max, min } from 'd3-array';
import { select, selectAll } from 'd3-selection';
import useTooltip, { TooltipObjectType } from '../../../hooks/useTooltip';

import { ChartProps } from '../../../types';
import { scaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';

// import { brush } from 'd3-brush';

export interface ScatterPlotProps extends ChartProps {
  x: {
    key: string;
    start?: number;
    end?: number;
    axis?: 'top' | 'bottom';
    axisTicks?: number;
    convert?: (d: any) => number;
  };
  y: {
    key: string;
    start?: number;
    end?: number;
    axis?: 'left' | 'right';
    axisTicks?: number;
    convert?: (d: any) => number;
  };
  color?: {
    key: string;
    classNameMap?: {
      [key: string]: string;
    };
  };
  size?: {
    key: string;
    min?: number;
    max?: number;
    default?: number;
  };
  shape?: {
    key: string;
    shapeMap?: {
      [key: string]: any;
    };
  };
  tooltip?: TooltipObjectType;
  onClick?: (event: any, d: any) => void;
  connect?: {
    enabled?: boolean;
    className?: string;
  };
  drawing?: {
    delay?: number;
  };
  zooming?: {
    enabled?: boolean;
    min?: number;
    max?: number;
  };
}

const ScatterPlot = ({
  data,
  id,
  className,
  x,
  y,
  color,
  size,
  tooltip,
  shape,
  margin = {
    left: 40,
    right: 20,
    top: 40,
    bottom: 40,
  },
  padding = {
    left: 10,
    right: 10,
    bottom: 10,
    top: 10,
  },
  onClick,
  zooming = {},
  drawing,
  connect = {},
}: ScatterPlotProps) => {
  const defaultHtml = (d: any) =>
    `${x.key} ${d[x.key]}<br/>${y.key} ${d[y.key]}<br/>
    ${color?.key ? `${color.key} ${d[color.key]}<br/>` : ''}
    ${size?.key ? `${size.key} ${d[size.key]}<br/>` : ''}
    ${shape?.key ? `${shape.key} ${d[shape.key]}<br/>` : ''}`;

  const { onMouseOver, onMouseLeave, onMouseMove } = useTooltip({
    id,
    tooltip,
    defaultHtml,
  });
  const refreshChart = React.useCallback(() => {
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0],
      height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const xFn = scaleLinear().range([
      margin.left + (padding.left || 0),
      width - margin.right,
    ]);

    const setDefaultDomain = (xFn: any, yFn: any) => {
      xFn.domain([
        x.start !== null && x.start !== undefined
          ? x.start
          : min(
              data.map((d: any) => (x.convert ? x.convert(d[x.key]) : d[x.key]))
            ),

        x.end !== null && x.end !== undefined
          ? x.end
          : max(
              data.map((d: any) => (x.convert ? x.convert(d[x.key]) : d[x.key]))
            ),
      ]);

      yFn.domain([
        y.start !== null && y.start !== undefined
          ? y.start
          : min(
              data.map((d: any) => (y.convert ? y.convert(d[y.key]) : d[y.key]))
            ),
        y.end !== null && y.end !== undefined
          ? y.end
          : max(
              data.map((d: any) => (y.convert ? y.convert(d[y.key]) : d[y.key]))
            ),
      ]);
    };

    const xAxis = (x.axis === 'top' ? axisTop(xFn) : axisBottom(xFn)).ticks(
      x.axisTicks || 5
    );

    const yFn = scaleLinear().range([
      height - margin.bottom - (padding.top || 0) - (padding.bottom || 0),
      margin.top + (padding.top || 0),
    ]);

    setDefaultDomain(xFn, yFn);
    const yAxis = (y.axis === 'right' ? axisRight(yFn) : axisLeft(yFn)).ticks(
      y.axisTicks || 5
    );

    const xAxisG = g
      .append('g')
      .attr('class', 'xAxis axis')
      .attr(
        'transform',
        `translate(0, ${
          x.axis === 'top' ? margin.top : height - margin.bottom
        })`
      );

    xAxisG.transition().duration(400).call(xAxis);

    padding.left &&
      xAxisG
        .append('line')
        .attr('x1', margin.left)
        .attr('x2', margin.left + padding.left)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', 'currentColor');

    padding.right &&
      xAxisG
        .append('line')
        .attr('x1', margin.left + width)
        .attr('x2', margin.left + width + padding.right)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', 'currentColor');

    const yAxisG = g
      .append('g')
      .attr('class', 'yAxis axis')
      .attr(
        'transform',
        `translate(${y.axis === 'right' ? margin.left + width : margin.left},0)`
      );

    yAxisG.transition().duration(400).call(yAxis);
    padding.bottom &&
      yAxisG
        .append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', margin.top + height - padding.bottom)
        .attr('y2', margin.top + height)
        .attr('stroke', 'currentColor');

    const sizeScale =
      size &&
      size.min &&
      size.max &&
      scaleLinear()
        .domain([
          min(data, (d: any) => (size.key ? d[size.key] : 1)),
          max(data, (d: any) => (size.key ? d[size.key] : 1)),
        ])
        .range([size.min, size.max]);

    const shapeMapping: any = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };

    // Tooltips
    // const tooltipDiv =
    //   tooltip && select('#tooltip').node()
    //     ? select('#tooltip')
    //     : select('body')
    //         .append('div')
    //         .attr('id', `tooltip-${id}`)
    //         .style('position', 'absolute')
    //         .style('opacity', '0')
    //         .attr('class', twMerge(tooltip?.className));

    svg
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top - (padding.top || 0) - 10)
      .attr('width', width - margin.left)
      .attr('height', height + (padding.bottom || 0) + 8);

    // Drawing
    const pointsGroup = g.append('g').attr('clip-path', 'url(#clip)');

    const points = pointsGroup
      .selectAll('.points')
      .data(data)
      .enter()
      .append('path')
      .attr('class', (d: any) =>
        twMerge(
          `fill-current stroke-current`,
          d.className || '',
          (color && color.classNameMap && color.classNameMap[d[color.key]]) ||
            ''
        )
      )
      .attr('d', (d: any) => {
        return drawing?.delay
          ? ``
          : symbol(
              shape?.shapeMap
                ? shapeMapping[shape?.shapeMap[d[shape.key]]]
                : symbolCircle,
              sizeScale ? sizeScale(d[size.key]) : size?.default || 12
            )();
      })
      .attr(
        'transform',
        (d: any) => `translate(${xFn(d[x.key])},${yFn(d[y.key])})`
      )
      .on('mouseenter', onMouseOver)
      .on('mousemove', onMouseMove)
      .on('mouseleave', onMouseLeave)
      .on('click', (event, d) => {
        onClick && onClick(event, d);
      });

    drawing?.delay &&
      points
        .transition()
        .delay((_, i) => i * (drawing.delay || 0))

        .attr('d', (d: any) =>
          symbol(
            shape?.shapeMap
              ? shapeMapping[shape.shapeMap[d[shape.key]]]
              : shapeMapping['circle'],
            sizeScale ? sizeScale(d[size.key]) : size?.default || 12
          )()
        );

    if (connect.enabled) {
      const newLine: any = line()
        .x((d: any) => xFn(d[x.key]))
        .y((d: any) => yFn(d[y.key]));

      const pointsPath = pointsGroup
        .append('path')
        .attr('class', `stroke-current ${connect?.className || ''}`)
        .datum(data)
        .attr('fill', 'none')
        .attr('clip-path', 'url(#clip)')
        .attr('d', newLine);

      if (drawing && drawing.delay) {
        const l = pointsPath?.node()?.getTotalLength();

        pointsPath
          .attr('stroke-dasharray', `0,${l}`)
          .transition()
          .duration(drawing.delay * data.length)
          .attr('stroke-dasharray', `${l},${l}`);
      }
    }

    // function onMouseMove(event: MouseEvent) {
    //   const [bX, bY] = pointer(event, select('body'));
    //   tooltipDiv.style('left', `${bX + 10}px`);
    //   tooltipDiv.style('top', `${bY + 10}px`);
    // }

    // function onMouseOverG(event: MouseEvent, row: any) {
    //   tooltip && tooltipDiv.style('opacity', 1);

    //   const [bX, bY] = pointer(event, select('body'));
    //   tooltipDiv.style('left', `${bX + 10}px`);
    //   tooltipDiv.style('top', `${bY + 10}px`);
    //   tooltipDiv.html(
    //     tooltip?.html
    //       ? tooltip.html(row)
    //       : tooltip?.keys
    //       ? tooltip.keys.map((key) => `${key}: ${row[key] || ''}`).join('<br/>')
    //       : Object.entries(row)
    //           .map(([key, value]) => `${key}: ${value}`)
    //           .join('<br/>')
    //   );
    // }

    // function onMouseLeave() {
    //   tooltipDiv.style('opacity', '0');
    //   tooltipDiv.style('left', `-1000px`);
    // }

    //Add styles from style prop

    if (zooming?.enabled) {
      const zoomed = ({ transform }: any) => {
        pointsGroup.attr('transform', transform);
        xAxisG.call(xAxis.scale(transform.rescaleX(xFn)));
        yAxisG.call(yAxis.scale(transform.rescaleY(yFn)));
      };

      const zoomFn: any = zoom<SVGSVGElement, unknown>()
        .scaleExtent([zooming.min || 0.9, zooming.max || 2])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on('zoom', zoomed);

      svg.call(zoomFn);
    }
  }, [
    id,
    x,
    y,
    color,
    size,
    tooltip,
    shape,
    margin,
    padding,
    onClick,
    zooming,
    drawing,
    connect,
    data,
  ]);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, refreshChart]);
  return (
    <svg id={id} className={twMerge(defaultChartClassNames, className || '')} />
  );
};

export default ScatterPlot;
