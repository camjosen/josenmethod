/**
 * Minimal ambient declarations so the frontend TypeScript compiler can traverse
 * backend source files (for AppRouter type inference) without erroring on
 * Bun-specific globals that only exist at runtime in the backend process.
 */
declare namespace Bun {
  const password: {
    hash(password: string, algorithm?: string | object): Promise<string>;
    verify(password: string, hash: string): Promise<boolean>;
  };
}
