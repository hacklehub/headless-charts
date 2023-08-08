/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import PieChart from '.';
import data from './sample.json';

/**
 * Pie charts can be used to show how much each category represents as part of a whole. They are useful for showing the distribution of a dataset.
 * 
 * By default PieCharts are not styled. The following styles are passed by default
 * 
 * - all paddings = 0
 * - all margins = 40px
 * - no classNameMap or className 
 * - padding given to each slice = 2 degrees (paddingAngle)
 * - innerRadius set to 0 (Pie and not a donut chart)
 * - cornerRadius set to 0 (no rounded corners)
 * - no animation, labels or tooltips
 * - startAngle = 0 and endAngle = 360 (Chart is drawn clockwise from top)
 */
export default {
  title: 'Distribution/PieChart/Intro',
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
 * 
 * `data`, `valueKey` and `nameKey` are required props. If you do not provide them, the chart will not be drawn.
 * 
 * Note: the following chart will not be drawn in the docs because it shares the same id as the chart displayed with the Controls at the top
 * */
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
 * 
 * In the example, nameKey = 'USA' has 3 possible values: 'Product A', 'Product B' and 'Product C'. The `classNameMap` prop takes a map of the possible values and the tailwind classes to be applied to each value.
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
 * You can add labels to the chart by specifying a `labels` prop. The `labels` prop takes a `radius` prop, which is the radius of the circle where the labels will be placed. The `key` prop is the name of the category. The `text` prop is a function that takes the data and returns the text to be displayed. The `className` prop is a string of tailwind classes to be applied to the labels (please use `text-` classes to style).
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
