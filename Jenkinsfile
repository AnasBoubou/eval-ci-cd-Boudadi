pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Étape 1 : Récupération du code'
                checkout scm
            }
        }

        stage('Install') {
            steps {
                echo 'Étape 2 : Installation des dépendances'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo 'Étape 3 : Vérification du style de code'
                sh 'npm run lint'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline de Anas réussi"
        }
        failure {
            echo "❌ Pipeline de Anas échoué"
        }
    }
}