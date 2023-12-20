import { Meta, StoryObj } from '@storybook/react';

import AreaChart from '.';
import data from './data.json';

const meta: Meta<typeof AreaChart> = {
  title: 'Linear/AreaChart/Intro',
  component: AreaChart,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AreaChart>;

export const Default: Story = {
  args: {
    id: 'area-chart',
    data,
    x: {
      key: 'year',
    },
    y: [
      {
        key: 'iphone',
      },
      {
        key: 'macbook',
      },

      {
        key: 'ipad',
      },
      {
        key: 'wearables',
      },
      {
        key: 'services',
      },
    ],
  },
};

export const Styled: Story = {
  args: {
    id: 'area-chart-styled',
    data,
    x: {
      key: 'year',
    },
    y: [
      {
        key: 'iphone',
        className: 'text-purple-900',
      },
      {
        key: 'macbook',
        className: 'text-purple-700',
      },

      {
        key: 'ipad',
        className: 'text-purple-500',
      },
      {
        key: 'wearables',
        className: 'text-pink-700',
      },
      {
        key: 'services',
        className: 'text-purple-300',
      },
    ],
  },
};

export const Padding: Story = {
  args: {
    ...Styled.args,
    id: 'area-chart-padding',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  },
};
