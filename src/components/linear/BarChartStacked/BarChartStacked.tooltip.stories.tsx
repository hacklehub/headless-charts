import BarChartStacked from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

/**
 * Stacked bar charts are used to compare values across categories by using horizontal bars, with some grouping. Stacked bar charts additionally show proportions within categories.
 *
 *
 * */

const meta: Meta<typeof BarChartStacked> = {
  title: 'Linear/BarChartStacked/Tooltip',
  component: BarChartStacked,
  tags: ['autodocs'],
  args: {
    data,
  },
};

export default meta;

export const Tooltip = {
  args: {
    id: 'bar-chart-tooltip-default',
    x: [
      {
        key: 'macbook',
        className: 'fill-purple-800',
      },
      {
        key: 'iphone',
        className: 'fill-purple-600',
      },
      {
        key: 'ipad',
        className: 'fill-purple-400',
      },
      {
        key: 'wearables',
        className: 'fill-purple-300',
      },
      {
        key: 'services',
        className: 'fill-purple-200',
      },
    ],
    y: { key: 'year' },
    tooltip: {},
  },
};

export const TooltipStyled = {
  args: {
    ...Tooltip.args,
    id: 'bar-chart-tooltip-styled',
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
    },
  },
};

export const TooltipCustomKeys = {
  args: {
    ...Tooltip.args,
    id: 'bar-chart-tooltip-custom-keys',
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
      keys: ['year', 'macbook'],
    },
  },
};

export const TooltipCustomHtml = {
  args: {
    ...Tooltip.args,
    id: 'bar-chart-tooltip-custom-html',
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
      html: (d: any) =>
        `<p className="text-xl">${d.data.year}</p><p classname="text-xs"> macbooks sold $${d.data.macbook}B</p>`,
    },
  },
};
