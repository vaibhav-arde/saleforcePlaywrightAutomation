/**
 * Centralized logger utility
 * Provides structured, timestamped logging for test execution
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

function log(level: LogLevel, context: string, message: string): void {
  const timestamp = new Date().toISOString();
  const formatted = `${timestamp} | ${level.padEnd(5)} | ${context} | ${message}`;

  switch (level) {
    case 'ERROR':
      console.error(formatted);
      break;
    case 'WARN':
      console.warn(formatted);
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(formatted);
  }
}

export const Logger = {
  info: (context: string, msg: string) => log('INFO', context, msg),
  warn: (context: string, msg: string) => log('WARN', context, msg),
  error: (context: string, msg: string) => log('ERROR', context, msg),
  debug: (context: string, msg: string) => log('DEBUG', context, msg),
};
