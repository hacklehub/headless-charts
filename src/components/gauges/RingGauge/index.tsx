import { BaseType, Selection } from 'd3';
import { PieArcDatum, arc } from 'd3-shape';
import React, { useEffect, useRef } from 'react';
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
  top?: number | undefined;
  bottom?: number | undefined;
  left?: number | undefined;
  right?: number | undefined;
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
  data?: unknown[];
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



    /************UTILITIES*********** */

  function addTooltips(tooltip:ToolTipType) {
    const tooltipDiv = tooltip && select('#tooltip').node()
      ? select('#tooltip')
      : select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('position', 'absolute')
        .style('opacity', '0')
        .attr('class', mergeTailwindClasses(tooltip?.className));

    return { tooltipDiv };
  }
  const PI = Math.PI
  const numArcs = data.length; 
  const previousData = useRef<any[]>([]);

  const refreshChart = React.useCallback(() => {

    transition();
    const getInnerRadius = (index: number, arcWidth: number ) => minRadius + (numArcs - (index + 1)) * (arcWidth + (padding.arc || 0))
    const getOuterRadius = (index: number, arcWidth:number) => getInnerRadius(index,arcWidth) + arcWidth;
    
    // Find the SVG
    const svg = select(`#${id}`);
    // Remove all the elements
    cleanSVG(svg);
    const { width, height } = getSVGDimensions(svg)
    const g = svg.append('g');
    g.attr('transform', `translate(${width / 2},${height / 2})`);

    const {chartRadius} = getRadialDimensions(width, margin, height);

    const scale = scaleLinear()
      .domain([0, 1])
      .range([0, (endAngle / 180) * PI]);

    const arcWidth =
      (chartRadius - minRadius - numArcs * (padding.arc || 5)) / numArcs;

    const arcFn = arc<PieArcDatum<any> | number>()
      .innerRadius((_d: any, i: number) => getInnerRadius(i, arcWidth))
      .outerRadius((_d: any, i: number) => getOuterRadius(i, arcWidth))
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

    const {  tooltipDiv } = tooltip? addTooltips(tooltip) : {tooltipDiv:<div></div>};
    g.append('g')
      .attr('class', 'data')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', (d) =>
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
          .html(
            tooltip?.html
              ? tooltip.html(d)
              : `${d[labelKey]} <br/>${d[dataKey]}/${d[targetKey]}`
          );
      })
    
      .on('mousemove', function (event) {
        const [bX, bY] = pointer(event, select('body'));
        tooltipDiv.style('left', `${bX + 10}px`).style('top', `${bY + 10}px`);
      })
      .on('mouseleave', function () {
        tooltipDiv.style('opacity', 0);
        tooltipDiv.html('');
      })
      .transition()
      .duration(drawing?.duration || 1000)
      .delay(drawing?.delay || 0)
      .attrTween('d', (d: any, i: number) => {
        const previousArc = previousData?.current?.find(
          (a) => a['name'] === d['name']
        );

        const interpolate = interpolateNumber(
          previousArc?.[dataKey] || 0,
          min([d[dataKey] / d[targetKey], 1])
        );
        return (t: number) => arcFn(interpolate(t), i);
      });

    const timeOut = setTimeout(() => {
      previousData.current = data;
    }, drawing?.duration);

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
            ? getInnerRadius(i,arcWidth) + arcWidth - 1
            : -getInnerRadius(i, arcWidth) - 2
        )
        .text((d: unknown) => d[labelKey]);

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
    tooltip, 
    drawing, 
    labels, 
    labelKey, 
    dataKey, 
    targetKey
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


function getRadialDimensions(width: number, margin: MarginProps, height: number) {
  const innerWidth = width - (margin.left || 0) - (margin.right || 0)
  const innerHeight = height - (margin.top || 0) - (margin.bottom || 0)
  const  chartRadius = Math.min(innerHeight, innerWidth) / 2;
  return {innerWidth, innerHeight, chartRadius};
}

/*********************UTILITY FUNCTIONS********************* */
function getSVGDimensions(svg: Selection<BaseType, any, HTMLElement, any>) {
  if (svg.empty()) {
    return { width: 0, height: 0 };
  }

  const svgElement = svg.node() as SVGElement;
  const svgStyle = getComputedStyle(svgElement);
  const width = parseInt(svgStyle.width, 10) || 0;
  const height = parseInt(svgStyle.height, 10) || 0;

  return { width, height };
}

function cleanSVG(svg: Selection<BaseType, unknown, HTMLElement, any>) {
  svg.selectAll('*').remove();
}