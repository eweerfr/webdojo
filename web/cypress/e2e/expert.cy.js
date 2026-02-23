import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os atributos de elementos', () => {
        cy.get('#email').invoke('val', 'papito@teste.com')
        cy.get('#password').invoke('attr', 'type', 'text')
            .type('senha123')

        cy.contains('button', 'Entrar')
            .invoke('hide')
    })

    it('Não deve logar com senha inválida', () => {
        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('1231231{Enter}')

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    })

    it('Simulando a tecla TAB com cy.press()', () => {
        cy.get('body').press('Tab')
        cy.get('#email').should('have.focus')

        cy.get('#email').press('Tab')
        cy.get('#password').should('have.focus')
    })

    it.only('Deve realizar uma carga de dados fake', () => {

        _.times(5, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            cy.log(name)
            cy.log(email)
            cy.log(password)
        })
    })
})