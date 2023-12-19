import { Meta, StoryObj } from '@storybook/react';

import Network from '.';
import edges from './edges.json';
import nodes from './nodes.json';

const meta: Meta<typeof Network> = {
  title: 'Flow/Network/Tooltip',
  tags: ['autodocs'],
  component: Network,
  args: {
    nodes,
    edges,
  },
};

export default meta;

type Story = StoryObj<typeof Network>;

export const NodeTooltip: Story = {
  args: {
    id: 'tooltip-only-for-nodes',
    nodeDef: {
      idKey: 'name',
      classNameKey: 'gender',
      classNameMap: {
        male: 'fill-blue-800',
        female: 'fill-pink-400',
      },
      tooltip: {},
    },
  },
};

export const StyleNodeTooltip: Story = {
  args: {
    ...NodeTooltip.args,
    id: `style-node-tooltip-with-classname-prop`,
    nodeDef: {
      idKey: 'id',
      tooltip: {
        className: 'bg-gray-100 text-gray-900 p-2 rounded',
      },
    },
  },
};

export const NodeTooltipCustomKeys: Story = {
  args: {
    id: 'node-tooltip-custom-keys',
    nodeDef: {
      idKey: 'id',
      tooltip: {
        className: 'bg-gray-100 text-gray-900 p-2 rounded',
        keys: ['name', 'age', 'gender'],
      },
    },
  },
};

export const NodeTooltipCustomHTML: Story = {
  args: {
    id: `node-tooltip-custom-html`,
    nodeDef: {
      idKey: 'id',
      tooltip: {
        html: (node) => `
          <div class="bg-gray-100 text-gray-900 p-2 rounded">
            <div class="font-bold ${
              node.gender === 'male' ? 'text-blue-300' : 'text-pink-300'
            }">${node.name}</div>
            <div>${node.age} years old</div>
            `,
      },
    },
  },
};

export const EdgeTooltip: Story = {
  args: {
    id: 'edge-tooltip',
    nodeDef: {
      idKey: 'id',
      tooltip: {},
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      tooltip: {},
    },
  },
};

export const EdgeTooltipStyleWithClassName: Story = {
  args: {
    id: 'edge-tooltip-style-with-classname',
    nodeDef: {
      idKey: 'id',
      tooltip: {},
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      tooltip: {
        className: 'bg-gray-100 text-gray-900 p-2 rounded',
      },
    },
  },
};

export const EdgeTooltipCustomKeys: Story = {
  args: {
    id: 'edge-tooltip-custom-keys',
    nodeDef: {
      idKey: 'id',
      tooltip: {},
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      tooltip: {
        keys: ['source.name', 'target.name', 'value'],
      },
    },
  },
};

export const EdgeTooltipCustomHTML: Story = {
  args: {
    ...NodeTooltipCustomHTML,
    nodes,
    edges,
    id: 'edge-tooltip-custom-html',
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      size: {
        key: 'value',
        min: 1,
        max: 4,
        default: 1,
      },
      tooltip: {
        html: (edge) => `
          <div class="bg-gray-100 text-gray-900 p-2 rounded">
            <div class="font-bold">${edge.source.name} to ${edge.target.name}</div>
            <div>${edge.value}</div>
            `,
      },
    },
  },
};
