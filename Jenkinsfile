pipeline {
    agent any
    
    triggers { pollSCM('H/5 * * * *') }

    environment {
        IMAGE_SERVER = 'medriadh01/exam-devops-backend'
        IMAGE_CLIENT = 'medriadh01/exam-devops-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build + Scan SERVER') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh '''
                    echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                    
                    docker build -t $IMAGE_SERVER:${BUILD_NUMBER} ./backend
                    
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image $IMAGE_SERVER:${BUILD_NUMBER} > trivy_report_server.txt
                    
                    docker push $IMAGE_SERVER:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Build + Scan CLIENT') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh '''
                    echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                    
                    docker build -t $IMAGE_CLIENT:${BUILD_NUMBER} ./frontend/voitures
                    
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image $IMAGE_CLIENT:${BUILD_NUMBER} > trivy_report_client.txt
                    
                    docker push $IMAGE_CLIENT:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }

    post {
        always {
            // sh 'docker system prune -af || true'
            archiveArtifacts artifacts: '*.txt', allowEmptyArchive: true
        }
    }
}