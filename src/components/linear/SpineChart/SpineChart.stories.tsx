/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import SpineChart from '.';
import data from './sample.json';

export default {
  title: 'Linear/SpineChart/Intro',
  component: SpineChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof SpineChart>;

export const Default: Story = {
  args: {
    data,
    id: 'spine-chart-default',
    y: {
      key: 'name',
      axis: 'left',
    },
    x: [
      { key: 'value2', direction: 'left' },
      { key: 'value3', direction: 'right' },
      { key: 'value4', direction: 'left' },
    ],
  },
};

export const WithStyle: Story = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-style',
    x: [
      { key: 'value2', direction: 'left', className: 'fill-purple-700' },
      { key: 'value3', direction: 'right', className: 'fill-red-700' },
      { key: 'value4', direction: 'left', className: 'fill-orange-300' },
    ],
  },
};

export const WithYAxisToLeft: Story = {
  args: {
    ...WithStyle.args,
    id: 'spine-chart-y-direction-left',
    y: {
      key: 'name',
      axis: 'left',
    },
    margin: {
      top: 20,
      bottom: 20,
      left: 70,
      right: 40,
      middle: 0,
    },
  },
};

export const YAxisRight: Story = {
  args: {
    ...WithStyle.args,
    id: 'spine-chart-y-axis-middle',
    margin: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 70,
      middle: 0,
    },
    y: {
      key: 'name',
      axis: 'right',
    },
  },
};

export const WithCustomPaddingBar: Story = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-padding-bar',
    paddingBar: 0.1,
  },
};

export const XAxisTop: Story = {
  args: {
    ...Default.args,
    id: 'spine-chart-x-axis-top',
    x: [
      {
        key: 'value2',
        direction: 'left',
        className: 'fill-purple-700',
      },
      { key: 'value3', direction: 'right', className: 'fill-red-700' },
      { key: 'value4', direction: 'left', className: 'fill-orange-300' },
    ],
    xAxis: 'top',
  },
};
