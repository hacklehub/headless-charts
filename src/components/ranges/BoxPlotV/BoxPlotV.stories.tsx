import { Meta, StoryObj } from '@storybook/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import BoxPlotV from '.';
import data from '../sample.json';
import yData from './yData.json';

export default {
  title: 'Ranges/BoxPlotV/Intro',
  component: BoxPlotV,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof BoxPlotV>;

/** Default BoxPlot (Grouped). */
export const Default: Story = {
  args: {
    data,
    id: 'box-plot-h-default',
    y: {
      ...yData
    },
    x: { key: 'name' },
  },
};

/** BoxPlot (Grouped) with custom colors. */
export const CustomColors: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-colors',
    y: {
      ...yData,
      classNameBoxes: 'text-blue-500 opacity-100',
    },
  },
};

export const CustomColorMap: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-color-map',
    y: {
      ...yData,
    },
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

export const DefaultTooltip: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-default-tooltip',
    tooltip: {},
  },
};

export const CustomStyleTooltip: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-tooltip',
    tooltip: {
      className: 'bg-gray-100 text-gray-900',
    },
  },
};

export const CustomHtmlTooltip: Story = {
  args: {
    ...Default.args,
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

export const Zooming: Story = {
  args: {
    ...Default.args,
    id: 'box-plot-h-zooming',
    zooming: {
      enabled: true,
      min: 0.75,
      max: 2,
    },
  },
};
