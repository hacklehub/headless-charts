import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import LollipopVChart from '.';
import data from './sample.json';

describe('LollipopVChart', () => {
  it('renders lollipopVChart component for snapshot test', () => {
    render(<LollipopVChart id='lollipopHChart' data={data} shape='star' />);
    const lollipopVChart = screen.getByTestId('lollipopVChart');
    expect(lollipopVChart).toMatchSnapshot();
  });
  it('renders lollipopHChart component', () => {
    render(<LollipopVChart id='lollipopHChart' data={data} shape='star' />);
    const lollipopVChart = screen.getByTestId('lollipopVChart');
    expect(lollipopVChart).toBeInTheDocument();
  });
});
