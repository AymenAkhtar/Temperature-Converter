pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/AymenAkhtar/Temperature-Converter.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
    }
    
    post {
        success {
            echo '✅ Temperature Converter - Build and tests successful!'
        }
        failure {
            echo '❌ Temperature Converter - Build failed or tests failed!'
        }
    }
}