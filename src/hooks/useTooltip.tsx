// import React from 'react';
import { deepValue, mergeTailwindClasses } from '../utils';
import { pointer, select } from 'd3-selection';

export interface TooltipObjectType {
  className?: string;
  html?: (d: any) => string;
  keys?: string[];
}

export interface TooltipProps {
  tooltip?: TooltipObjectType;
  defaultHtml?: (d: any) => string;
  id?: string;
}

const useTooltip = ({ tooltip, defaultHtml, id }: TooltipProps) => {
  const tooltipDiv =
    tooltip && select('#tooltip').node()
      ? select('#tooltip')
      : select('body')
          .append('div')
          .attr('id', `tooltip-${id}`)
          .attr(
            'class',
            mergeTailwindClasses(
              'absolute opacity-0 tooltip',
              tooltip?.className
            )
          );

  const onMouseOver = (event: any, d: any) => {
    tooltip &&
      tooltipDiv.attr(
        'class',
        mergeTailwindClasses('absolute opacity-100 ', tooltip?.className)
      );

    const [bX, bY] = pointer(event, select('body'));
    tooltipDiv.style('left', `${bX + 10}px`);
    tooltipDiv.style('top', `${bY + 20}px`);
    tooltipDiv.html(
      tooltip?.html // If tooltip.html exists
        ? tooltip.html(d) // Call it
        : tooltip?.keys // Else if keys exists
        ? tooltip.keys // iterate over the keys and show the data
            .map(
              (key: string) =>
                `${key}: ${deepValue(d, key) || deepValue(d.data, key) || ''}`
            )
            .join('<br/>')
        : defaultHtml // else if defaultHtml is given for a chart type
        ? defaultHtml(d) // call it
        : Object.entries(d) // otherwise show all entries of the data object
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
