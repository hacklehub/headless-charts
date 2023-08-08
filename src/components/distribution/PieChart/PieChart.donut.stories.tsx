import { Meta, StoryObj } from '@storybook/react';

import PieChart from '.';
import data from './sample.json';

/**
 * Donut charts are a variant of pie charts. Simply specify an `innerRadius` prop
 */
const meta: Meta<typeof PieChart> = {
  title: 'Distribution/PieChart/Donuts',
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
 * From the normally styled `PieChart` component, simply specify an `innerRadius` prop.
 */
export const Donut: Story = {
  args: {
    id: 'donut',
    data,
    valueKey: 'USA',
    classNameMap,
    innerRadius: 0.65,
  },
};

/**
 * The `labels` prop can be used to add labels to the slices.
 * */

export const Labelled: Story = {
  args: {
    ...Donut.args,
    id: 'labelled-donut',
    labels: {
      radius: 1.2,
    },
  },
};

/**
 * The `drawing` prop can be used to animate the drawing of the slices.
 */

export const Drawing: Story = {
  args: {
    ...Donut.args,
    id: 'drawing-donut',
    drawing: {
      duration: 1000,
    },
  },
};

/**
 * Props like `drawing` and `labels` can be used together.
 */
export const DrawingWithLabels: Story = {
  args: {
    id: 'drawing-with-labels-donut',
    ...Labelled.args,
    ...Drawing.args,
  },
};

/**
 * The paddingAngle prop is used to add padding between slices (in degrees).
 */
export const PaddingAngle: Story = {
  args: {
    ...Drawing.args,
    id: 'padding-angle-donut',
    paddingAngle: 1,
  },
};

/**
 * The cornerRadius prop is used to add rounded corners to the slices.
 */
export const CornerRadius: Story = {
  args: {
    ...Drawing.args,
    id: 'corner-radius-donut',
    cornerRadius: 4,
  },
};

