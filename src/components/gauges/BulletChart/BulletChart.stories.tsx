/* eslint-disable @typescript-eslint/no-explicit-any */
import BulletChart from '.';
import { Meta } from '@storybook/react';

const data = 85;

export default {
  title: 'Gauge/BulletChart',
  component: BulletChart,
  tags: ['autodocs'],
} as Meta;

/** Bullet chart is a single metric linear gauge. It shows achievement against 4 different metrics (base, target, threshold, max) */
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

export const Styled = {
  args: {
    ...Default.args,
    id: 'bullet-chart-styled',
    className: 'bg-gray-100 rounded',
    classNameData: 'fill-slate-500',
    classNameTarget: 'fill-blue-500 stroke-blue-500',
    classNameMax: 'fill-red-500',
    classNameThreshold: 'fill-yellow-500',
    classNameBase: 'fill-green-500',
  },
};