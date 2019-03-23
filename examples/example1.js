const logger = require("../index").LoggerFactory.getLogger("example1", 'purple')
logger.config(true) // Logger#config(debug = false)
logger.debug("I'm debug man")
logger.info("Hello world!")
logger.info(`M
u
l
t
i
l
i
n
e`)