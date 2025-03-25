pipeline {
    agent any
    tools { nodejs 'nodeJS' }

    environment {
        AWS_REGION = 'eu-west-1'
        ECR_REPO = 'qr-code-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/godcandidate/qr-code-generator.git'
                
                script {
                    withCredentials([string(credentialsId: 'QR_ECR_ALIAS', variable: 'ECR_ALIAS')]) {
                        env.ECR_ALIAS = ECR_ALIAS  // Store the alias in an environment variable
                    }
                }
            }
        }

        stage('Install and Run Unit Tests') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run lint'  // Optional static code analysis
                    sh 'npm run test'  // Run tests before building the image
                }
            }
        }

                stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    sh '''
                    aws ecr-public get-login-password --region $AWS_REGION| docker login --username AWS --password-stdin $ECR_ALIAS
                    docker build -t $ECR_REPO:latest .
                    docker tag $ECR_REPO:latest public.ecr.aws/$ECR_ALIAS/$ECR_REPO:latest
                    '''
                }
            }
        }

        stage('Push Image to Public ECR') {
            steps {
                dir('frontend') {
                    sh '''
                    aws ecr-public get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin public.ecr.aws
                    docker push public.ecr.aws/$ECR_ALIAS/$ECR_REPO:latest
                    '''
                }
            }
        }
    } 
} 
