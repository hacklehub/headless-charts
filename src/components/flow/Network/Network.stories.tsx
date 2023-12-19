import { Meta, StoryObj } from '@storybook/react';

import Network from '.';
import edges from './edges.json';
import nodes from './nodes.json';

const meta: Meta<typeof Network> = {
  title: 'Flow/Network/Intro',
  tags: ['autodocs'],
  component: Network,
  argTypes: {},
  args: {
    nodes,
    edges,
  },
};

export default meta;

type Story = StoryObj<typeof Network>;

export const Default: Story = {
  args: {
    id: 'simple-network',
    nodeDef: {
      idKey: 'name',
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};

export const Styling: Story = {
  args: {
    id: 'styled-network',
    className: 'bg-gray-100 rounded-lg',
    nodeDef: {
      idKey: 'name',
      classNameKey: 'gender',
      classNameMap: {
        male: 'fill-blue-800',
        female: 'fill-pink-400',
      },
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      classNameKey: 'type',
      classNameMap: {
        friend: 'stroke-green-400',
        acquaintance: 'stroke-red-400',
      },
    },
  },
};

export const NodeSize: Story = {
  args: {
    ...Styling.args,
    id: 'node-size-network',
    nodeDef: {
      ...Styling?.args?.nodeDef,
      idKey: 'name',
      size: {
        key: 'age',
        min: 4,
        max: 7,
        default: 20,
      },
    },
  },
};

export const EdgeSize: Story = {
  args: {
    ...NodeSize.args,
    id: 'edge-size-network',
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      size: {
        key: 'value',
        min: 1,
        max: 3,
        default: 1,
      },
    },
  },
};

export const WithZooming: Story = {
  args: {
    ...EdgeSize.args,
    id: 'zoom-network',
    zooming: {
      enabled: true,
      min: 0.5,
      max: 2,
    },
  },
};
