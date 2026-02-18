const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient')
const { Prisma } = require('@prisma/client')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format' })
  }
  next()
})


//MÉTODOS GET
//Teste API online
app.get('/', (req, res) => {
  res.json({ message: 'API do curso do Ninja do Cypress!!' })
})

//Lista users GET
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true
      }
    })

    //200 OK sucesso
    return res.status(200).json(users)

    //500 erro interno do server
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})


//Busca por id GET
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    //404 Not Found
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    //else, 200 OK sucesso
    return res.status(200).json(user)

    //500 Erro interno de server
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

//MÉTODO PUT
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  if (!name) {
    return res.status(400).json({
      error: 'Name is required'
    })
  }

  if (!email) {
    return res.status(400).json({
      error: 'Email is required'
    })
  }

  if (!password) {
    return res.status(400).json({
      error: 'Password is required'
    })
  }

  try {

    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name, email, password
      }
    })

    res.status(204).end()   //tudo certo
  } catch (error) {
    res.status(500).json({ error: 'Error updating user :(' })
  }
})

// MÉTODO POST
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      })
    }

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      })
    }

    if (!password) {
      return res.status(400).json({
        error: 'Password is required'
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return res.status(201).json({
      message: 'User successfully registered',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {

    // Prisma error: unique constraint violation
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Email already exists'
      })
    }

    console.error(error)

    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})


//MÉTODO DELETE
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })
    return res.status(204).end()    //204 NO CONTENT - DELETOUU 🥳!!!
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })     //500 ERRO INTERNO
  }
})


//LIGADO E FUNCIONANDO!
app.listen(port, () => {
  console.log(`API Listening on port ${port}`)
})
