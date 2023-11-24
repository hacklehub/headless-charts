import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import BulletChart from '.';

describe('BulletChart', () => {
  it('renders BulletChart component for snapshot test', () => {
    render(<BulletChart label='Sales'
      id='bullet-chart'
      data={85}
      min={0}
      base={50}
      target={80}
      threshold={90}
      max={100} />);
    const bulletChart = screen.getByTestId('bullet-chart');
    expect(bulletChart).toMatchSnapshot();
  });

  it('renders BulletChart component', () => {
    render(<BulletChart label='Sales'
      id='bullet-chart'
      data={85}
      min={0}
      base={50}
      target={80}
      threshold={90}
      max={100} />);
    const bulletChart = screen.getByTestId('bullet-chart');
    expect(bulletChart).toBeInTheDocument();
  });

})
