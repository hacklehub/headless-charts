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
        value5: 9,
        value6: 10,
        value7: 11,
        value8: 12,
      },
      {
        value5: 13,
        value6: 14,
        value7: 15,
        value8: 16,
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
