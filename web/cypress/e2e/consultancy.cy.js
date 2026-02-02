import consultancyData from '../fixtures/consultancy.json'

describe('Formulário de Consultoria', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {

        const consultancyForm = consultancyData.personal

        cy.get('input[placeholder="Digite seu nome completo"]')
            .type(consultancyForm.name)

        cy.get('#email')
            .type(consultancyForm.email)

        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(consultancyForm.fone)
        //.should('have.value', '(11) 98989-9090')

        //localizar como fosse XPath
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)

        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'CPF')
                .parent()
                .find('input')
                .type(consultancyForm.document)
            //.should('be.value', '369.911.200-49')
        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'CNPJ')
                .parent()
                .find('input')
                .type(consultancyForm.document)
            //.should('be.value', '369.911.200-49')
        }

        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"')
            .selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)
            .should('be.text', consultancyForm.description)

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', 'WebDriverIO') //clica em excluir em uma tag para testes
            .find('button')
            .click()

        cy.contains('WebDriverIO')
            .should('not.exist')        //valida que nao existe mais


        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
                .should('be.checked')
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //     .should('be.visible')

    })

    it('Deve solicitar consultoria In Company', () => {

        const consultancyForm = consultancyData.company

        cy.get('input[placeholder="Digite seu nome completo"]')
            .type(consultancyForm.name)

        cy.get('#email')
            .type(consultancyForm.email)

        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(consultancyForm.fone)
        //.should('have.value', '(11) 98989-9090')

        //localizar como fosse XPath
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)

        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'CPF')
                .parent()
                .find('input')
                .type(consultancyForm.document)
            //.should('be.value', '369.911.200-49')
        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'CNPJ')
                .parent()
                .find('input')
                .type(consultancyForm.document)
            //.should('be.value', '369.911.200-49')
        }

        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"')
            .selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)
            .should('be.text', consultancyForm.description)

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', 'WebDriverIO') //clica em excluir em uma tag para testes
            .find('button')
            .click()

        cy.contains('WebDriverIO')
            .should('not.exist')        //valida que nao existe mais


        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
                .should('be.checked')
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //     .should('be.visible')

    })


    it('Deve verificar os campos obrigatórios', () => {
        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('label', 'Nome Completo')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
    })
})

