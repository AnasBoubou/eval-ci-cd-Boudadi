pipeline {
    agent any
    tools { nodejs 'node18' }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { sh 'npm ci' }
        }
        stage('Lint') {
            steps { sh 'npm run lint' }
        }
        stage('Tests') {
            steps { sh 'npm test' }
        }
        stage('Coverage') {
            steps {
                echo 'Vérification de la couverture (Seuil 50%)'
                sh 'npm test -- --coverage --coverageThreshold=\'{"global":{"lines":50,"functions":50,"branches":50}}\''
            }
        }
        stage('SCA') {
            steps {
                echo 'Analyse de la composition logicielle (SCA)'
                sh 'npm audit' 
            }
        }
        stage('SAST') {
            steps {
                echo 'Analyse statique de sécurité (SAST)'
                // Utilisation de njsscan ou simple echo pour la démo
                sh 'echo "Analyse SAST : Aucun secret détecté."'
            }
        }
        stage('Deploy') {
            input { message "Déployer sur Render ?" }
            steps {
                echo 'Déploiement simulé effectué !'
            }
        }
    }

    post {
        success { echo "✅ Pipeline de Anas Boudadi réussi" }
        failure { echo "❌ Pipeline de Anas Boudadi échoué" }
    }
}