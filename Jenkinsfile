pipeline {
    agent any
    
    // Vérification toutes les 5 minutes comme demandé dans le TP
    triggers { pollSCM('H/5 * * * *') }

    environment {
        // REMPLACE par ton pseudo Docker Hub
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
                    
                    # 1. Build
                    docker build -t $IMAGE_SERVER:${BUILD_NUMBER} ./backend
                    
                    # 2. Scan Trivy (Instruction Page 3 du TP)
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image $IMAGE_SERVER:${BUILD_NUMBER} > trivy_report_server.txt
                    
                    # 3. Push
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
                    
                    # 1. Build
                    docker build -t $IMAGE_CLIENT:${BUILD_NUMBER} ./frontend/voitures
                    
                    # 2. Scan Trivy
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image $IMAGE_CLIENT:${BUILD_NUMBER} > trivy_report_client.txt
                    
                    # 3. Push
                    docker push $IMAGE_CLIENT:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }

    post {
        always {
            // Nettoyage de la machine comme demandé (Page 3)
            // sh 'docker system prune -af || true'
            // Archivage des rapports Trivy pour les consulter dans Jenkins
            archiveArtifacts artifacts: '*.txt', allowEmptyArchive: true
        }
    }
}