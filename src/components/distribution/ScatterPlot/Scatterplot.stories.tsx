/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from '@storybook/react';
import ScatterPlot from '.';
import data from './sample.json';

/**
 * Scatterplots show how much one variable is affected by another. The relationship between two variables is called their correlation .
 */
export default {
  title: 'Distribution/ScatterPlot',
  component: ScatterPlot,
} as Meta;

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

export const Animated = {
  args: {
    ...WithSizeAndShape.args,
    id: 'scatterplot-animated',
    drawing: {
      delay: 100,
    },
  },
};

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

export const WithCustomTooltip = {
  args: {
    ...WithTooltip.args,
    id: 'scatterplot-custom-tooltip',
    tooltip: {
      ...WithTooltip.args.tooltip,
      html: (d: any) => {
        return `
                <div class="flex flex-col">
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
