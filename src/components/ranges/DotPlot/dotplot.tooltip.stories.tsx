import { Meta, StoryObj } from '@storybook/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import DotPlot from '.';
import data from './sample.json';

const meta: Meta<typeof DotPlot> = {
  title: 'Ranges/Dotplot/Tooltips',
  component: DotPlot,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DotPlot>;

export const CustomTooltip: Story = {
  args: {
    data,

    y: {
      key: 'label',
      axis: 'left',
    },
    x: {
      minKey: 'minTemp',
      maxKey: 'maxTemp',
    },
    id: 'dot-plot-custom-tooltip',
    tooltip: {
      keys: ['minTemp', 'maxTemp'],
    },
  },
};

export const CustomTooltipHtml: Story = {
  args: {
    ...CustomTooltip.args,
    id: 'dot-plot-custom-tooltip-html',
    tooltip: {
      html: (d: any) => {
        return `
            <div>
              <div>${d.label}</div>
              <div>Min: ${d.minTemp}</div>
              <div>Max: ${d.maxTemp}</div>
            </div>
          `;
      },
    },
  },
};
