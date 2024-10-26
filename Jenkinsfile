pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/kwadwoaddo/banking-app-ci-cd.git', credentialsId: 'github'
            }
        }
        // Other stages (e.g., Build, Test, Deploy) go here
    }
}
