export const LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: Error
}

class Logger {
  private logLevel: LogLevel

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel)
    const currentIndex = levels.indexOf(this.logLevel)
    const messageIndex = levels.indexOf(level)
    return (
      currentIndex >= 0 && messageIndex >= 0 && messageIndex <= currentIndex
    )
  }

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry

    let logString = `[${timestamp}] ${level.toUpperCase()}: ${message}`

    if (context && Object.keys(context).length > 0) {
      logString += ` | Context: ${JSON.stringify(context)}`
    }

    if (error) {
      logString += ` | Error: ${error.message}`
      if (error.stack) {
        logString += ` | Stack: ${error.stack}`
      }
    }

    return logString
  }

  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    error?: Error,
  ) {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    }

    const formattedLog = this.formatLog(entry)

    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedLog)
        break
      case LogLevel.WARN:
        console.warn(formattedLog)
        break
      case LogLevel.INFO:
        console.info(formattedLog)
        break
      case LogLevel.DEBUG:
        console.debug(formattedLog)
        break
    }
  }

  error(message: string, context?: Record<string, any>, error?: Error) {
    this.log(LogLevel.ERROR, message, context, error)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context)
  }

  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context)
  }

  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context)
  }
}

export const logger = new Logger()
