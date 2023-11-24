import CometPlot from '.';
import { Meta } from '@storybook/react';
import data from '../sample.json';

/**
 * CometPlots are used to show ranges of values or the movement of a value between two states. This is an animated chart where the comet head moves from a value to another value (fromKey to toKey)
 *
 * A few examples are:
 *
 * - Showing the range of a metric over time
 * - Showing the range of a metric across different groups
 * - Showing the range of a metric across different groups over time
 * - Showing the influence of a yes/no state on a metric (eg:- How well does a team perform with and without a manager/member)
 */

const meta: Meta<typeof CometPlot> = {
  title: 'Ranges/CometPlot',
  component: CometPlot,
  tags: ['autodocs'],
};

export default meta;

/**
 * Default CometPlot with no styling.
 */
export const Default = {
  args: {
    data,
    id: 'comet-plot-h-default',
    x: {
      fromKey: 'min',
      toKey: 'max',
    },
    y: { key: 'name' },
  },
};

/**
 * CometPlot with custom styling. className styles the entire chart, x.className styles the comets. tooltip.className styles the tooltip.
 * */
export const Styled = {
  args: {
    ...Default.args,
    className: 'bg-red-50 rounded h-56',
    id: 'comet-plot-h-styled',
    data: data,
    x: {
      fromKey: 'min',
      toKey: 'max',
      className: 'fill-green-800 stroke-green-800',
      classNameTail: 'fill-white stroke-green-800',
    },
    y: {
      key: 'name',
    },
    tooltip: {
      className: 'p-2 rounded bg-white shadow-md',
    },
  },
};

/**
 * The size of the comet head can be varied (default 100)
 */
export const CustomSize = {
  args: {
    ...Default.args,
    id: 'comet-plot-h-custom-size',
    size: 40,
  },
};

/**
 * The shape of the comet head can be varied (default circle)
 */
export const CustomShape = {
  args: {
    ...Default.args,
    id: 'comet-plot-h-custom-shape',
    shape: 'triangle',
  },
};

/**
 * The tooltip keys can be customized
 */
export const CustomTooltip = {
  args: {
    ...Default.args,
    id: 'comet-plot-h-custom-tooltip',
    tooltip: {
      keys: ['name', 'min', 'max'],
    },
  },
};

/**
 * The tooltip can be customized with html
 */
export const CustomTooltipHtml = {
  args: {
    ...Default.args,
    id: 'comet-plot-h-custom-tooltip-html',
    tooltip: {
      html: (d: any) => {
        return `
          <div class="text-center rounded border-2 p-2 bg-white">
            <div class="text-lg font-bold">${d.name}</div>
            <div class="text-sm">ranges from ${d.min} to ${d.max}</div>
          </div>
        `;
      },
    },
  },
};
/**
 * Each comet can be styled individually, by adding a className to each item in the data object
 */

export const CustomColorMap = {
  args: {
    ...Default.args,
    id: 'comet-plot-h-custom-color-map',
    data: data.map((d: any, idx: number) => ({
      ...d,
      className: [
        'text-red-900',
        'text-green-900',
        'text-yellow-500',
        'text-orange-500',
      ][idx],
    })),
  },
};

/**
 * The chart can be zoomed in and out by scrolling (single axis). Default min zoom level is 1,  Max zoom level is 2
 */
export const Zooming = {
  args: {
    ...Default.args,
    id: 'comet-plot-h-zooming',
    zooming: {
      enabled: true,
    },
  },
};

/**
 * Zooming can be done with custom min and max extents.
 */

export const ZoomingCustom = {
  args: {
    ...Zooming.args,
    id: 'comet-plot-h-zooming-custom',
    zooming: {
      enabled: true,
      min: 0.25,
      max: 4,
    },
  },
};

/**
 * There are maybe times in which one value has decreased and others have increased and we need to highlight it.
 */
export const Reverse = {
  args: {
    ...Default.args,
    id: 'box-plot-h-reverse',
    x: {
      ...Styled.args.x,
      classNameNegative: 'fill-red-800 stroke-red-800',
    },
    data: [
      ...data,
      {
        name: 'Custom',
        min: 85,
        max: 65,
      },
    ],
  },
};
