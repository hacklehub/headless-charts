import BarChart from '.';
import { Meta } from '@storybook/react';

/**
 * Bar charts are used to compare values across categories by using horizontal bars.  Bar charts are useful for showing data changes over a period of time or for comparing data among items.
 *
 * To create a bar chart, use the `<BarChart />` component.
 *
 * */
const meta: Meta<typeof BarChart> = {
  title: 'Linear/BarChart/Diverging',
  component: BarChart,
  tags: ['autodocs'],
};

export default meta;

export const DivergingBarChart = {
  args: {
    data: [
      {
        name: 'Product A',
        reading: 10000,
      },
      {
        name: 'Product B',
        reading: 9000,
      },
      {
        name: 'Product C',
        reading: 6000,
      },
      {
        name: 'Product D',
        reading: -1000,
      },
    ],
    id: 'bar-chart-diverging',
    x: [
      {
        key: 'reading',
        className: 'text-green-500 rounded',
        classNameNegative: 'text-red-500 rounded',
        axis: 'top',
        start: -10000,
        end: 10000,
      },
    ],
    y: { key: 'name', padding: 10 },
  },
};

export const DrawingDivergingBarChart = {
  args: {
    ...DivergingBarChart.args,
    id: 'bar-chart-diverging-drawing',
    drawing: {
      enabled: true,
      duration: 1000,
      delay: 100,
    },
  },
};
