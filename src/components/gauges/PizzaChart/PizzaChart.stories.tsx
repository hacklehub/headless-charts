import { Meta, StoryObj } from '@storybook/react';

import PizzaChart from '.';
import data from './sample.json';

export default {
  title: 'Gauge/PizzaChart',
  component: PizzaChart,
} as Meta;

type Story = StoryObj<typeof PizzaChart>;

export const Default: Story = {
  args: {
    id: 'pizza-chart',
    data,
    metrics: [
      {
        key: 'metric1',
      },
      {
        key: 'metric2',
      },
      {
        key: 'metric3',
      },
      {
        key: 'metric4',
      },
      {
        key: 'metric5',
      },
      {
        key: 'metric6',
      },
      {
        key: 'metric7',
      },
    ],
  },
};

export const WithCustomColors: Story = {
  args: {
    ...Default.args,
    id: 'pizza-chart-custom-colors',
    metrics: [
      {
        key: 'metric1',
        className: 'fill-purple-900',
        classNameBackground: 'fill-gray-200',
      },
      {
        key: 'metric2',
        className: 'fill-purple-800',
        classNameBackground: 'fill-gray-200',
      },
      {
        key: 'metric3',
        className: 'fill-purple-700',
        classNameBackground: 'fill-gray-200',
      },
      {
        key: 'metric4',
        className: 'fill-purple-600',
        classNameBackground: 'fill-gray-200',
      },
      {
        key: 'metric5',
        className: 'fill-purple-500',
        classNameBackground: 'fill-gray-200',
      },
      {
        key: 'metric6',
        className: 'fill-pink-500',
        classNameBackground: 'fill-gray-200',
      },
      {
        key: 'metric7',
        className: 'fill-pink-600',
        classNameBackground: 'fill-gray-200',
      },
    ],
  },
};

export const Drawing: Story = {
  args: {
    ...Default.args,
    id: 'pizza-chart-drawing',
    drawing: {
      duration: 1000,
    },
  },
};

export const DrawingWithDelay: Story = {
  args: {
    ...Default.args,
    id: 'pizza-chart-drawing-delay',
    drawing: {
      duration: 1000,
      delay: 50,
    },
  },
};
