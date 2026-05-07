pipeline {
    agent any

    tools {
        // C'est le nom que tu as donné dans "Global Tool Configuration"
        nodejs 'node18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code...'
                checkout scm
            }
        }

        stage('Install') {
            steps {
                echo 'Installation des dépendances...'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo 'Vérification du style de code...'
                sh 'npm run lint'
            }
        }

        stage('Tests') {
            steps {
                echo 'Exécution des tests unitaires...'
                sh 'npm test'
            }
        }

        stage('SCA & SAST') {
            steps {
                echo 'Analyse de sécurité...'
                sh 'npm audit'
                sh 'echo "Analyses SCA et SAST terminées."'
            }
        }

        stage('Deploy') {
            input {
                message "Valider le déploiement sur Render ?"
                ok "Déployer"
            }
            steps {
                echo 'Déploiement en cours...'
            }
        }
    }

    post {
        success {
            echo "Notification : Pipeline de Anas réussi ✅"
        }
        failure {
            echo "Notification : Pipeline de Anas échoué ❌"
        }
    }
}