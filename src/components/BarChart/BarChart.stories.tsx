import type { Meta, StoryObj } from '@storybook/react';

import BarChart from '.';

const meta: Meta<typeof BarChart> = {
  title: 'Linear/BarChart',
  component: BarChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}; 
type Story = StoryObj<typeof meta>;

const data = [
  {
    name: 'A',
    value: 10,
    reading: 6,
  },
  {
    name: 'B',
    value: 20,
    reading: 12,
  },
];

export default meta;

export const Basic: Story = {
  args: {
    data,
    id: 'bar-chart',
    className: 'bg-gray-900',
    x: [{ key: 'reading', className: 'bg-red-900' }, { key: 'value' }],
    y: { key: 'name' },
  },
};

export const Left: Story = {
  args: {
    ...Basic.args,
    direction: 'left',
  },
};

export const Drawing: Story = {
  args: {
    ...Basic.args,
    drawing: {
      enabled: true,
      duration: 1000,
      delay: 100,
    },
  },
};

export const DataLabel: Story = {
  args: {
    ...Basic.args,
    dataLabel: {
      enabled: true,
      className: '',
    },
  },
};