import { BaseType, Selection } from 'd3';
import { PieArcDatum, arc } from 'd3-shape';
import React, { useCallback, useEffect, useRef } from 'react';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';
import { select, selectAll } from 'd3-selection';

import { interpolateNumber } from 'd3-interpolate';
import { min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { transition } from 'd3-transition';

type ToolTipType = {
  className?: string;
  html?: (d: unknown) => string;
};

type MarginProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type LabelProps = {
  position?: 'top' | 'bottom';
  className?: string;
};

type DrawingProps = {
  duration?: number;
  delay?: number;
};

export interface RingGaugeProps {
  id: string;
  className?: string;
  labelKey: string;
  targetKey: string;
  dataKey: string;
  errorKey?: string;
  labels?: LabelProps;
  data?: Array<Record<string, number | string>>;
  margin?: MarginProps;
  padding?: {
    arc?: number;
  };
  minRadius?: number;
  startAngle?: number;
  endAngle?: number;
  cornerRadius?: number;
  drawing?: DrawingProps;
  tooltip?: ToolTipType;
  classNameGauge?: string;
  classNameGaugeBg?: string;
}

const RingGauge: React.FC<RingGaugeProps> = ({
  className,
  id,
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
  classNameGaugeBg = '',
}: RingGaugeProps) => {
  const PI = Math.PI;
  const numArcs = data.length;
  const previousData = useRef<Array<Record<string, string | number>>>([]);

  const refreshChart = useCallback(() => {
    transition();

    const getInnerRadius = (index: number, arcWidth: number) =>
      minRadius + (numArcs - (index + 1)) * (arcWidth + (padding.arc || 0));

    const getOuterRadius = (index: number, arcWidth: number) =>
      getInnerRadius(index, arcWidth) + arcWidth;

    const svg = select<SVGElement, unknown>(`#${id}`);
    svg.selectAll('*').remove();

    const { width, height } = getSVGDimensions(svg);
    const g = svg.append('g');
    g.attr('transform', `translate(${width / 2},${height / 2})`);

    const { chartRadius } = getRadialDimensions(width, margin, height);

    const scale = scaleLinear()
      .domain([0, 1])
      .range([0, (endAngle / 180) * PI]);

    const arcWidth =
      (chartRadius - minRadius - numArcs * (padding.arc || 5)) / numArcs;

    const arcFn = arc<PieArcDatum<unknown> | number>()
      .innerRadius((_d, i) => getInnerRadius(i, arcWidth))
      .outerRadius((_d, i) => getOuterRadius(i, arcWidth))
      .startAngle(((startAngle / 90) * PI) / 2)
      .endAngle((d) => scale(d))
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
      .attr('d', function (_d, i) {
        return arcFn(1, i) as string;
      });

    g.append('g')
      .attr('class', 'data')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', (d) =>
        mergeTailwindClasses('data-arc fill-current ', d.className?.toString())
      )
      .attr('d', '')
      .transition()
      .duration(drawing?.duration || 1000)
      .delay(drawing?.delay || 0)
      .attrTween('d', (d, i) => {
        const previousArc = previousData?.current?.find(
          (a) => a['name'] === d['name']
        );

        const interpolateArg1: number = previousArc ? +previousArc[dataKey] : 0;
        const factor = +d[dataKey] / +d[targetKey] || 0;
        const interpolateArg2: number | undefined = min([factor, 1]) || 0;
        const interpolate = interpolateNumber(
          interpolateArg1,
          interpolateArg2
        );
        return (t: number) => arcFn(interpolate(t), i) as string;
      });

    const timeOut = setTimeout(() => {
      previousData.current = data;
    }, drawing?.duration || 0);

    return () => {
      clearTimeout(timeOut);
    };
  }, [
    id,
    margin,
    endAngle,
    PI,
    minRadius,
    numArcs,
    padding.arc,
    startAngle,
    cornerRadius,
    data,
    classNameGaugeBg,
    drawing,
    dataKey,
    targetKey,
  ]);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll<SVGElement, unknown>('#tooltip').remove();
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

function getRadialDimensions(
  width: number,
  margin: MarginProps,
  height: number
) {
  const innerWidth = width - (margin.left || 0) - (margin.right || 0);
  const innerHeight = height - (margin.top || 0) - (margin.bottom || 0);
  const chartRadius = Math.min(innerHeight, innerWidth) / 2;
  return { innerWidth, innerHeight, chartRadius };
}

function getSVGDimensions(
  svg: Selection<BaseType, unknown, HTMLElement, unknown>
) {
  if (svg.empty()) {
    return { width: 0, height: 0 };
  }

  const svgElement = svg.node() as SVGElement;
  const svgStyle = getComputedStyle(svgElement);
  const width = parseInt(svgStyle.width, 10) || 0;
  const height = parseInt(svgStyle.height, 10) || 0;

  return { width, height };
}
