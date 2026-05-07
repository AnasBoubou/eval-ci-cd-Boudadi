pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code...'
                checkout scm
            }
        }

        stage('Install') {
            steps {
                echo 'Installation...'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo 'Vérification du code...'
                sh 'npm run lint'
            }
        }

        stage('Tests') {
            steps {
                echo 'Exécution des tests...'
                sh 'npm test'
            }
        }
    }
}