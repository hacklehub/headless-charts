import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import BarChart from '.';

describe('BarChart', () => {
  it('renders', () => {
    render(<BarChart data={[]} />);
    expect(screen).toBeTruthy();
  });
});
