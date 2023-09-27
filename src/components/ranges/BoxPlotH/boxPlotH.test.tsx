import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import BoxPlotH from '.';
import data from '../sample.json';

describe('boxPlotH', () => {
  it('renders BoxPlotH component for snapshot test', () => {
    render(
      <BoxPlotH
        data={data}
        id='boxPlotH'
        x={{
          minKey: 'min',
          maxKey: 'max',
          midKey: 'mid',
          boxStart: 'firstQuartile',
          boxEnd: 'lastQuartile',
          min: 0,
        }}
        y={{ key: 'name' }}
      />
    );
    const boxPlotH = screen.getByTestId('boxPlotH');
    expect(boxPlotH).toMatchSnapshot();
  });
  it('renders BoxPlotH component', () => {
    render(
      <BoxPlotH
        data={data}
        id='boxPlotH'
        x={{
          minKey: 'min',
          maxKey: 'max',
          midKey: 'mid',
          boxStart: 'firstQuartile',
          boxEnd: 'lastQuartile',
          min: 0,
        }}
        y={{ key: 'name' }}
      />
    );
    const boxPlotH = screen.getByTestId('boxPlotH');
    expect(boxPlotH).toBeInTheDocument();
  });
});
