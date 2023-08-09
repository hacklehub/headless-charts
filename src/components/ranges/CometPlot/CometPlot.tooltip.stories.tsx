/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import CometPlot from '.';
import data from '../sample.json';

const meta: Meta<typeof CometPlot> = {
  title: 'Ranges/CometPlot/Tooltips',
  component: CometPlot,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CometPlot>;

/**
 * The tooltip keys can be customized
 */
export const CustomTooltip: Story = {
  args: {
    data,
    x: {
      fromKey: 'min',
      toKey: 'max',
    },
    y: { key: 'name' },
    id: 'comet-plot-h-custom-tooltip',
    tooltip: {
      keys: ['name', 'min', 'max'],
    },
  },
};

/**
 * The tooltip can be customized with html
 */
export const CustomTooltipHtml: Story = {
  args: {
    ...CustomTooltip.args,
    id: 'comet-plot-h-custom-tooltip-html',
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
