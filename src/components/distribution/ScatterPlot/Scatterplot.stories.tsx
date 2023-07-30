/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from '@storybook/react';
import ScatterPlot from '.';
import data from './sample.json';

/**
 * Scatterplots show how much one variable is affected by another. The relationship between two variables is called their correlation. You can additionally encode more attributes. Color, size, and shape can be used to encode additional attributes. Color is the most common, but size and shape can be useful for making your plot more accessible.
 * 
 * Essentially you can encode 2 categorical values(shape & color) & 3 numerical values(x,y & size).
 */
export default {
  title: 'Distribution/ScatterPlot',
  component: ScatterPlot,
  tags: ['autodocs'],
} as Meta;

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
        Asia: 'fill-red-500 stroke-red-500',
        Europe: 'fill-blue-500 stroke-blue-500',
        'North America': 'fill-brown-500 stroke-brown-500',
        'South America': 'fill-green-500 stroke-green-500',
        Africa: 'fill-yellow-500 stroke-yellow-500',
        Oceania: 'fill-purple-500 stroke-purple-500',
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
      max: 100,
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
      delay: 100,
    },
  },
};

/**
 * You can additionally add a tooltip to the scatterplot. In this example, the tooltip is rendered when the user hovers over a dot, and shows more information about that data point.
 */

export const WithTooltip = {
  args: {
    ...WithSizeAndShape.args,
    id: 'scatterplot-tooltip',
    tooltip: {
      className: 'bg-gray-800 text-white rounded p-2',
      keys: [
        'country',
        'continent',
        'system',
        'gdp',
        'purchasing_power',
        'population',
      ],
    },
  },
};

/**
 * You can also customize the html string that the tooltip rendered. 
 */

export const WithCustomTooltip = {
  args: {
    ...WithTooltip.args,
    id: 'scatterplot-custom-tooltip',
    tooltip: {
      ...WithSizeAndColor,
      html: (d: any) => {
        return `
                <div class="flex flex-col bg-white p-2 border-2 border-purple-500 rounded-lg">
                    <div class="flex flex-row justify-between">
                        <div class="font-bold">${d.country}</div>
                        <div class="font-bold">${d.system}</div>
                    </div>
                    <div>${d.continent}</div>
                    <div>GDP: ${d.gdp}</div>
                    <div>PP: ${d.purchasing_power}</div>
                    <div>Pop: ${d.population}</div>
                    
                </div>
                `;
      },
    },
  },
};

/**
 * Two axis zooming is also supported. In this example, the user can zoom in and out of the scatterplot.
 */
export const WithZoom = {
  args: {
    ...Default.args,
    id: 'scatterplot-zoom',
    zooming: {
      enabled: true,
      min: 1,
      max: 4,
    },
  },
};

