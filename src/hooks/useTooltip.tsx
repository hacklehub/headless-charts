import { pointer, select } from 'd3-selection';

/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
import { mergeTailwindClasses } from '../utils';

export interface TooltipProps {
  className?: string;
  html?: (d: any) => string;
  keys?: string[];
}

const useTooltip = (tooltip: TooltipProps | undefined) => {
  const tooltipDiv =
    tooltip && select('#tooltip').node()
      ? select('#tooltip')
      : select('body')
          .append('div')
          .attr('id', 'tooltip')
          .attr(
            'class',
            mergeTailwindClasses('absolute opacity-0', tooltip?.className)
          );

  const onMouseOver =
    (defaultHtml?: (d: any) => string | undefined) => (event: any, d: any) => {
      tooltip &&
        tooltipDiv.attr(
          'class',
          mergeTailwindClasses('absolute opacity-100 ', tooltip?.className)
        );

      const [bX, bY] = pointer(event, select('body'));
      tooltipDiv.style('left', `${bX + 10}px`);
      tooltipDiv.style('top', `${bY + 20}px`);
      tooltipDiv.html(
        tooltip?.html
          ? tooltip.html(d)
          : tooltip?.keys
          ? tooltip.keys
              .map((key) => `${key}: ${d[key] || d.data[key] || ''}`)
              .join('<br/>')
          : defaultHtml(d) ||
            Object.entries(d)
              .map(([key, value]) => `${key}: ${value}`)
              .join('<br/>')
      );
    };

  const onMouseMove = () => {
    const [bX, bY] = pointer(event, select('body'));
    tooltipDiv.style('left', `${bX + 10}px`);
    tooltipDiv.style('top', `${bY + 20}px`);
  };

  const onMouseLeave = () => {
    tooltipDiv.attr(
      'class',
      mergeTailwindClasses('absolute opacity-0', tooltip?.className)
    );
    tooltipDiv.style('left', `-1000px`);
  };

  return { tooltipDiv, onMouseOver, onMouseMove, onMouseLeave };
};

export default useTooltip;
