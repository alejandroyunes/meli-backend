import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv';
import getProducts from "./api/getProducts/getProducts";

import * as middlewares from './middlewares'
import api from './api'
import MessageResponse from './interfaces/MessageResponse'
import getProductById from './api/getProductById';

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: 'POST',
};

app.use(cors(corsOptions));

dotenv.config()

app.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: '👋🌎🌍🌏✨',
  })
})

app.post('/contacto', async (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }
})

app.use('/api/v1', api)

app.get('/api/items', getProducts);
app.get("/api/items/:id", getProductById);

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
