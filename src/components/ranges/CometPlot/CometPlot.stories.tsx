import { Meta, StoryObj } from '@storybook/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import CometPlot from '.';
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
export default {
  title: 'Ranges/CometPlot/Intro',
  component: CometPlot,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof CometPlot>

/**
 * Default CometPlot with no styling.
 */
export const Default: Story = {
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
export const Styled: Story = {
  args: {
    ...Default.args,
    className: 'bg-red-50 rounded h-56',
    id: 'comet-plot-h-styled',
    data: data,
    x: {
      fromKey: 'min',
      toKey: 'max',
      className: 'fill-red-800 stoke-white',
      classNameTail: 'fill-white stroke-red-800',
      classNameHead: 'fill-red-800',
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
 * The chart can be zoomed in and out by scrolling (single axis). Default min zoom level is 1,  Max zoom level is 2 
 */
export const Zooming: Story = {
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

export const ZoomingCustom: Story = {
  args: {
    ...Zooming.args,
    id: 'comet-plot-h-zooming-custom',
    zooming: {
      enabled: true,
      min: 0.25,
      max: 4
    }
  }
}

/**
 * There maybe times when the tail is ahead of the head, so we need to reverse
 */
export const Reverse: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-reverse',
    data: [
      ...data,
      {
        name: 'Custom',
        min: 85,
        max: 65,
        className: 'text-red-800',
      },
    ],
  },
};