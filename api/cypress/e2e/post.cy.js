
describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Wolverine',
      email: 'logan@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.post(user)
      .then((response) => {
        expect(response.status).to.eq(201)

        expect(response.body.user.id).to.match(/^-?\d+$/)
        expect(response.body.message).to.eq('User successfully registered')
        expect(response.body.user.name).to.eq(user.name)
        expect(response.body.user.email).to.eq(user.email)
      })
  })

  it('Não deve cadastrar email duplicado', () => {
    const user = {
      name: 'Ciclops',
      email: 'scott@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.post(user)
      .then((response) => {
        expect(response.status).to.eq(201)

        return cy.post(user)
      })
      .then((response) => {
        expect(response.status).to.eq(409)
        expect(response.body.error).to.eq('Email already exists')
      })
  })

  it('O campo name deve ser obrigatório', () => {

    const user = {
      email: 'storm@xmen.com',
      password: 'pwd123'
    }

    cy.post(user)
      .then((response) => {
        expect(response.status).to.eq(400)

        expect(response.body.error).to.eq('Name is required')
      })
  })

  it('O campo email deve ser obrigatório', () => {

    const user = {
      name: 'Jean grey',
      password: 'pwd123'
    }

    cy.post(user)
      .then((response) => {
        expect(response.status).to.eq(400)

        expect(response.body.error).to.eq('Email is required')
      })
  })

  it('O campo senha deve ser obrigatório', () => {

    const user = {
      name: 'Xavier',
      email: 'xavier@xmen.com'
    }

    cy.post(user)
      .then((response) => {
        expect(response.status).to.eq(400)

        expect(response.body.error).to.eq('Password is required')
      })
  })

  it('JSON mal formatado não deve passar', () => {

    const user = `{
      name: 'Magneto',
      email: 'erik@xmen.com'
      password: 'pwd123'
    }`

    cy.post(user)
      .then((response) => {
        expect(response.status).to.eq(400)

        expect(response.body.error).to.eq('Invalid JSON format')
      })
  })
})

