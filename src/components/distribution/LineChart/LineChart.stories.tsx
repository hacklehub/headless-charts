import LineChart from '.';
import { Meta } from '@storybook/react';

export default {
  title: 'distribution/LineChart',
  component: LineChart,
  tags: ['autodocs'],
} as Meta;

const data = [
  { id: 1, value: 1311, reading: 1500 },
  { id: 2, reading: 1912 },
  { id: 3, value: 1000 },
  { id: 4, value: 1513 },
  { id: 5, value: 1351, reading: 1000 },
  { id: 6, value: 1451, reading: 1200 },
];

export const Default = {
  args: {
    data,
    x: { key: 'id' },
    y: [{ key: 'value' }, { key: 'reading' }],
  },
};
