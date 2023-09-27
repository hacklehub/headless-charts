import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import DotPlot from '.';
import data from '../sample.json';

describe('Cometplot', () => {
  it('renders cometPlot component for snapshot test', () => {
    render(
      <DotPlot
        data={data}
        size={40}
        id='cometPlotChart'
        x={{
          fromKey: 'min',
          toKey: 'max',
          className: 'fill-red-800 stoke-white',
          classNameTail: 'fill-white stroke-red-800',
          classNameHead: 'fill-red-800',
        }}
        y={{ key: 'name' }}
        shape='triangle'
      />
    );
    const cometPlot = screen.getByTestId('cometPlot');
    expect(cometPlot).toMatchSnapshot();
  });
  it('renders cometplot component', () => {
    render(
      <DotPlot
        data={data}
        size={40}
        id='cometPlotChart'
        x={{
          fromKey: 'min',
          toKey: 'max',
          className: 'fill-red-800 stoke-white',
          classNameTail: 'fill-white stroke-red-800',
          classNameHead: 'fill-red-800',
        }}
        y={{ key: 'name' }}
        shape='triangle'
      />
    );
    const cometPlot = screen.getByTestId('cometPlot');
    expect(cometPlot).toBeInTheDocument();
  });
});
