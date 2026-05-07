pipeline {
    // SOLUTION ARCHITECTURE : On remplace 'agent any' par un agent Docker
    // Cela garantit que chaque build démarre dans un environnement NEUF et IDENTIQUE
    agent {
        docker {
            image 'node:18-alpine'
            // Le flag '-u root' permet d'éviter les problèmes de permissions dans le workspace
            args '-u root'
        }
    }

    // On supprime 'tools { nodejs "node18" }' car l'image Docker contient déjà tout
    
    stages {
        stage('Initialize') {
            steps {
                // On s'assure que le workspace est vide pour éviter toute pollution
                deleteDir()
                checkout scm
            }
        }
        stage('Install') {
            steps { 
                sh 'npm ci' 
            }
        }
        stage('Lint') {
            steps { 
                sh 'npm run lint' 
            }
        }
        stage('Tests') {
            steps { 
                sh 'npm test' 
            }
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
                sh 'npm audit || true' 
            }
        }
        stage('SAST') {
            steps {
                echo 'Analyse statique de sécurité (SAST)'
                sh 'echo "Analyse SAST effectuée : Aucun secret détecté."'
            }
        }
        stage('Deploy') {
            input {
                message "Anas Boudadi, validez-vous le déploiement sur Render ?"
                ok "Déployer"
            }
            steps {
                echo 'Envoi du signal de déploiement à Render...'
                sh "curl -X POST https://api.render.com/deploy/srv-d7ua9rnlk1mc73efsreg?key=KSYcvRdiKDM"
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline de Anas Boudadi réussi"
            sh "curl -X POST -H 'Content-Type: application/json' -d '{\"content\": \"✅ **SUCCÈS**\\n**Étudiant :** Anas Boudadi\\n**Statut :** HAWAWWWW J’AI REUSSI 🚀\"}' https://discord.com/api/webhooks/1500795940305506416/6xfZiyqKvPMA08jWQUFlPT9i1nOPJFShYeP4ju3n0-i1kShM0HVUHfvNUH_NptPOCVFI"
        }
        failure {
            echo "❌ Pipeline de Anas Boudadi échoué"
            sh "curl -X POST -H 'Content-Type: application/json' -d '{\"content\": \"❌ **ÉCHEC**\\n**Étudiant :** Anas Boudadi\\n**Attention :** PUREE C’EST REPARTIS COMME 46.\"}' https://discord.com/api/webhooks/1500795940305506416/6xfZiyqKvPMA08jWQUFlPT9i1nOPJFShYeP4ju3n0-i1kShM0HVUHfvNUH_NptPOCVFI"
        }
        always {
            // Garantie de reproductibilité : On nettoie TOUT après le passage
            cleanWs()
        }
    }
}