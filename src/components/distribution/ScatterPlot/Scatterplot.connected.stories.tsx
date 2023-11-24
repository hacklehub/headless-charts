import { Meta } from '@storybook/react';
import ScatterPlot from '.';
import data from './sample.json';

/**
 * Connected scatterplots are scatterplots with lines connecting the dots. The relationship between two variables is called their correlation. You can additionally encode more attributes. Color, size, and shape can be used to encode additional attributes. Color is the most common, but size and shape can be useful for making your plot more accessible.
 */
const meta: Meta<typeof ScatterPlot> = {
  title: 'Distribution/ScatterPlot/Connected',
  component: ScatterPlot,
  tags: ['autodocs'],
};

export default meta;

/**
 * Draw a connected scatterplot (scatterplot with lines connecting the dots)
 */

export const Connected = {
  args: {
    id: 'scatterplot-connected',
    data,
    x: {
      key: 'gdp',
    },
    y: {
      key: 'purchasing_power',
    },
    connect: {
      enabled: true,
    },
  },
};

/**
 * You can style the connection line
 */

export const ConnectedStyled = {
  args: {
    ...Connected.args,
    id: 'scatterplot-connected-styled',
    connect: {
      enabled: true,
      className: 'stroke-green-500',
    },
  },
};

/**
 * You can also animate the lines
 */

export const ConnectedAnimated = {
  args: {
    ...Connected.args,
    id: 'scatterplot-connected-animated',
    data: data.reverse(),
    drawing: {
      delay: 100,
    },
    connect: {
      enabled: true,
      className: 'stroke-green-500',
    },
  },
};
