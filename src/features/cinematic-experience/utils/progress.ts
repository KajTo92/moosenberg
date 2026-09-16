export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export function beatOpacity(progress: number, start: number, end: number) {
  if (progress < start || progress > end) return 0;
  const fade = Math.min(0.035, (end - start) / 3);
  return Math.min(
    start === 0 ? 1 : clamp((progress - start) / fade),
    clamp((end - progress) / fade),
  );
}
export function videoTime(progress: number, duration: number, filmEnd: number) {
  return Number.isFinite(duration) && duration > 0
    ? clamp(progress / filmEnd) * Math.max(0, duration - 0.045)
    : 0;
}
