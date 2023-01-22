import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'; config()
import waitlist from './routes/waitlist.js'
import ping from './routes/ping.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/waitlist', waitlist)
app.use('/api/ping', ping)

app.listen(3000, () => {
    console.log('Server On')
}).setTimeout(300000)