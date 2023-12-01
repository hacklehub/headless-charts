import BarChart from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

/**
 * Bar charts are used to compare values across categories by using horizontal bars.  Bar charts are useful for showing data changes over a period of time or for comparing data among items.
 *
 * To create a bar chart, use the `<BarChart />` component.
 *
 * */
const meta: Meta<typeof BarChart> = {
  title: 'Linear/BarChart/Tooltips',
  component: BarChart,
  tags: ['autodocs'],
};

export default meta;

export const Tooltip = {
  args: {
    data,
    id: 'tooltip-default',
    x: [
      {
        key: 'reading',
      },
      { key: 'value' },
    ],
    y: { key: 'name' },
    tooltip: {},
  },
};

export const Styled = {
  args: {
    ...Tooltip.args,
    id: 'tooltip-styled',
    tooltip: {
      className: 'bg-gray-100 rounded p-2 shadow-lg',
    },
  },
};

export const TooltipCustomKeys = {
  args: {
    ...Styled.args,
    id: 'tooltip-custom-keys',
    tooltip: {
      ...Styled.args.tooltip,
      keys: ['name', 'value'],
    },
  },
};

export const TooltipCustomHTML = {
  args: {
    ...TooltipCustomKeys.args,
    id: 'tooltip-custom-html',
    tooltip: {
      ...TooltipCustomKeys.args.tooltip,
      html: (d: any) => {
        return `<h3 class="text-xl font-semibold">${d.name}</h3><p class="text-lg">${d.value} value and ${d.reading} reading</p>`;
      },
    },
  },
};
