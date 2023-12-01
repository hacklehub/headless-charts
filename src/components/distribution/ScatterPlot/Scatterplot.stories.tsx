import { Meta } from '@storybook/react';
import ScatterPlot from '.';
import data from './sample.json';

/**
 * Scatterplots show how much one variable is affected by another. The relationship between two variables is called their correlation. You can additionally encode more attributes. Color, size, and shape can be used to encode additional attributes. Color is the most common, but size and shape can be useful for making your plot more accessible.
 *
 * Essentially you can encode 2 categorical values(shape & color) & 3 numerical values(x,y & size).
 */
const meta: Meta<typeof ScatterPlot> = {
  title: 'Distribution/ScatterPlot/Intro',
  component: ScatterPlot,
  tags: ['autodocs'],
};

export default meta;
/**
 * This is the default rendering of the scatterplot with no additional attributes. The x & y axis are automatically generated based on the data provided.
 */
export const Default = {
  args: {
    id: 'scatterplot-default',
    data,
    x: {
      key: 'gdp',
    },
    y: {
      key: 'purchasing_power',
    },
  },
};

/**
 * You can additionally style each dot based on a categorical value. In this example, the dots are colored based on the continent.
 */
export const WithColor = {
  args: {
    ...Default.args,
    id: 'scatterplot-color',
    color: {
      key: 'continent',
      classNameMap: {
        Asia: 'fill-red-600 dark:fill-red-300 stroke-red-600 dark:stroke-red-300',
        Europe:
          'fill-blue-600 dark:fill-blue-300 stroke-blue-600 dark:stroke-blue-300',
        'North America':
          'fill-brown-600 dark:fill-brown-300 stroke-brown-600 dark:stroke-brown-300',
        'South America':
          'fill-green-600 dark:fill-green-300 stroke-green-600 dark:stroke-green-300',
        Africa:
          'fill-yellow-600 stroke-yellow-600 dark:fill-yellow-300 dark:stroke-yellow-300',
        Oceania:
          'fill-purple-600 stroke-purple-600 dark:fill-purple-300 dark:stroke-purple-300',
      },
    },
  },
};

/**
 * You can additionally style each dot based on a numerical value. In this example, the dots are sized based on the population.
 */

export const WithSizeAndColor = {
  args: {
    ...WithColor.args,
    id: 'scatterplot-size',
    size: {
      key: 'population',
      min: 1,
      max: 300,
      default: 10,
    },
  },
};

/**
 * You can additionally style each dot based on a categorical value. In this example, the dots are shaped based on the system of government.
 */

export const WithSizeAndShape = {
  args: {
    ...WithSizeAndColor.args,
    id: 'scatterplot-shape',
    shape: {
      key: 'system',
      shapeMap: {
        Democracy: 'square',
        Monarchy: 'wye',
      },
    },
  },
};

/**
 * You can additionally animate the rendering of the scatterplot. In this example, the dots are animated as they are rendered.
 */

export const Animated = {
  args: {
    ...WithSizeAndShape.args,
    id: 'scatterplot-animated',
    drawing: {
      delay: 300,
    },
  },
};

/**
 * Two axis zooming is also supported. In this example, the user can zoom in and out of the scatterplot.
 */
export const WithZoom = {
  args: {
    ...Animated.args,
    id: 'scatterplot-zoom',
    zooming: {
      enabled: true,
      min: 1,
      max: 4,
    },
  },
};
