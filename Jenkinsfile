pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub')  // DockerHub credentials ID
    }
    stages {
        stage('Checkout Code') {
            steps {
                // Pull code from your GitHub repository
                git branch: 'main', url: 'https://github.com/kwadwoaddo/banking-app-ci-cd.git', credentialsId: 'github'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image and tag it with the Jenkins build ID
                    docker.build("kwadwoaddo/auth-service:${env.BUILD_ID}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to DockerHub and push the image
                    docker.withRegistry('', 'DOCKER_CREDENTIALS') {
                        docker.image("kwadwoaddo/auth-service:${env.BUILD_ID}").push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy the Kubernetes configuration files
                    sh 'kubectl apply -f kubernetes/deployment.yaml'
                    sh 'kubectl apply -f kubernetes/service.yaml'
                }
            }
        }
    }
}
