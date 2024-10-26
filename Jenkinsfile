pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub')  // DockerHub credentials ID
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/kwadwoaddo/banking-app-ci-cd.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("kwadwoaddo/auth-service:${env.BUILD_ID}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'DOCKER_CREDENTIALS') {
                        docker.image("kwadwoaddo/auth-service:${env.BUILD_ID}").push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f kubernetes/deployment.yaml'
                sh 'kubectl apply -f kubernetes/service.yaml'
            }
        }
    }
}
