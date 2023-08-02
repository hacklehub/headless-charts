import { Meta } from '@storybook/react';
import SpineChart from '.';

export default {
  title: 'Linear/SpineChart',
  component: SpineChart,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data: [
      {
        value1: 'Bangalore',
        value2: 6,
        value3: 7,
        value4: 8,
      },
      {
        value1: 'Chennai',
        value2: 4,
        value3: 6,
        value4: 8,
      },
      {
        value1: 'Mumbai',
        value2: 1,
        value3: 2,
        value4: 3,
      },
    ],
    id: 'spine-chart-default',
    y: {
      key: 'value1',
      direction: 'right',
      className: '',
    },
    x: [
      { key: 'value2', direction: 'left', className: '' },
      { key: 'value3', direction: 'right', className: '' },
      { key: 'value4', direction: 'left', className: '' },
    ],
  },
};

export const WithYDirectionToLeft = {
  args: {
    ...Default.args,
    id: 'spine-chart-y-direction-left',
    y: {
      key: 'value1',
      direction: 'left',
    },
  },
};

export const WithPaddingBar = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-padding-bar',
    paddingBar: 0.1,
  },
};

export const WithStyle = {
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

export const XAxisTop = {
  args: {
    ...Default.args,
    id: 'spine-chart-x-axis-top',
    x: [
      {
        key: 'value2',
        direction: 'left',
        className: 'fill-purple-700',
        axis: 'top',
      },
      { key: 'value3', direction: 'right', className: 'fill-red-700' },
      { key: 'value4', direction: 'left', className: 'fill-orange-300' },
    ],
  },
};

export const YAxisMiddle = {
  args: {
    ...WithStyle.args,
    id: 'spine-chart-y-axis-middle',
    margin: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 40,
      middle: 70,
    },
    y: {
      key: 'value1',
      axis: 'middle',
    },
  },
};