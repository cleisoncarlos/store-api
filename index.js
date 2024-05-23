import express from 'express'
import cors from 'cors'
import winston from 'winston'

import clientsRouter from './routes/client.route.js'
import productsRouter from './routes/product.route.js'
import salesRouter from './routes/sale.router.js'
import suppliersRouter from './routes/supplier.route.js'



const {combine, timestamp, label, printf } = winston.format

const myFormat = printf(({level, message, label, timestamp})=> {
    return `${timestamp} [${label}] ${level}: ${message}`
})

global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new(winston.transports.Console)(),
        new (winston.transports.File)({filename: 'logs/logs.log' })
    ],
    format: combine(
        label({label: 'store-api'}),
        timestamp(),
        myFormat
    )
})


const app = express()
app.use(express.json())
app.use(cors())


// rotas=========================
app.use('/client', clientsRouter)
app.use('/product', productsRouter)
app.use('/sale', salesRouter)
app.use('/supplier', suppliersRouter)

// middleware de erros para salvar no logger
app.use((err, req, res, next) => {
    logger.error(`Erro: ${req.method} ${err.baseUrl} - ${err.message}`)
    res.status(400).send({error: err.message})
})



app.listen(3000, () => {
   // console.log('rodando na porta 3000!')
   logger.info('API Started!')
})