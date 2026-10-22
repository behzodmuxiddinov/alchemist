const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const TIME_PART_LENGTH = 2;

export function getEndTime(seconds: number): number {
  return Date.now() + seconds * MILLISECONDS_IN_SECOND;
}

export function addSeconds(endsAt: number, seconds: number): number {
  return endsAt + seconds * MILLISECONDS_IN_SECOND;
}

export function getRemainingSeconds(endsAt: number): number {
  const remaining = (endsAt - Date.now()) / MILLISECONDS_IN_SECOND;

  return Math.max(0, Math.ceil(remaining));
}

function padNumber(value: number): string {
  return String(value).padStart(TIME_PART_LENGTH, '0');
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = padNumber(date.getDate());
  const month = padNumber(date.getMonth() + 1);
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());

  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
}

export function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / SECONDS_IN_MINUTE);
  const rest = safeSeconds % SECONDS_IN_MINUTE;

  return [minutes, rest].map((part) => padNumber(part)).join(':');
}
