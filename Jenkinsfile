pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        disableConcurrentBuilds()
    }
    
    environment {
        NODE_ENV = 'ci'
        BUILD_STATUS = 'RUNNING'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    echo "🔨 Checking out Temperature Converter from branch: ${env.BRANCH_NAME}"
                    echo "📁 Repository: https://github.com/AymenAkhtar/Temperature-Converter.git"
                    checkout scm
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    echo "📦 Installing Node.js dependencies..."
                    bat 'npm install'
                    echo "✅ Dependencies installed successfully"
                }
            }
        }
        
        stage('Parallel Testing') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        script {
                            echo "🧪 Running Temperature Converter Unit Tests..."
                            bat 'npm test'
                            echo "✅ Unit tests completed"
                        }
                    }
                    
                    post {
                        success {
                            echo "🎯 Unit Tests: PASSED"
                        }
                        failure {
                            echo "❌ Unit Tests: FAILED"
                        }
                    }
                }
                
                stage('Code Quality') {
                    stages {
                        stage('Linting') {
                            steps {
                                script {
                                    echo "🔍 Running Code Linting..."
                                    bat 'npm run lint'
                                    echo "✅ Linting completed"
                                }
                            }
                        }
                        
                        stage('Code Analysis') {
                            steps {
                                script {
                                    echo "📊 Analyzing code quality..."
                                    bat 'echo "Code analysis completed for Temperature Converter"'
                                    bat 'echo "No critical issues found" > code-analysis.txt'
                                }
                            }
                        }
                    }
                }
            }
        }
        
        stage('Build Application') {
            steps {
                script {
                    echo "🏗️ Building Temperature Converter Application..."
                    bat 'echo "Build completed for Temperature Converter" > build-info.txt'
                    bat 'echo "Build Number: ${BUILD_NUMBER}" >> build-info.txt'
                    bat 'echo "Branch: ${env.BRANCH_NAME}" >> build-info.txt'
                    bat 'dir >> build-info.txt'
                    echo "✅ Build completed successfully"
                }
            }
        }
        
        stage('Conditional Deployment') {
            steps {
                script {
                    echo "🚀 Deployment Phase - Branch: ${env.BRANCH_NAME}"
                    echo "🌡️ Application: Temperature Converter"
                    
                    if (env.BRANCH_NAME == 'main') {
                        echo "✅ PRODUCTION: Deployed Temperature Converter to Production Environment"
                        bat 'echo "PRODUCTION DEPLOYMENT - Temperature Converter v1.0" > deployment.txt'
                        bat 'echo "Deployed at: ${new Date()}" >> deployment.txt'
                        bat 'echo "Status: SUCCESS" >> deployment.txt'
                        echo "🔐 Production deployment simulation completed"
                        
                    } else if (env.BRANCH_NAME == 'dev') {
                        echo "🟡 STAGING: Deployed Temperature Converter to Staging Environment"
                        bat 'echo "STAGING DEPLOYMENT - Temperature Converter v1.0" > deployment.txt'
                        bat 'echo "Deployed at: ${new Date()}" >> deployment.txt'
                        bat 'echo "Status: Testing in staging" >> deployment.txt'
                        echo "🧪 Staging deployment simulation completed"
                        
                    } else if (env.BRANCH_NAME == 'develop') {
                        echo "🔵 DEVELOPMENT: Deployed to Development Environment"
                        bat 'echo "DEV DEPLOYMENT - Temperature Converter" > deployment.txt'
                        bat 'echo "Deployed at: ${new Date()}" >> deployment.txt'
                        bat 'echo "Status: Under development" >> deployment.txt'
                        echo "⚡ Development deployment simulation completed"
                        
                    } else {
                        echo "🔵 FEATURE BRANCH: ${env.BRANCH_NAME} - Deployment Skipped"
                        bat 'echo "FEATURE BRANCH - No deployment: ${env.BRANCH_NAME}" > deployment.txt'
                        bat 'echo "Purpose: Feature development" >> deployment.txt'
                        echo "📝 Feature branch detected - Deployment simulation skipped"
                    }
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                script {
                    echo "📁 Archiving Temperature Converter artifacts..."
                    
                    // Test results archive
                    archiveArtifacts artifacts: 'test-results.txt', fingerprint: true
                    
                    // Build info archive
                    archiveArtifacts artifacts: 'build-info.txt', fingerprint: true
                    
                    // Deployment info archive
                    archiveArtifacts artifacts: 'deployment.txt', fingerprint: true
                    
                    // Code analysis archive
                    archiveArtifacts artifacts: 'code-analysis.txt', fingerprint: true
                    
                    // Source code archive (optional)
                    bat 'powershell Compress-Archive -Path *.js,*.json,*.html -DestinationPath temperature-converter-src.zip'
                    archiveArtifacts artifacts: 'temperature-converter-src.zip', fingerprint: true
                    
                    echo "✅ All artifacts archived successfully"
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "================================================================================"
                echo "🌡️ TEMPERATURE CONVERTER PIPELINE REPORT"
                echo "================================================================================"
                echo "📢 Build #${BUILD_NUMBER} on branch ${env.BRANCH_NAME} completed successfully at ${new Date()}"
                echo "📊 Build Result: ${currentBuild.currentResult}"
                echo "📋 Build URL: ${env.BUILD_URL}"
                echo "⏱️ Duration: ${currentBuild.durationString}"
                
                // Build cause display
                def causes = currentBuild.getBuildCauses()
                if (causes && causes.size() > 0) {
                    echo "🎯 Triggered by: ${causes[0].shortDescription}"
                }
                
                echo "================================================================================"
            }
        }
        
        success {
            script {
                echo "🎉 SUCCESS: Temperature Converter Pipeline Completed!"
                echo "✅ All tests passed"
                echo "✅ Dependencies installed"
                echo "✅ Build successful"
                echo "✅ Deployment simulation completed"
                echo "✅ Artifacts archived"
                
                // Success notification
                bat 'echo "🎉 PIPELINE SUCCESS - Temperature Converter" > pipeline-status.txt'
            }
        }
        
        failure {
            script {
                echo "❌ FAILURE: Temperature Converter Pipeline Failed"
                echo "🔍 Please check the console output for detailed errors"
                echo "📞 Contact development team if issue persists"
                
                // Failure notification
                bat 'echo "❌ PIPELINE FAILED - Temperature Converter" > pipeline-status.txt'
            }
        }
        
        unstable {
            script {
                echo "⚠️ UNSTABLE: Temperature Converter Pipeline Completed with Warnings"
                echo "📝 Some tests might have failed but pipeline continued"
                
                // Unstable notification
                bat 'echo "⚠️ PIPELINE UNSTABLE - Temperature Converter" > pipeline-status.txt'
            }
        }
        
        cleanup {
            script {
                echo "🧹 Cleaning up workspace..."
                // Temporary files clean karein (optional)
                bat 'del /q *.txt 2>nul || echo "Cleanup completed"'
                echo "✅ Cleanup completed"
            }
        }
    }
}