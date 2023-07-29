/* eslint-disable @typescript-eslint/no-unused-vars */
import { Meta } from '@storybook/react';
import RingGauge from '.';

/* eslint-disable @typescript-eslint/no-explicit-any */

const metrics = [
  {
    name: 'Target 1',
    score: 75,
    target: 90,
    className: 'fill-purple-700',
  },
  {
    name: 'Target 2',
    score: 75,
    target: 80,
    className: 'fill-purple-400',
  },
  {
    name: 'Target 3',
    score: 70,
    target: 55,
    className: 'fill-green-500',
  },
];

/**
 * Ring gauges are used to show progress towards a goal.  Ring gauges are useful for comparing multiple metrics and achievement against a target.
 *
 * eg:- Apple Watch's activity app's Rings.
 */
export default {
  title: 'Gauge/RingGauge',
  component: RingGauge,
  tags: ['autodocs'],
} as Meta;

/** Default RingGauge Chart (Headless and unstyled). */
export const Default = {
  args: {
    data: metrics.map(({ className, ...metric }: any) => metric),
    id: 'ring-chart-default',
    labelKey: 'name',
    dataKey: 'score',
    targetKey: 'target',
  },
};

/** Multiple styles can be applied on the chart background, or on each ring (/metric) */

export const Styled = {
  args: {
    ...Default.args,
    data: metrics,
    id: 'ring-chart-styled',
    className: 'bg-gray-100 rounded',
  },
};

/** Ring gauge with tooltip */
export const WithTooltip = {
  args: {
    ...Default.args,
    id: 'ring-chart-tooltip',
    tooltip: {
      className: `bg-gray-800 text-white px-4 py-2 rounded-md shadow-md`,
    },
  },
};

/** Ring gauge with custom tooltip */
export const WithCustomTooltip = {
  args: {
    ...Default.args,
    id: 'ring-chart-custom-tooltip',
    tooltip: {
      className: `bg-gray-800 text-white px-4 py-2 rounded-md shadow-md`,
      html: (data: any) => `<div class="flex flex-col">
            <div class="text-lg">${data.name}</div>
            <div class="text-xs">${data.score} out of ${data.target}</div>
          </div>`,
    },
  },
};

/** With custom start and end angle */
export const WithCustomStartAndEndAngle = {
  args: {
    ...Default.args,
    id: 'ring-chart-custom-start-end-angle',
    startAngle: 45,
    endAngle: 180,
  },
};

/** labels at bottom position */
export const WithLabelsAtBottom = {
  args: {
    ...Default.args,
    id: 'ring-chart-labels-bottom',
    startAngle: -90,
    endAngle: 180,
    labels: {
      position: 'bottom',
    },
  },
};
