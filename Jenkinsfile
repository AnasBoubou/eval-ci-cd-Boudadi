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

        stage('Tests') {
            steps {
                echo 'Étape 4 : Exécution des tests unitaires'
                sh 'npm test'
            }
        }

        stage('Coverage') {
            steps {
                echo 'Étape 5 : Vérification de la couverture de code'
                sh 'npm test -- --coverage --coverageThreshold=\'{"global":{"lines":80,"functions":80,"branches":80}}\''
            }
        }

        stage('SCA') {
            steps {
                echo 'Étape 6 : Analyse de composition logicielle'
                sh 'npm audit --audit-level=high || true'
            }
        }

        // Réponse architecture : deleteDir() + checkout scm garantit
        // que le SAST analyse uniquement le code source versionné,
        // sans aucun fichier généré par les stages précédents
        // (coverage, node_modules instrumentés, rapports de tests...)
        stage('SAST') {
            steps {
                echo 'Étape 7 : Analyse statique du code source'
                deleteDir()
                checkout scm
                sh 'npx semgrep --config=auto --error || true'
            }
        }

        stage('Deploy') {
            input {
                message "🚀 Valider le déploiement ?"
                ok "Déployer"
            }
            steps {
                echo 'Étape 8 : Déploiement validé manuellement ✅'
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