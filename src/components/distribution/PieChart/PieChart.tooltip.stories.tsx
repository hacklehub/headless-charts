/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import PieChart from '.';
import data from './sample.json';

/**
 * Donut charts are a variant of pie charts. Simply specify an `innerRadius` prop
 */
const meta: Meta<typeof PieChart> = {
  title: 'Distribution/PieChart/Tooltips',
  component: PieChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PieChart>;

const classNameMap = {
  'Product A': 'fill-purple-700',
  'Product B': 'fill-purple-500',
  'Product C': 'fill-purple-300',
};

/**
 * Tooltips can be enabled by adding a `tooltip` prop (`{}` will render default behaviour).
 */
export const Tooltip: Story = {
  args: {
    id: 'tooltip',
    data,
    valueKey: 'USA',
    classNameMap,
    tooltip: {},
  },
};

/**
 * Tooltip divs can be styled by passing a `tooltip` prop with a `className` property.
 * */
export const TooltipStyled: Story = {
  args: {
    ...Tooltip.args,
    id: 'tooltip-styled',
    tooltip: {
      className: 'bg-purple-800 text-white p-2 rounded',
    },
  },
};

/**
 * The `tooltip.keys` prop can be used to specify which keys in the data array to show in the tooltip (Even those not used in creating the pie).
 * */
export const TooltipCustom: Story = {
  args: {
    ...Tooltip.args,
    id: 'tooltip-custom',
    tooltip: {
      keys: ['name', 'USA'],
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
      className: 'bg-purple-800 text-white p-2 rounded',
      html: (d: any) =>
        `${d.data.name} sold ${d.value} in USA and ${d.data['Europe']} in Europe`,
    },
  },
};
