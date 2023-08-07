/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import PieChart from '.';
import data from './sample.json';

/**
 * Pie charts can be used to show how much each category represents as part of a whole. They are useful for showing the distribution of a dataset.
 * 
 */
export default {
  title: 'Distribution/PieChart',
  component: PieChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof PieChart>;

const classNameMap = {
  'Product A': 'fill-purple-700 text-red-700',
  'Product B': 'fill-purple-500 ',
  'Product C': 'fill-purple-300 ',
};

/**
* The default chart will iterate through the `data` prop and takes the `valueKey` prop as the value to be represented, and `nameKey` as the name of the category.
*/
export const Default: Story = {
  args: {
    data,
    id: 'default-pie-chart',
    valueKey: 'USA',
    nameKey: 'name',
  },
};

/**
 * However, the default chart will not be styled. You can provide a `classNameMap` prop, with a list of possible values for the `nameKey` prop.
 */
export const Styled: Story = {
  args: {
    ...Default.args,
    id: 'styled-pie-chart',
    classNameMap,
  },
};

/**
 * Animating the chart can be animated by specifying a `duration` in milliseconds in `drawing` prop.
 */
export const Drawing: Story = {
  args: {
    ...Styled.args,
    id: 'drawing-pie-chart',
    drawing: {
      duration: 1000,
    },
  },
};

/**
 * You can add labels to the chart by specifying a `labels` prop. The `labels` prop takes a `radius` prop, which is the radius of the circle where the labels will be placed. The `key` prop is the name of the category. The `text` prop is a function that takes the data and returns the text to be displayed. The `className` prop is a string of tailwind classes to be applied to the labels.
 */

export const Labelled: Story = {
  args: {
    ...Styled.args,
    id: 'labelled-pie-chart',
    labels: {
      radius: 1.2,
      className: 'p-2 rounded',
      classNameMap,
    },
  },
};

/**
 * You can add the `startAngle` prop to rotate the chart.
 */
export const StartAngle90: Story = {
  args: {
    ...Styled.args,
    id: 'pie-chart-start-angle',
    startAngle: 90,
  },
};

export const PaddingAngle: Story = {
  args: {
    ...Default.args,
    id: 'pie-chart-padding-angle',
    paddingAngle: 1,
  },
};

export const CornerRadius: Story = {
  args: {
    ...PaddingAngle.args,
    id: 'pie-chart-corner-radius',
    cornerRadius: 5,
  },
};
