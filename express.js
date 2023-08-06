// Ejercicio 2: crear servidor HTTP con Express
const express = require('express')

function error404 (res) {
  return res.status(404).send('<h1>404</h1>')
}

function error405 (res) {
  return res.status(405).send('<h1>405</h1>')
}
const app = express()

function startServer () {
  app.use(express.static('assets'))
  app.use(express.json())

  app.all('/', (req, res) => {
    switch (req.method) {
      case 'GET':
        return res.send('<h1>¡Hola mundo!</h1>')
      default:
        error405(res)
    }
  })

  app.all('/logo.webp', (req, res) => {
    switch (req.method) {
      default:
        error405(res)
    }
  })

  app.all('/contacto', (req, res) => {
    switch (req.method) {
      case 'POST':
        return res.status(201).json(req.body)
      default:
        error405(res)
    }
  })

  app.use((req, res) => {
    return error404(res)
  })

  const PORT = process.env.PORT ?? 1234
  return app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

module.exports = {
  startServer
}
