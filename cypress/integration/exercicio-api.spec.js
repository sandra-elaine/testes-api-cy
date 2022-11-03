/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
var faker = require('faker');

describe('Testes da Funcionalidade Usuários', () => {

     let token
     before(() => {
          cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          //TODO: 
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          //TODO:
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(20)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          //TODO:
          let email = faker.internet.email()
          cy.cadastrarUsuario("Fulano da Silva", email, "teste", "true")
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
                    expect(response.duration).to.be.lessThan(80)
               })
     });

     it('Deve validar um usuário com email inválido', () => {
          //TODO:
          cy.cadastrarUsuario('Fulano da Silva', '1234a@fulano', 'teste', 'true')
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.duration).to.be.lessThan(15)
               })
     });

     it('Deve validar um usuário com email repetido', () => {
          //TODO:
          cy.cadastrarUsuario('Fulano da Silva', 'fulano@qa.com', 'teste', 'true')
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.duration).to.be.lessThan(10)
                    expect(response.body.message).to.equal('Este email já está sendo usado')
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          //TODO:
          let email = faker.internet.email()
          cy.cadastrarUsuario("Fulano da Silva", email, "teste", "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         headers: { authorization: token },
                         body:
                         {
                              "nome": "Fulano Marcos da Silva",
                              "email": email,
                              "password": "teste",
                              "administrador": "true"
                         }
                    }).then(response => {
                         expect(response.status).to.equal(200)
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                         expect(response.duration).to.be.lessThan(20)
                    })
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          //TODO:
          let email = faker.internet.email()
          cy.cadastrarUsuario("Fulano da Silva", email, "teste", "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,
                         headers: { authorization: token }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                    })
               })
     });
});
