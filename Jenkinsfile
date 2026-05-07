pipeline {
    agent any

    tools {
        // C'est ici que tu appelles le nom que tu as donné à l'étape 2
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
                echo 'Étape 2 : Installation npm ci'
                sh 'npm ci'
            }
        }
        stage('Lint') {
            steps {
                echo 'Étape 3 : Vérification du Lint'
                sh 'npm run lint'
            }
        }
        stage('Tests') {
            steps {
                echo 'Étape 4 : Tests unitaires'
                sh 'npm test'
            }
        }
        stage('SCA & SAST') {
            steps {
                echo 'Étape 5 : Sécurité'
                sh 'npm audit'
                sh 'echo "Scan statique terminé"'
            }
        }
        stage('Deploy') {
            input {
                message "Anas, validez-vous le déploiement ?"
            }
            steps {
                echo 'Étape 6 : Déploiement simulé sur Render'
            }
        }
    }
}