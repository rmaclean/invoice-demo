import express from 'express'
import { engine } from 'express-handlebars'
import { configureHomeRoute } from './routes/home.js'
import { configureAPIRoute } from './routes/invoiceAPI.js'

const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

configureHomeRoute(app)
configureAPIRoute(app)

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
})