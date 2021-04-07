declare module 'logger.js' {
  export type Color =
    | 'yellow'
    | 'darkgray'
    | 'red'
    | 'lightred'
    | 'green'
    | 'lightpurple'
    | 'white'
    | 'cyan'
    | 'purple'
    | 'blue'
  
  export type LogLevel =
    | 'debug'
    | 'info'
    | 'warn'
    | 'error'
    | 'fatal'
    | 'emerg' // i don't like this one

  export interface LoggerFactory {
    /**
     * Creates logger with specified thread name and color.
     *
     * @param thread Thread name
     * @param color null = random
     * @returns A Logger instance
     */
    static getLogger(thread: string, color: Color | null): Logger
  }

  export class Logger {
    /**
     * Configures the logger.
     * @param debug whether to enable debug logging
     */
    public config(debug: boolean): Logger

    /**
     * @param message the message
     * @param level log level
     * @param color color (keyof chalk/keyof keyof chalk but it's complex so I made it 'string')
     * @param isLogger whether the method is invoked from itself
     */
    private out(message: unknown, level: LogLevel, color: string, isLogger: boolean): void

    /**
     * @param message the message
     * @param args additional arguments, can be used to replace '{}'s in message
     */
    public debug(message: unknown, ...args: Array<unknown>): Logger

    /**
     * @param message the message
     * @param args additional arguments, can be used to replace '{}'s in message
     */
    public info(message: unknown, ...args: Array<unknown>): Logger

    /**
     * @param message the message
     * @param args additional arguments, can be used to replace '{}'s in message
     */
    public warn(message: unknown, ...args: Array<unknown>): Logger

    /**
     * @param message the message
     * @param args additional arguments, can be used to replace '{}'s in message
     */
    public error(message: unknown, ...args: Array<unknown>): Logger

    /**
     * @param message the message
     * @param args additional arguments, can be used to replace '{}'s in message
     */
    public fatal(message: unknown, ...args: Array<unknown>): Logger

    /**
     * @param message the message
     * @param args additional arguments, can be used to replace '{}'s in message
     */
    public emerg(message: unknown, ...args: Array<unknown>): Logger

    /**
     * Formats the string.
     * @param s the string
     * @param args the arguments
     */
    public format(s: string, args: Array<unknown>): string
  }
}
