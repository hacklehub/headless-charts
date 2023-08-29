import { Meta, StoryObj } from '@storybook/react';

import RadarChart from '.';
import data from './sample.json';

/**
 * Radar charts are useful when there are five or more variables to compare, along the same value axis (say 0 to 100) across two dimensions.
 *
 * Radar charts are also useful for seeing which variables are scoring high or low within a dataset, making them ideal for displaying performance.
 */
export default {
  title: 'Gauge/RadarChart/Intro',
  component: RadarChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof RadarChart>;

export const Default: Story = {
  args: {
    id: 'radar-chart',
    data,
    label: {
      key: 'name',
    },
    min: 0,
    max: 100,
    metrics: [
      { key: 'attack' },
      { key: 'defense' },
      { key: 'midfield' },
      { key: 'goalkeeper' },
      { key: 'overall' },
    ],
  },
};

export const Styled: Story = {
  args: {
    ...Default.args,
    id: 'radar-chart-styled',
    classNameMap: {
      Arsenal: 'stroke-red-500 fill-red-500',
      Chelsea: 'stroke-blue-500 fill-blue-500',
    },
  },
};

export const Drawing: Story = {
  args: {
    ...Styled.args,
    id: 'radar-chart-drawing',
    drawing: {
      duration: 1000,
      delay: 1000,
    },
  },
};
