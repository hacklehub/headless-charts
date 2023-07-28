import { describe, it } from 'vitest';

import { mergeTailwindClasses } from './mergeTailwindClasses';

describe('mergeTailwindClasses', () => {
  it('should merge tailwind classes', () => {
    // When multiple classes are given, only last one should be taken
    const classes = mergeTailwindClasses('text-red-500', 'text-blue-500');
    expect(classes).toBe('text-blue-500');
  });
});
