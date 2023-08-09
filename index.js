// Ejercicio 1: crear servidor HTTP con Node
const http = require('node:http')
const fs = require('node:fs')

function error404 (res) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
  return res.end('<h1>404</h1>')
}

function error405 (res) {
  res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
  return res.end('<h1>405</h1>')
}

function startServer () {
  const PORT = process.env.PORT ?? 1234

  const processRequest = (req, res) => {
    const { method, url } = req
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    switch (url) {
      case '/':
        switch (method) {
          case 'GET':
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            return res.end('<h1>¡Hola mundo!</h1>')
          default:
            return error405(res)
        }
      case '/logo.webp':
        switch (method) {
          case 'GET':
            res.setHeader('Content-Type', 'image/webp')
            return res.end(fs.readFileSync('./assets/logo.webp'))
          default:
            return error405(res)
        }
      case '/contacto': {
        // switch (method) {
        //   case 'POST': {
        //   }
        // }
        if (method === 'POST') {
          let body = ''

          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify(data))
          })
        } else {
          return error405(res)
        }
        break
      }
      default:
        return error404(res)
    }
  }

  const server = http.createServer(processRequest)

  server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

  return server
}

module.exports = {
  startServer
}
