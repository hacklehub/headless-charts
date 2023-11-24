import LollipopHChart from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

const meta: Meta<typeof LollipopHChart> = {
  title: 'Linear/LollipopHChart',
  component: LollipopHChart,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    data,
    id: 'lollipop-h-chart',
    x: {
      key: 'value',
      start: 0,
    },
    y: {
      key: 'name',
    },
  },
};

export const WithTooltip = {
  args: {
    ...Default.args,
    tooltip: {
      keys: ['name', 'value', 'reading'],
    },
  },
};

export const WithCustomTooltip = {
  args: {
    ...Default.args,
    tooltip: {
      html: (d: any) =>
        `<div class='bg-gray-800 text-white p-2 rounded'>${d.name} - ${d.value}</div>`,
    },
  },
};

export const WithCustomShape = {
  args: {
    ...Default.args,
    shape: 'diamond',
  },
};
