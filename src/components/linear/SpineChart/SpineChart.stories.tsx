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
        value1: 1,
        value2: 6,
        value3: 7,
        value4: 8,
      },
      {
        value1: 2,
        value2: 4,
        value3: 6,
        value4: 8,
      },
      {
        value1: 3,
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
    y: {
      key: 'value1',
      direction: 'left',
      className: '',
    },
  },
};

export const WithPaddingBar = {
  args: {
    ...Default.args,
    paddingBar: 0.9,
  },
};
