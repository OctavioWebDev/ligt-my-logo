/** Wraps an async submit so double clicks share one in-flight call instead of sending twice. */
export function createSubmitter<A extends unknown[], R>(fn: (...args: A) => Promise<R>): (...args: A) => Promise<R> {
  let inFlight: Promise<R> | null = null;
  return (...args: A) => {
    if (!inFlight) inFlight = fn(...args).finally(() => { inFlight = null; });
    return inFlight;
  };
}
