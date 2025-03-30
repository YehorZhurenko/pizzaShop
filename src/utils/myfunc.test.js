// math.test.js
import { multiply } from './myfunc';

describe('multiply function', () => {
  test('should multiply two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test('should return 0 when one number is 0', () => {
    expect(multiply(0, 3)).toBe(0);
    expect(multiply(2, 0)).toBe(0);
  });

  test('should handle negative numbers', () => {
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
  });
});
