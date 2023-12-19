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
    id: 'simple-network',
    nodeDef: {
      idKey: 'id',
    },
    edgeDef: {
      className: 'running',
    },
  },
};

export const CurvedEdges: Story = {
  args: {
    id: 'curved-network',
    nodeDef: {
      idKey: 'id',
    },
    edgeDef: {
      className: 'running fill-none stroke-green-500',
      curve: 1,
    },
  },
};
