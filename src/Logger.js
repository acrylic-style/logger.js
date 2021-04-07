const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment')
const stripAnsi = require('strip-ansi')

class Logger {
  constructor(init, date) {
    if (init) return
    const regex = /latest\.(.+?)\.log/
    const files = fs.readdirSync('logs')
    files.filter(file => regex.test(file)).forEach(file => {
      const [ name, date ] = regex.exec(file)
      fs.renameSync(`logs/${name}`, `logs/${date}.log`)
    })
    this.file = `logs/latest.${date}.log`
    fs.writeFileSync(this.file, `--- The log begin at ${new Date().toLocaleString()} ---\n`)
    this.debug('The log file was initialized.', true)
  }

  /**
   * Configure this logger.
   * @param {boolean} debug
   * @returns {Logger} A Logger instance
   */
  config(debug = false) {
    this.debugging = debug
    return this
  }

  /**
   *
   * @param {*} message Message of this log
   * @param {string} level error, warn, fatal, info, debug
   * @param {string} color color of chalk
   * @param {boolean} isLogger Is this called by myself?
   * @returns {void} <void>
   * @private
   */
  #out(message, level, color, isLogger) {
    if (["number", "object", "symbol", "function", "boolean", "bigint", "undefined"].includes(typeof message)) message = require('util').inspect(message)
    const date = chalk.white.bgCyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`) + chalk.reset()
    const thread = isLogger ? chalk.hex('#800080')('logger') : this.thread
    const coloredlevel = chalk`{${color} ${level}}`
    const datethreadlevel = `${date} ${thread}${chalk.reset()} ${coloredlevel}${chalk.reset()} `
    const spaces = ' '.repeat(stripAnsi(datethreadlevel).length)
    const data = `${datethreadlevel}${chalk.green(message.includes('\n') ? message.replace(/\n/g, `\n${spaces}`) : message)}${chalk.reset()}`
    fs.appendFileSync(this.file, `${stripAnsi(data)}\n`)
    console.info(data)
  }

  /**
   * @param {string} s 
   * @param {Array<unknown>} args 
   */
  format(s, args) {
    let result = s
    args.forEach(o => {
      result = result.replace('{}', o)
    })
    return result
  }

  /**
   * Outputs info level message.
   *
   * @example logger.info('foo')
   *
   *
   * @example logger.warn('foo').info('bar')
   *
   *
   * @param {*} message
   *
   * @returns {Logger} A Logger instance
   */
  info(message, ...args) {
    this.#out(this.format(message, args), 'info', 'blue', false)
    return this
  }
  /**
   * Outputs debug level message.
   * Just debug message.
   *
   * @example logger.debug('foo')
   *
   *
   * @example logger.debug('foo').error('bar')
   *
   *
   * @param {*} message
   *
   * @returns {Logger} A Logger instance
   */
  debug(message, ...args) {
    if (this.debugging) this.#out(this.format(message, args), 'debug', 'cyan', false)
    return this
  }
  /**
   * Outputs warn level message.
   * Warning condition
   *
   * @example logger.warn('foo')
   *
   *
   * @example logger.warn('foo').error('bar')
   *
   *
   * @param {*} message
   *
   * @returns {Logger} A Logger instance
   */
  warn(message, ...args) {
    this.#out(this.format(message, args), 'warn', 'bold.yellow', false)
    return this
  }
  /**
   * Outputs error level message.
   * Error condition
   *
   * @example logger.error('foo')
   *
   *
   * @example logger.error('foo').debug('bar')
   *
   *
   * @param {*} message
   *
   * @returns {Logger} A Logger instance
   */
  error(message, ...args) {
    this.#out(this.format(message, args), 'error', 'red', false)
    return this
  }
  /**
   * Outputs fatal level message.
   * Fatal Error, may need action immediately
   *
   * @example logger.fatal('foo')
   *
   *
   * @example logger.fatal('foo').error('bar')
   *
   *
   * @param {*} message
   *
   * @returns {Logger} A Logger instance
   */
  fatal(message, ...args) {
    this.#out(this.format(message, args), 'fatal', 'redBright.bold', false)
    return this
  }
  /**
   * Outputs emerg level message.
   * Use on going system is unusable(e.g. uncaughtException)
   *
   * @example logger.emerg('foo')
   *
   *
   * @example logger.emerg('foo').emerg('bar')
   *
   *
   * @param {*} message
   *
   * @returns {Logger} A Logger instance
   */
  emerg(message, ...args) {
    this.#out(this.format(message, args), 'emerg', 'red.bold', false)
    return this
  }
}

module.exports = Logger
