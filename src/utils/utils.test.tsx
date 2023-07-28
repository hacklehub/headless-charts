import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { mergeTailwindClasses } from './mergeTailwindClasses';

describe('mergeTailwindClasses', () => {
  it('should merge tailwind classes', () => {
    // When multiple classes are given, only last one should be taken
    const classes = mergeTailwindClasses('text-red-500', 'text-blue-500');
    expect(classes).toBe('text-blue-500');
  });

  it(`div should not have 'text-red-500' class`, () => {
    render(
      <div
        data-testid='test-div'
        className={mergeTailwindClasses('text-red-500', 'text-blue-500')}
      />
    );
    const testDiv = screen.getByTestId('test-div');
    expect(testDiv).toHaveClass('text-blue-500');
    expect(testDiv).not.toHaveClass('text-red-500');
  });
});
