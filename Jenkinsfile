pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du cooode...'
                checkout scm
            }
        }
    }

    stages {
        stage('Install')
        steps{
            echo 'Execution du npm ci'
            sh 'npm ci'

        }
        
    }
    stage('Lint') {
            steps {
                echo 'Vérification du Lint...'
                sh 'npm run lint'
            }
        }

       
    stage('Tests') {
        steps {
            echo 'Exécution des tests unitaires...'
            sh 'npm test'
        }
    }
 }
