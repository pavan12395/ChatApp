pipeline{
    agent any
    stages {
        stage('Build'){
            steps{
                sh 'docker build -t chat-app .'
            }
        }
        stage('Push to ECR'){
            withEnv(["AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY}","AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID}","AWS_DEFAULT_REGION=${env.AWS_DEFAULT_REGION}"]){
            steps{
                sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 464050172391.dkr.ecr.us-east-1.amazonaws.com'
                sh 'docker build -t images .'
                sh 'docker tag images:latest 464050172391.dkr.ecr.us-east-1.amazonaws.com/images:latest'
                sh 'docker push 464050172391.dkr.ecr.us-east-1.amazonaws.com/images:latest'
            }
        }}
    }
}
