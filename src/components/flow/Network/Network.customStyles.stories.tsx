import './style.css';

import { Meta, StoryObj } from '@storybook/react';

import Network from '.';
import edges from './edges.json';
import nodes from './nodes.json';

const meta: Meta<typeof Network> = {
  title: 'Flow/Network/CustomStyles',
  component: Network,
  tags: ['autodocs'],
  args: {
    nodes,
    edges,
  },
};

export default meta;

type Story = StoryObj<typeof Network>;

export const Default: Story = {
  args: {
    id: 'custom-styles-network',
    nodeDef: {
      idKey: 'name',
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      className: 'running',
    },
  },
};

export const CurvedEdges: Story = {
  args: {
    id: 'curved-network',
    nodeDef: {
      idKey: 'name',
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
      className: 'running fill-none stroke-green-500',
      curve: 1,
    },
  },
};
