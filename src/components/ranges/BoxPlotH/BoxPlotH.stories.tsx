/* eslint-disable @typescript-eslint/no-explicit-any */
import BoxPlotH from '.';
import { Meta } from '@storybook/react';
import data from '../sample.json';

export default {
  title: 'Ranges/BoxPlotH',
  component: BoxPlotH,
  tags: ['autodocs'],
} as Meta;

/** Default BoxPlot (Grouped). */
export const Default = {
  args: {
    data,
    id: 'box-plot-h-default',
    x: {
      minKey: 'min',
      maxKey: 'max',
      midKey: 'mid',
      boxStart: 'firstQuartile',
      boxEnd: 'lastQuartile',
      min: 0,
    },
    y: { key: 'name' },
  },
};

/** BoxPlot (Grouped) with custom colors. */
export const CustomColors = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-colors',
    x: {
      ...Default.args.x,
      classNameBoxes: 'text-blue-500 opacity-100',
    },
  },
};

export const CustomColorMap = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-color-map',
    x: {
      ...Default.args.x,
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

export const DefaultTooltip = {
  args: {
    ...Default.args,
    id: 'box-plot-h-default-tooltip',
    tooltip: {},
  },
};

export const CustomStyleTooltip = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-tooltip',
    tooltip: {
      className: 'bg-gray-100 text-gray-900',
    },
  },
};

export const CustomHtmlTooltip = {
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
