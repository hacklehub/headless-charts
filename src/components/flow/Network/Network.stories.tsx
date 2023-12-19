import { Meta, StoryObj } from '@storybook/react';

import Network from '.';
import edges from './edges.json';
import nodes from './nodes.json';

const meta: Meta<typeof Network> = {
  title: 'Flow/Network/Intro',
  component: Network,
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
      idKey: 'id',
    },
  },
};

export const FixingPosition: Story = {
  args: {
    id: 'fixed-network',
    nodeDef: {
      idKey: 'id',
      xKey: 'xValue',
      yKey: 'yValue',
    },
  },
};

export const Styling: Story = {
  args: {
    id: 'styled-network',
    nodeDef: {
      idKey: 'id',
      classNameKey: 'gender',
      classNameMap: {
        male: 'fill-blue-800',
        female: 'fill-pink-400',
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
      idKey: 'id',
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
      size: {
        key: 'value',
        min: 1,
        max: 3,
        default: 1,
      },
    },
  },
};
