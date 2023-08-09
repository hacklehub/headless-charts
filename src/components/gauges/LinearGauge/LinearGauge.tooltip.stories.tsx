import { Meta, StoryObj } from '@storybook/react';

import LinearGauge from '.';

const meta: Meta<typeof LinearGauge> = {
  title: 'Gauge/LinearGauge/Tooltips',
  component: LinearGauge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LinearGauge>;

export const ToolTip: Story = {
  args: {
    id: 'linear-gauge-with-tooltip',
    className: '',
    label: 'Linear Gauge Graph With Tooltip',
    data: 67,
    max: 100,
    drawing: { duration: 2000 },
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
    },
  },
};

export const ToolTipWithCustomHtml: Story = {
  args: {
    ...ToolTip.args,
    id: 'linear-gauge-with-tooltip-custom-html',
    error: { data: 2 },
    tooltip: {
      html: `<div class='bg-gray-800 text-white p-2 rounded'>67% with 2% error</div>`,
    },
  },
};
