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
        stage('Build Docker Image - Auth Service') {  // Unique stage name
            steps {
                script {
                    docker.build("kwadwoaddo/auth-service:${env.BUILD_ID}", "-f docker/auth-service/Dockerfile .")
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
                script {
                    sh 'kubectl apply -f kubernetes/deployment.yaml'
                    sh 'kubectl apply -f kubernetes/service.yaml'
                }
            }
        }
    }
}
