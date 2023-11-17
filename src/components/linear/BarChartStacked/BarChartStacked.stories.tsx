/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import BarChartStacked from '.';
import data from './sample.json';

export default {
  title: 'Linear/BarChartStacked/Intro',
  component: BarChartStacked,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof BarChartStacked>;

export const Default: Story = {
  args: {
    data,
    id: 'bar-chart-stacked-default',
    x: [
      {
        key: 'reading',
      },
      { key: 'value' },
    ],
    y: { key: 'name' },
  },
};

export const Styled: Story = {
  args: {
    ...Default.args,
    id: 'bar-chart-stacked-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
      bar: 0.1,
    },
    margin: {
      top: 0,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: [
      {
        key: 'reading',
        className: 'fill-purple-700',
      },
      { key: 'value', className: 'fill-purple-400' },
    ],
    y: { key: 'name', className: 'text-red-500' },
  },
};

export const WithDrawing: Story = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-drawing',
    drawing: {
      duration: 1000,
    },
  },
};

export const WithDrawingDelay: Story = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-drawing-delay',
    drawing: {
      duration: 1000,
      delay: 100,
    },
  },
};

export const HorizontalWaterfall = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-waterfall',
    waterfall: true,
  },
};

export const HorizontalWaterfallWithDrawing = {
  args: {
    ...HorizontalWaterfall.args,
    ...WithDrawing.args,
    id: 'bar-chart-stacked-waterfall-drawing',
  },
};
