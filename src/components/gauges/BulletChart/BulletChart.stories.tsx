/* eslint-disable @typescript-eslint/no-explicit-any */
import BulletChart from '.';
import { Meta } from '@storybook/react';

const data = 85;

export default {
  title: 'Gauge/BulletChart',
  component: BulletChart,
  tags: ['autodocs'],
} as Meta;

/** Default Bar Chart (Grouped). */
export const Default = {
  args: {
    data,
    label: 'Sales',
    id: 'bullet-chart-default',
    min: 0,
    base: 50,
    target: 80,
    threshold: 90,
    max: 100,
  },
};
