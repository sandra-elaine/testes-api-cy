pipeline {
    agent any

    stages {
       stage('Clonar o Repositório') {
            steps {
               git branch: 'main', url: 'https://github.com/sandra-elaine/testes-api-cy.git'
            }
        }
        stage('Instalar Dependências') {
            steps {
                 sh 'npm install' 
                 sh 'npm audit fix'
            }
        }
        stage('Executar Testes') {
            steps {
                 sh 'NO_COLOR=1 npm run ci'  
            }
        }
    }
}
