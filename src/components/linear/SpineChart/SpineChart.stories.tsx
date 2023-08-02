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
        value1: 5,
        value2: 6,
        value3: 7,
        value4: 8,
      },
      {
        value1: 9,
        value2: 10,
        value3: 11,
        value4: 12,
      },
      {
        value1: 13,
        value2: 14,
        value3: 15,
        value4: 16,
      },
    ],
    id: 'spine-chart-default',
    y: {
      key: 'yValue',
      direction: 'right',
      className: '',
    },
    x: [
      { key: 'x1', direction: 'left', className: 'left-class' },
      { key: 'x2', direction: 'right', className: 'right-class' },
      { key: 'x3', direction: 'left', className: 'left-class' },
      { key: 'x4', direction: 'right', className: 'right-class' },
      { key: 'x5', direction: 'left', className: 'left-class' },
      { key: 'x6', direction: 'right', className: 'right-class' },
    ],
  },
};
