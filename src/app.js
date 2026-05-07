const express = require('express')
const routes = require('./routes')
const config = require('./config')

const app = express()

// AJOUT DE LA ROUTE HEALTH CHECK (OBLIGATOIRE POUR TON SUJET)
app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

app.use(express.json())
app.use('/', routes)

if (require.main === module) {
  // PRIORITÉ À LA VARIABLE D'ENVIRONNEMENT RENDER
  // Render injecte "PORT", si elle n'existe pas on prend celle de config.js
  const PORT = process.env.PORT || config.port || 10000

  // TRÈS IMPORTANT : Écouter sur '0.0.0.0' pour Docker
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`${config.appName} running on port ${PORT}`)
  })
}

module.exports = app