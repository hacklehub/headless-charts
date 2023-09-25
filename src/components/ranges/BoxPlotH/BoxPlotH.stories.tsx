import { Meta, StoryObj } from '@storybook/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import BoxPlotH from '.';
import data from '../sample.json';
import xValues from './sample.json';

export default {
  title: 'Ranges/BoxPlotH/Intro',
  component: BoxPlotH,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof BoxPlotH>;

/** Default BoxPlot (Grouped). */
export const Default: Story = {
  args: {
    data,
    id: 'box-plot-h-default',
    x: xValues,
    y: { key: 'name' },
  },
};

/** BoxPlot (Grouped) with custom colors. */
export const CustomColors: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-colors',
    x: {
      ...xValues,
      classNameBoxes: 'text-blue-500 opacity-100',
    },
  },
};

export const CustomColorMap: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-color-map',
    x: {
      ...xValues,
    },
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

export const Zooming = {
  args: {
    ...Default.args,
    id: 'box-plot-h-zooming',
    zooming: {
      enabled: true,
      min: 0.75,
      max: 2,
    },
  },
};
