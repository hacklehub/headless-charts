import './style.css';

import { Meta, StoryObj } from '@storybook/react';

import Network from '.';
import edges from './edges.json';
import nodes from './nodes.json';

const meta: Meta<typeof Network> = {
  title: 'Flow/Network/CustomStyles',
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
    edgeDef: {
      className: 'running',
    },
  },
};
