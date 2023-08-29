/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import RingGauge from '.';
import metrics from './sample.json';

const meta: Meta<typeof RingGauge> = {
  title: 'Gauge/RingGauge/Customized',
  component: RingGauge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RingGauge>;

export const WithCustomStartAndEndAngle: Story = {
  args: {
    data: metrics.map(({ className, ...metric }: any) => metric),
    id: 'ring-chart-custom-start-end-angle',
    labelKey: 'name',
    dataKey: 'score',
    targetKey: 'target',
    startAngle: 45,
    endAngle: 180,
  },
};

/** labels at bottom position */
export const WithLabelsAtBottom: Story = {
  args: {
    ...WithCustomStartAndEndAngle.args,
    id: 'ring-chart-labels-bottom',
    startAngle: -90,
    endAngle: 180,
    labels: {
      position: 'bottom',
    },
  },
};
