const express = require('express')
const routes = require('./routes')
const config = require('./config')

const app = express()
app.use(express.json())
app.use('/', routes)
app.get('/health', (req, res) => {
  res.status(200).send('OK')
})
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`${config.appName} running on port ${config.port}`)
  })
}

module.exports = app
