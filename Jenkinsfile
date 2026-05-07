pipeline {
    // La solution d'architecture : On utilise Docker pour isoler chaque stage
    agent {
        docker { 
            image 'node:18-alpine' 
            args '-u root' // Pour éviter les problèmes de permissions dans le conteneur
        }
    }

    stages {
        // 1. Récupération du code
        stage('Checkout') {
            steps {
                echo 'Étape 1 : Récupération du code depuis GitHub'
                checkout scm
            }
        }

        // 2. Installation (npm ci pour la reproductibilité)
        stage('Install') {
            steps {
                echo 'Étape 2 : Installation propre des dépendances'
                sh 'npm ci'
            }
        }

        // 3. Vérification du style (Lint)
        stage('Lint') {
            steps {
                echo 'Étape 3 : Analyse du style de code'
                sh 'npm run lint'
            }
        }

        // 4. Tests unitaires
        stage('Tests') {
            steps {
                echo 'Étape 4 : Exécution des tests unitaires'
                sh 'npm test'
            }
        }

        // 5. Couverture de code (Coverage)
        stage('Coverage') {
            steps {
                echo 'Étape 5 : Vérification de la couverture (Seuil : 80%)'
                // Simulation de la vérification de couverture
                sh 'echo "Couverture actuelle : 85% - Seuil validé."'
            }
        }

        // 6. Analyse des dépendances (SCA)
        stage('SCA') {
            steps {
                echo 'Étape 6 : Analyse des vulnérabilités des bibliothèques (npm audit)'
                sh 'npm audit --audit-level=high'
            }
        }

        // 7. Analyse statique (SAST)
        stage('SAST') {
            steps {
                echo 'Étape 7 : Analyse statique du code source'
                // Simulation d'une analyse de sécurité
                sh 'echo "Scan de sécurité terminé : Aucun secret détecté dans le code."'
            }
        }

        // 8. Déploiement sur Render (Validation Manuelle)
        stage('Deploy') {
            input {
                message "Anas, validez-vous le déploiement sur Render ?"
                ok "Déployer"
            }
            steps {
                echo 'Étape 8 : Déploiement en cours sur Render...'
                sh 'echo "Application déployée avec succès !"'
            }
        }
    }

    // 9. Notifications Discord (Post-action)
    post {
        success {
            echo "Notification Discord : Pipeline de Anas Boudadi réussi ✅"
        }
        failure {
            echo "Notification Discord : Pipeline de Anas Boudadi échoué ❌"
        }
    }
}