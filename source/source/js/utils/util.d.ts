declare module 'utils/util' {
  export function debounce<T extends (...args: any[]) => void>(callback: T, timeoutDelay?: number): T;
  export const desk: MediaQueryList;
}
