/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import BoxPlotV from '.';
import data from '../sample.json';
import yData from './yData.json';

const meta: Meta<typeof BoxPlotV> = {
  title: 'Ranges/BoxPlotV/Tooltips',
  component: BoxPlotV,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BoxPlotV>;

export const DefaultTooltip: Story = {
  args: {
    data,
    id: 'box-plot-h-default-tooltip',
    tooltip: {},
    y: {
        ...yData
      },
      x: { key: 'name' },
  },
};

export const CustomStyleTooltip: Story = {
  args: {
    ...DefaultTooltip.args,
    id: 'box-plot-h-custom-tooltip',
    tooltip: {
      className: 'bg-gray-100 text-gray-900',
    },
  },
};

export const CustomHtmlTooltip: Story = {
  args: {
    ...DefaultTooltip.args,
    id: 'box-plot-h-custom-html-tooltip',
    tooltip: {
      html: (d: any) => {
        return `<div class="bg-gray-100 text-gray-900 p-2 rounded">
            <div class="text-lg font-bold">${d.name}</div>
            <div class="text-sm">${d.name} ranges between ${d.min} and ${d.max}, with an median of ${d.mid}. </div>
            <div class="text-sm">The first and last quartile values are at ${d.firstQuartile} and ${d.lastQuartile}</div>
          </div>`;
      },
    },
  },
};
