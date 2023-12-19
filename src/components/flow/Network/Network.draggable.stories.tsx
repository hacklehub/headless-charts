import { Meta, StoryObj } from '@storybook/react';

import Network from '.';
import edges from './edges.json';
import nodes from './nodes.json';

const meta: Meta<typeof Network> = {
  title: 'Flow/Network/Draggable',
  tags: ['autodocs'],
  component: Network,
  args: {
    nodes,
    edges,
  },
};

export default meta;

type Story = StoryObj<typeof Network>;

export const Draggable: Story = {
  args: {
    id: 'draggable-network',
    dragging: {
      enabled: true,
      snapToNewPosition: false,
    },
  },
};

export const DraggableSnapsToNewPosition: Story = {
  args: {
    ...Draggable.args,
    id: 'draggable-snap-network',
    dragging: {
      enabled: true,
      snapToNewPosition: true,
    },
  },
};
