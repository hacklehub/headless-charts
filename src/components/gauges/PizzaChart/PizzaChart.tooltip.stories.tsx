import { Meta, StoryObj } from '@storybook/react';

import PizzaChart from '.';
import data from './sample.json';

export default {
  title: 'Gauge/PizzaChart/Tooltip',
  component: PizzaChart,
} as Meta;

type Story = StoryObj<typeof PizzaChart>;

export const WithTooltip: Story = {
  args: {
    id: 'pizza-chart-tooltip',
    data,
    tooltip: {},
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
