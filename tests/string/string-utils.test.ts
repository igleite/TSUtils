import { StringUtils } from '../../src/string/string-utils';

describe('StringUtils.capitalize', () => {
    test('should capitalize the first letter of an lowercase string', () => {
    expect(StringUtils.capitalize('hello')).toBe('Hello');
  });

  test('should capitalize the first letter of an uppercase string', () => {
    expect(StringUtils.capitalize('WORLD')).toBe('World');
  });

  test('should return an empty string when input is an empty string', () => {
    expect(StringUtils.capitalize('')).toBe('');
  });

  test('should capitalize the first letter and lowercase the rest of a mixed case string', () => {
    expect(StringUtils.capitalize('tYpeScript')).toBe('Typescript');
  });

  test('should handle strings with special characters correctly', () => {
    expect(StringUtils.capitalize('!hello')).toBe('!hello');
  });
});
