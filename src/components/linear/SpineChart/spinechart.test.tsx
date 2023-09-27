import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import SpineChart from '.';

const data = [
  {
    name: 'Product A',
    value2: 6,
    value3: 7,
    value4: 8,
  },
  {
    name: 'Product B',
    value2: 4,
    value3: 6,
    value4: 8,
  },
  {
    name: 'Product C',
    value2: 1,
    value3: 2,
    value4: 3,
  },
];

const x = [
  { key: 'value2', direction: 'left' },
  { key: 'value3', direction: 'right' },
  { key: 'value4', direction: 'left' },
];

describe('SpinrChart', () => {
  it('renders Spine chart component', () => {
    render(
      <SpineChart
        data={data}
        id='spineChart'
        className=''
        x={x}
        y={{
          key: '',
          axis: 'middle',
          className: '',
        }}
      />
    );
    const spineChart = screen.getByTestId('spineChart');
    expect(spineChart).toMatchSnapshot();
  });

  it('renders Spine chart component', () => {
    render(
      <SpineChart
        data={data}
        id='spineChart'
        className=''
        x={x}
        y={{
          key: '',
          axis: 'middle',
          className: '',
        }}
      />
    );
    const spineChart = screen.getByTestId('spineChart');
    expect(spineChart).toBeInTheDocument();
  });
});
