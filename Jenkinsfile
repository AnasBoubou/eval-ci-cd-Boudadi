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
}