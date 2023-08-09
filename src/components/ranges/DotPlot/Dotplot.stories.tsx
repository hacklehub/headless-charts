import { Meta, StoryObj } from '@storybook/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import DotPlot from '.';
import data from './sample.json';

export default {
  title: 'Ranges/Dotplot/Intro',
  component: DotPlot,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof DotPlot>;

export const Default: Story = {
  args: {
    id: 'dot-plot-default',
    data,

    y: {
      key: 'label',
      axis: 'left',
    },
    x: {
      minKey: 'minTemp',
      maxKey: 'maxTemp',
    },
  },
};

export const CustomShape: Story = {
  args: {
    ...Default.args,
    id: 'dot-plot-custom-shape',
    shape: 'star',
  },
};