import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import BoxPlotV from '.';
import data from '../sample.json';

describe('BoxPlotVChart', () => {
  it('renders boxplotV component for snapshot test', () => {
    render(
      <BoxPlotV
        data={data}
        id='boxPlotV'
        x={{ key: 'name' }}
        y={{
          minKey: 'min',
          maxKey: 'max',
          midKey: 'mid',
          boxStart: 'firstQuartile',
          boxEnd: 'lastQuartile',
          min: 0,
        }}
      />
    );
    const boxPlotV = screen.getByTestId('boxPlotV');
    expect(boxPlotV).toMatchSnapshot();
  });
  it('renders boxplotV component', () => {
    render(
      <BoxPlotV
        data={data}
        id='boxPlotV'
        x={{ key: 'name' }}
        y={{
          minKey: 'min',
          maxKey: 'max',
          midKey: 'mid',
          boxStart: 'firstQuartile',
          boxEnd: 'lastQuartile',
          min: 0,
        }}
      />
    );
    const boxPlotV = screen.getByTestId('boxPlotV');
    expect(boxPlotV).toBeInTheDocument();
  });
});
