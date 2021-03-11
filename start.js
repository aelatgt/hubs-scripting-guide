/**
 * Serves static files in `src/` on port 1234 and exposes this publicly using ngrok
 */

const ngrok = require('ngrok')
const express = require('express')
const serveIndex = require('serve-index')
const cors = require('cors')
const app = express()
const root = 'src'
const port = 1234

app.use(cors())
app.use(express.static(root))
app.use('/', serveIndex(root))

app.listen(port, () => {
  ngrok.connect({ addr: port }).then((url) => {
    console.clear()
    console.log('Custom room scripts served at:\n')
    console.log(`> Local URL:\thttp://localhost:${port}/rooms`)
    console.log(`> Public URL:\t${url}/rooms`)
    console.log(
      '\nNavigate to a room script and paste its public URL in your Hubs room settings'
    )
  })
})
