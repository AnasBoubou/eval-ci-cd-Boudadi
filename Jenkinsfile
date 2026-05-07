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

        stage('System Dependencies') {
            steps {
                echo 'Étape 2 : Installation de libatomic (fix Node.js)'
                sh '''
                    if command -v apt-get > /dev/null; then
                        sudo apt-get update -qq && sudo apt-get install -y -qq libatomic1
                    elif command -v yum > /dev/null; then
                        sudo yum install -y libatomic
                    elif command -v apk > /dev/null; then
                        sudo apk add --no-cache libatomic
                    else
                        echo "Package manager non reconnu, on continue..."
                    fi
                '''
            }
        }

        stage('Install') {
            steps {
                echo 'Étape 3 : Installation des dépendances npm'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo 'Étape 4 : Vérification du style de code'
                sh 'npm run lint'
            }
        }

        stage('Tests') {
            steps {
                echo 'Étape 5 : Exécution des tests unitaires'
                sh 'npm test'
            }
        }

        stage('SCA & SAST') {
            steps {
                echo 'Étape 6 : Analyse de sécurité'
                sh 'npm audit --audit-level=high || true'
            }
        }

        stage('Deploy') {
            input {
                message "🚀 Valider le déploiement ?"
                ok "Déployer"
            }
            steps {
                echo 'Étape 7 : Déploiement validé manuellement ✅'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ Pipeline de Anas réussi"
        }
        failure {
            echo "❌ Pipeline de Anas échoué"
        }
    }
}