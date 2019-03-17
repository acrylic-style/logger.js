# logger.js
its like log4js but it can't configurable.

## Installing
You can install by executing this command: `npm i acrylic-style/logger.js` or `yarn add acrylic-style/logger.js`
 
## Examples

```js
const logger = require("logger.js").getLogger("logger-name", color) // also see Available colors section
logger.config(true) // Logger#config(debug = false)
logger.debug("I'm debug man")
logger.info("Hello world!")
```

```js
const logger = require("logger.js").getLogger("no-debug", "purple")
logger.debug("I'm invisible!")
logger.info("Hello world!")
```

### Available Logging Levels
 - emerg - Use on going system is unusable(e.g. uncaughtException), unrecoverable error.
 - fatal - Fatal Error, may need action immediately
 - error - Error condition
 - warn - Warning condition
 - info - Outputs info level message.
 - debug(only available if debugging is true) - Just debug message
 
### Available colors
 - yellow
 - darkgray
 - red
 - lightred
 - green
 - lightpurple
 - white
 - cyan
 - purple
 - blue
 
