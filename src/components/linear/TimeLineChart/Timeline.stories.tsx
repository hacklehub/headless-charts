import { Meta, StoryObj } from '@storybook/react';

import TimeLineChart from '.';
import data from './sample.json';

const meta: Meta<typeof TimeLineChart> = {
  title: 'Linear/TimeLineChart/Intro',
  component: TimeLineChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TimeLineChart>;

export const Default: Story = {
  args: {
    id: 'timeline-chart',
    data,
  },
};
