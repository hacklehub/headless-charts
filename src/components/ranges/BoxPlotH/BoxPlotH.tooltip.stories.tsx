/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import BoxPlotH from '.';
import data from '../sample.json';
import xValues from './sample.json';

const meta: Meta<typeof BoxPlotH> = {
  title: 'Ranges/BoxPlotH/Tooltips',
  component: BoxPlotH,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BoxPlotH>;

export const DefaultTooltip:Story = {
  args: {
    data,
    x: xValues,
    y: { key: 'name' },
    id: 'box-plot-h-default-tooltip',
    tooltip: {},
  },
};

export const CustomStyleTooltip: Story = {
  args: {
    data,
    x: xValues,
    y: { key: 'name' },
    id: 'box-plot-h-custom-tooltip',
    tooltip: {
      className: 'bg-gray-100 text-gray-900',
    },
  },
};

export const CustomHtmlTooltip: Story = {
  args: {
    data,
    x: xValues,
    y: { key: 'name' },
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
