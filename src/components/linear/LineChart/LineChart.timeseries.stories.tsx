import { Meta, StoryObj } from '@storybook/react';

import { DateTime } from 'luxon';
import LineChart from '.';

const meta: Meta<typeof LineChart> = {
  title: 'Linear/LineChart/TimeSeries',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

const randBetween = (x: number, y: number) => x + Math.random() * (y - x);

const arrayLength = 200;

const dataForTimeSeriesChart = new Array(arrayLength)
  .fill('')
  .map((_, index) => ({
    date: DateTime.now()
      .startOf('day')
      .minus({ days: arrayLength - index })
      .toFormat('yyyy-MM-dd hh:mm:ss'),
    value: randBetween(1000, 1004),
    reading: randBetween(1000, 996),
  }));
type Story = StoryObj<typeof LineChart>;

export const TimeSeriesForLineChart: Story = {
  args: {
    data: dataForTimeSeriesChart,
    id: 'time-series',
    x: {
      key: 'date',
      scalingFunction: 'time',
      format: 'yyyy-MM-dd hh:mm:ss',
      axisLabel: 'Date',
    },
    y: [
      {
        key: 'value',
        axis: 'left',
        className: 'text-red-200 dark:text-red-700 stroke-current',
        curve: 'rounded',
        // circleFill: true,
      },
      {
        key: 'reading',
        className: 'text-blue-200 dark:text-red-700',
        axis: 'left',
        symbol: 'none',
      },
    ],
    referenceLines: [
      { yLeft: 1000, className: 'text-gray-200 dashed', showText: true },
    ],
  },
};
