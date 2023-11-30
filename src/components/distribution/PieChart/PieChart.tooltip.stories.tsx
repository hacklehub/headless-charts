import { Meta, StoryObj } from '@storybook/react';

import PieChart from '.';
import data from './sample.json';

const classNameMap = {
  'Product A': 'fill-purple-700 dark:fill-purple-100',
  'Product B': 'fill-purple-500 dark:fill-purple-300',
  'Product C': 'fill-purple-300 dark:fill-purple-500',
};

/**
 * Donut charts are a variant of pie charts. Simply specify an `innerRadius` prop
 */
const meta: Meta<typeof PieChart> = {
  title: 'Distribution/PieChart/Tooltips',
  component: PieChart,
  tags: ['autodocs'],
  args: {
    data,
    valueKey: 'USA',
    classNameMap,
    tooltip: {},
  },
};

export default meta;

type Story = StoryObj<typeof PieChart>;

/**
 * Tooltips can be enabled by adding a `tooltip` prop (`{}` will render default behaviour).
 */
export const Tooltip: Story = {
  args: {
    id: 'tooltip',
  },
};

/**
 * Tooltip divs can be styled by passing a `tooltip` prop with a `className` property.
 * */
export const TooltipStyled: Story = {
  args: {
    id: 'tooltip-styled',
    tooltip: {
      className: 'bg-purple-700 text-white p-2 rounded',
    },
  },
};

/**
 * The `tooltip.keys` prop can be used to specify which keys in the data array to show in the tooltip (Even those not used in creating the pie).
 * */
export const TooltipKeys: Story = {
  args: {
    ...Tooltip.args,
    id: 'tooltip-custom',
    tooltip: {
      ...TooltipStyled.args?.tooltip,
      keys: ['name', 'USA', 'Europe', 'Africa'],
    },
  },
};

/**
 * The `tooltip.html` prop can be used to specify a custom text to show in the tooltip. The function will be passed the data object.
 * */
export const TooltipCustomHtml: Story = {
  args: {
    ...Tooltip.args,
    id: 'tooltip-custom-html',
    tooltip: {
      ...TooltipStyled.args?.tooltip,
      html: (d: any) =>
        `${d.data.name} sold ${d.value || 0} in USA , ${
          d.data['Europe'] || 0
        } in Europe, ${d.data['Africa'] || 0} in Africa and ${
          d.data['APAC'] || 0
        } in Asia/Pacific.`,
    },
  },
};
