import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@jest/expect' {
  export interface Matchers<R, T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
