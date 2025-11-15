pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        disableConcurrentBuilds()
    }
    
    environment {
        NODE_ENV = 'ci'
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
                            
                            // TEST RESULTS FILE CREATE KAREIN
                            bat 'echo "Unit Tests - PASSED" > test-results.txt'
                            bat 'echo "Branch: ${env.BRANCH_NAME}" >> test-results.txt'
                            bat 'echo "Build: ${BUILD_NUMBER}" >> test-results.txt'
                            bat 'echo "Timestamp: ${new Date()}" >> test-results.txt'
                            
                            echo "✅ Unit tests completed"
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
                    
                    // Test results archive - ABHI FILE EXIST KAREGI
                    archiveArtifacts artifacts: 'test-results.txt', fingerprint: true
                    
                    // Build info archive
                    archiveArtifacts artifacts: 'build-info.txt', fingerprint: true
                    
                    // Deployment info archive
                    archiveArtifacts artifacts: 'deployment.txt', fingerprint: true
                    
                    // Package.json archive
                    archiveArtifacts artifacts: 'package.json', fingerprint: true
                    
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
                echo "📢 Build #${BUILD_NUMBER} on branch ${env.BRANCH_NAME} completed at ${new Date()}"
                echo "📊 Build Result: ${currentBuild.currentResult}"
                echo "📋 Build URL: ${env.BUILD_URL}"
                
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
            }
        }
        
        failure {
            script {
                echo "❌ FAILURE: Temperature Converter Pipeline Failed"
                echo "🔍 Please check the console output for detailed errors"
            }
        }
        
        cleanup {
            script {
                echo "🧹 Cleaning up workspace..."
                // Cleanup optional - comment out if you want to keep files
                // bat 'del /q *.txt 2>nul || echo "Cleanup completed"'
                echo "✅ Pipeline completed"
            }
        }
    }
}
