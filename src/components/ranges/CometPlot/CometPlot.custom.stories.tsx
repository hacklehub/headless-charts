/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import CometPlot from '.';
import data from '../sample.json';

const meta: Meta<typeof CometPlot> = {
  title: 'Ranges/Cometplot/Customized',
  component: CometPlot,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CometPlot>;

/**
 * The size of the comet head can be varied (default 100)
 */
export const CustomSize: Story = {
  args: {
    data,
    x: {
      fromKey: 'min',
      toKey: 'max',
    },
    y: { key: 'name' },
    id: 'comet-plot-h-custom-size',
    size: 40,
  },
};

/**
 * The shape of the comet head can be varied (default circle)
 */
export const CustomShape: Story = {
  args: {
    ...CustomSize.args,
    id: 'comet-plot-h-custom-shape',
    shape: 'triangle',
  },
};

/**
 * Each comet can be styled individually, by adding a className to each item in the data object
 */

export const CustomColorMap: Story = {
  args: {
    ...CustomSize.args,
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
