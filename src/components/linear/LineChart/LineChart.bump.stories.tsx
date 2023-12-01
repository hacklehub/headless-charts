import './index.css';

import { Meta, StoryObj } from '@storybook/react';

import LineChart from '.';
import React from 'react';
import { convertToRanks } from '../../../utils';

/**
 * Bump charts are used to compare the rank of a set of data points over time.
 */
const meta: Meta<typeof LineChart> = {
  title: 'Linear/LineChart/Ranked',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

const data = [
  {
    year: 2011,
    'Manchester United': 80,
    Chelsea: 71,
    'Manchester City': 71,
    Arsenal: 68,
    Tottenham: 62,
    Liverpool: 58,
    Everton: 54,
    Leicester: 0,
  },
  {
    year: 2012,
    'Manchester United': 89,
    'Manchester City': 90,
    Chelsea: 64,
    Arsenal: 70,
    Tottenham: 69,
    Liverpool: 52,
    Everton: 56,
    Leicester: 0,
  },

  {
    year: 2013,
    'Manchester United': 89,
    'Manchester City': 78,
    Chelsea: 75,
    Arsenal: 73,
    Liverpool: 61,
    Tottenham: 72,
    Everton: 63,
    Leicester: 0,
  },
  {
    year: 2014,
    'Manchester City': 86,
    Chelsea: 82,
    Arsenal: 79,
    'Manchester United': 64,
    Tottenham: 69,
    Liverpool: 84,
    Everton: 72,
    Leicester: 0,
  },
  {
    year: 2015,
    'Manchester City': 79,
    Arsenal: 75,
    Tottenham: 64,
    'Manchester United': 70,
    Liverpool: 62,
    Chelsea: 87,
    Everton: 47,
    Leicester: 0,
  },
  {
    year: 2016,
    Leicester: 81,
    Arsenal: 71,
    Tottenham: 70,
    'Manchester City': 66,
    'Manchester United': 66,
    Southampton: 63,
    Liverpool: 60,
    Chelsea: 50,
    Everton: 47,
  },
  {
    year: 2017,
    'Manchester City': 78,
    'Manchester United': 69,
    Tottenham: 86,
    Liverpool: 76,
    Chelsea: 93,
    Arsenal: 75,
    Everton: 61,
    Leicester: 44,
  },
  {
    year: 2018,
    'Manchester City': 100,
    'Manchester United': 81,
    Tottenham: 77,
    Liverpool: 75,
    Chelsea: 70,
    Arsenal: 63,
    Everton: 49,
    Leicester: 47,
  },
  {
    year: 2019,
    'Manchester City': 98,
    Liverpool: 97,
    Chelsea: 72,
    Tottenham: 71,
    Arsenal: 70,
    'Manchester United': 66,
    Everton: 54,
    Leicester: 52,
  },
  {
    year: 2020,
    Liverpool: 99,
    'Manchester City': 81,
    'Manchester United': 66,
    Chelsea: 66,
    Leicester: 62,
    Tottenham: 59,
    Arsenal: 56,
    Everton: 49,
  },
  {
    year: 2021,
    'Manchester City': 86,
    'Manchester United': 74,
    Liverpool: 69,
    Chelsea: 67,
    Leicester: 66,
    Tottenham: 62,
    Arsenal: 61,
    Everton: 59,
  },
  {
    year: 2022,
    'Manchester City': 93,
    Liverpool: 92,
    Chelsea: 74,
    Tottenham: 71,
    Arsenal: 69,
    'Manchester United': 58,
    Leicester: 52,
    Everton: 39,
  },
  {
    year: 2023,
    'Manchester City': 89,
    Arsenal: 84,
    'Manchester United': 75,
    Liverpool: 67,
    Tottenham: 60,
    Chelsea: 44,
    Leicester: 34,
    Everton: 36,
  },
];

const x = { key: 'year' };

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
  {
    key: 'Leicester',
    className: 'text-slate-400 hover:text-blue-600  hover:stroke-2',
  },
];

type Story = StoryObj<typeof LineChart>;

/**
 * Rather than using the default data, we convert the data to ranks
 */

export const RankedLine: Story = {
  args: {
    data: convertToRanks(data, y, x),
    x,
    y,
    id: 'bump-ranked-chart',
    tooltip: {
      className: 'bg-gray-800 text-white',
    },
    paddingTop: 5,
    paddingBottom: 5,
    yLeftLabel: 'rank',
    reverse: true,
  },
};
/**
 * curve can be set to bumpX to make the lines more horizontal
 */

export const bumpX: Story = {
  args: {
    ...RankedLine.args,
    id: 'bump-ranked-chart',
    x: { key: 'year', axisTicks: 3 },
    y: y.map((d) => ({ ...d, curve: 'bumpX' })),
  },
};
