import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import RadarChart from '.';
import data from './sample.json';

describe('RadarChart', () => {
  it('renders RadarChart component for snapshot test', () => {
    render(<RadarChart id='radar-chart'
      data={data}
      label={{
        key: 'name',
      }}
      min={0}
      max={100}
      metrics={
        [
          { key: 'attack' },
          { key: 'defense' },
          { key: 'midfield' },
          { key: 'goalkeeper' },
          { key: 'overall' },
        ]} />);
    const radarChart = screen.getByTestId('radar-chart');
    expect(radarChart).toMatchSnapshot();
  });

  it('renders RadarChart component', () => {
    render(<RadarChart id='radar-chart'
      data={data}
      label={{
        key: 'name',
      }}
      min={0}
      max={100}
      metrics={
        [
          { key: 'attack' },
          { key: 'defense' },
          { key: 'midfield' },
          { key: 'goalkeeper' },
          { key: 'overall' },
        ]} />);
    const radarChart = screen.getByTestId('radar-chart');
    expect(radarChart).toBeInTheDocument();
  });

})
