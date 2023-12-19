import { Meta, StoryObj } from '@storybook/react';

import Network from '.';
import edges from './edges.json';
import nodes from './nodes.json';

const meta: Meta<typeof Network> = {
  title: 'Flow/Network/Fixed',
  tags: ['autodocs'],
  component: Network,
  args: {
    nodes,
    edges,
    nodeDef: {
      idKey: 'name',
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Network>;

export const FixingPosition: Story = {
  args: {
    id: 'fixed-network',
    nodeDef: {
      idKey: 'name',
      x: {
        key: 'xValue',
      },
      y: {
        key: 'yValue',
      },
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};

export const FixingOnlyXPosition: Story = {
  args: {
    id: 'fixed-x-network',
    nodeDef: {
      idKey: 'name',
      x: {
        key: 'xValue',
      },
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};

export const FixingOnlyYPosition: Story = {
  args: {
    id: 'fixed-y-network',
    nodeDef: {
      idKey: 'name',
      y: {
        key: 'yValue',
      },
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};

export const ShowAxis: Story = {
  args: {
    id: 'fixed-network-show-axis',
    nodeDef: {
      idKey: 'name',
      x: {
        key: 'xValue',
        axis: 'bottom',
      },
      y: {
        key: 'yValue',
        axis: 'left',
      },
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};

export const ShowXAxisTop: Story = {
  args: {
    id: 'fixed-network-show-axis-top',
    nodeDef: {
      idKey: 'name',
      x: {
        key: 'xValue',

        axis: 'top',
      },
      y: {
        key: 'yValue',
        axis: 'left',
      },
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};

export const ShowYAxisRight: Story = {
  args: {
    id: 'fixed-network-show-axis-right',
    nodeDef: {
      idKey: 'name',
      x: {
        key: 'xValue',
        axis: 'bottom',
      },
      y: {
        key: 'yValue',
        axis: 'right',
      },
    },
    edgeDef: {
      sourceKey: 'from',
      targetKey: 'to',
    },
  },
};
