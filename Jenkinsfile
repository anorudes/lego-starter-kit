node('master') {

    currentBuild.result = "SUCCESS"

    try {

        stage('Checkout') {
            checkout scm
        }

        stage('Install Deps') {
            env.NODE_ENV = "development"
            print 'Environment will be: ${env.NODE_ENV}'

            sh 'node -v'
            sh 'yarn clean'
            sh 'yarn install'
        }

        stage('Build Project') {
            env.NODE_ENV = 'production'
            print 'Environment will be: ${env.NODE_ENV}'

            sh 'yarn run build'
            sh 'cd ./build'
            sh 'yarn install'
            sh 'cd ..'
        }

        docker.withRegistry('https://polygon.mgbeta.ru:5000/', 'docker-registry') {
            stage('Build Image') {
                def image = docker.build('mgbeta/lsk-example:${env.BUILD_NUMBER}')
                image.push()
            }

            stage('Test Image') {
                print 'Here, testing the image'
            }

            stage('Approve Image') {
                image.push('latest')
            }
        }

        stage 'Cleanup' {
            sh 'yarn clean'
            sh 'rm -rf node_modules build'

            mail body: 'project build successful',
                from: 'ci@mgbeta.ru',
                subject: 'project build successful',
                to: 'obt195@gmail.com'
        }

    } catch (err) {

        currentBuild.result = "FAILURE"
        sh 'rm -rf node_modules build'
        mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'ci@mgbeta.ru',
            subject: 'project build failed',
            to: 'obt195@gmail.com'

        throw err
    }

}