Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('input[placeholder="Digite seu nome completo"]')
        .type(form.name)

    cy.get('#email')
        .type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.fone)

    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)

    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')
    }

    if (form.personType === 'cpf') {
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
        //.should('be.value', '369.911.200-49')
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
        //.should('be.value', '369.911.200-49')
    }

    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)
        .should('be.text', form.description)

    form.techs.forEach((tech) => {
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


    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    //     .should('be.visible')

})