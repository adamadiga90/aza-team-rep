export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const ORDER: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };
const MIN_LEVEL: LogLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';
const ENDPOINT: string | undefined = process.env.NEXT_PUBLIC_LOG_ENDPOINT;

function emit(level: LogLevel, msg: string, data?: unknown): void {
  if (ORDER[level] < ORDER[MIN_LEVEL]) return;
  const payload = { ts: new Date().toISOString(), level, msg, data };
  if (ENDPOINT && typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      navigator.sendBeacon(ENDPOINT, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    } catch {
      // logging must never break the app flow
    }
  }
  if (process.env.NODE_ENV === 'development') {
    if (level === 'error') console.error(`[${level}] ${msg}`, data ?? '');
    else if (level === 'warn') console.warn(`[${level}] ${msg}`, data ?? '');
    else console.log(`[${level}] ${msg}`, data ?? '');
  }
}

export const logger = {
  debug: (msg: string, data?: unknown) => emit('debug', msg, data),
  info: (msg: string, data?: unknown) => emit('info', msg, data),
  warn: (msg: string, data?: unknown) => emit('warn', msg, data),
  error: (msg: string, data?: unknown) => emit('error', msg, data),
};
