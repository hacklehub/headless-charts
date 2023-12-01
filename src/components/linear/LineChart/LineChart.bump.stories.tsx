import './index.css';

import { Meta, StoryObj } from '@storybook/react';

import LineChart from '.';
import { convertToRanks } from '../../../utils';

const meta: Meta<typeof LineChart> = {
  title: 'Linear/LineChart/Bump',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

const data = [
  {
    year: '2011',
    'Manchester United': 80,
    Chelsea: 71,
    'Manchester City': 71,
    Arsenal: 68,
    Tottenham: 62,
    Liverpool: 58,
    Everton: 54,
  },
  {
    year: '2012',
    'Manchester United': 89,
    'Manchester City': 90,
    Chelsea: 64,
    Arsenal: 70,
    Tottenham: 69,
    Liverpool: 52,
    Everton: 56,
  },

  {
    year: '2013',
    'Manchester United': 89,
    'Manchester City': 78,
    Chelsea: 75,
    Arsenal: 73,
    Liverpool: 61,
    Tottenham: 72,
    Everton: 63,
  },
  {
    year: '2014',
    'Manchester City': 86,
    Chelsea: 82,
    Arsenal: 79,
    'Manchester United': 64,
    Tottenham: 69,
    Liverpool: 84,
    Everton: 72,
  },
];

const x = { key: 'year', axisTicks: 3 };

const y = [
  {
    key: 'Manchester United',
    className: 'text-slate-400 hover:text-red-300 hover:stroke-2',
  },
  {
    key: 'Chelsea',
    className: 'text-slate-400 hover:text-blue-500  hover:stroke-2',
  },
  {
    key: 'Manchester City',
    className: 'text-slate-400 hover:text-blue-100  hover:stroke-2',
  },
  {
    key: 'Arsenal',
    className: 'text-slate-400 hover:text-red-500  hover:stroke-2',
  },
  {
    key: 'Tottenham',
    className: 'text-slate-400 hover:text-green-300  hover:stroke-2',
  },
  {
    key: 'Liverpool',
    className: 'text-slate-400 hover:text-red-600  hover:stroke-2',
  },
  {
    key: 'Everton',
    className: 'text-slate-400 hover:text-blue-600  hover:stroke-2',
  },
];

type Story = StoryObj<typeof LineChart>;

console.log(convertToRanks(data, y, x));

export const DefaultLine: Story = {
  args: {
    data: convertToRanks(data, y, x),
    x,
    y,
    id: 'bump-ranked-chart',
    tooltip: {
      className: 'bg-gray-800 text-white',
    },
    yLeftLabel: 'rank',
    reverse: true,
  },
};
