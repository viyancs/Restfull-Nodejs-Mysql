# Restfull-Nodejs-Mysql
restfull nodejs and mysql
- docker-compose.yml use for development -> dokcer-compose up to development environment
- deployment.yml use for deploying app to production server
- push local container to gcr.io , you can use another conainer registry like hub.docker.com
- use that image which succesfully pushed to be use in yaml configuration(deployment)

#access secret generator
kubectl create secret generic cloudsql-instance-credentials(name credentials that describe  in deployment.yaml) --from-file=credentials.json=lib/g-cloud/secret_file.json

# logs case show
kubectl logs restfull-nodejs-mysql-5d59d7cb69-6hfmc(pod name change every redeploy) cloud-sql-proxy(container name)
kubectl logs restfull-nodejs-mysql-5d59d7cb69-6hfmc cloud-sql-proxy(container name)

# deploy
1. login to cluster master example gcloud ... you can get the link in google cloud console -> connect in master cluster
2. kubectl apply -f deployment.yaml -> will assign job
3. job will execute automatically by kubernetes

#redeploy
1. docker tag viyancs/restfull-nodejs:latest asia.gcr.io/ca-sofiyani-test/viyancs/restfull-nodejs:1.1 -> increment version every update
2. docker push asia.gcr.io/ca-sofiyani-test/viyancs/restfull-nodejs:1.1(version)
3. change deployment.yaml for image that change to new version
    <pre>containers:
    - name: restfull-viyancs
      image: asia.gcr.io/ca-sofiyani-test/viyancs/restfull-nodejs:1.1(version)</pre>
4. login to cluster master
5. kubectl apply -f deployment.yaml ->reconfigure and execute job

{
    "status": "success",
    "data": {
        "key": "1h1kJA7zeOcYrQunD5cn+numenhB0eCFuBebT18vsCw="
    }
}
