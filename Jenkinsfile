pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub')  // DockerHub credentials ID
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    try {
                        // Pull code from your GitHub repository
                        git branch: 'main', url: 'https://github.com/kwadwoaddo/banking-app-ci-cd.git', credentialsId: 'github'
                    } catch (Exception e) {
                        error "Checkout Code stage failed: ${e.message}"
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        // Build the Docker image and tag it with the Jenkins build ID
                        docker.build("kwadwoaddo/auth-service:${env.BUILD_ID}")
                    } catch (Exception e) {
                        error "Build Docker Image stage failed: ${e.message}"
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    try {
                        // Log in to DockerHub and push the image
                        docker.withRegistry('', 'DOCKER_CREDENTIALS') {
                            docker.image("kwadwoaddo/auth-service:${env.BUILD_ID}").push()
                        }
                    } catch (Exception e) {
                        error "Push Docker Image stage failed: ${e.message}"
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    try {
                        // Deploy the Kubernetes configuration files
                        sh 'kubectl apply -f kubernetes/deployment.yaml'
                        sh 'kubectl apply -f kubernetes/service.yaml'
                    } catch (Exception e) {
                        error "Deploy to Kubernetes stage failed: ${e.message}"
                    }
                }
            }
        }
    }
}
