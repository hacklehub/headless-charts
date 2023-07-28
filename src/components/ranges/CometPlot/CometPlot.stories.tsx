/* eslint-disable @typescript-eslint/no-explicit-any */
import CometPlot from '.';
import { Meta } from '@storybook/react';
import data from '../sample.json';

export default {
  title: 'Ranges/CometPlot',
  component: CometPlot,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data,
    id: 'box-plot-h-default',
    x: {
      minKey: 'min',
      maxKey: 'max',
    },
    y: { key: 'name' },
  },
};

export const Styled = {
  args: {
    ...Default.args,
    className: 'bg-red-50 rounded h-56',
    data: data,
    x: {
      minKey: 'min',
      maxKey: 'max',
      className: 'text-red-800',
    },
    y: {
      key: 'name',
    },
    tooltip: {
      className: 'p-2 rounded bg-white shadow-md',
    },
  },
};

export const CustomSize = {
  args: {
    ...Default.args,
    size: 40,
  },
};

export const CustomShape = {
  args: {
    ...Default.args,
    shape: 'triangle',
  },
};

export const CustomTooltip = {
  args: {
    ...Default.args,
    tooltip: {
      keys: ['name', 'min', 'max'],
    },
  },
};

export const CustomTooltipHtml = {
  args: {
    ...Default.args,
    tooltip: {
      html: (d: any) => {
        return `
          <div class="text-center rounded border-2 p-2 bg-white">
            <div class="text-lg font-bold">${d.name}</div>
            <div class="text-sm">ranges from ${d.min} to ${d.max}</div>
          </div>
        `;
      },
    },
  },
};

export const CustomColorMap = {
  args: {
    ...Default.args,
    data: data.map((d: any, idx: number) => ({
      ...d,
      className: [
        'text-red-900',
        'text-green-900',
        'text-yellow-500',
        'text-orange-500',
      ][idx],
    })),
  },
};

export const Zooming = {
  args: {
    ...Default.args,
    zooming: {
      enabled: true,
    },
  },
};

/**
 * There maybe times when the tail is ahead of the head, so we need to reverse
 */
export const Reverse = {
  args: {
    ...Default.args,
    data: [
      ...data,
      {
        name: 'Custom',
        min: 85,
        max: 65,
        className: 'text-red-800',
      },
    ],
  },
};