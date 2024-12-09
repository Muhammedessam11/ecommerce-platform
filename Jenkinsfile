pipeline {
    agent { label 'JenkinsSlave03' }
    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t ecommerce-backend .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ecommerce-frontend .'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}

