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
        value: 5,
      },
      {
        value: 7,
      },
      {
        value: 9,
      },
    ],
    id: 'spine-chart-default',
    y: {
      key: 'axis-value',
      direction: 'left',
      className: '',
    },
    x: [
      { key: 'x1', direction: 'left', className: 'left-class' },
      { key: 'x2', direction: 'right', className: 'right-class' },
    ],
  },
};
