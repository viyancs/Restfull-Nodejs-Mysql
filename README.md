# Restfull-Nodejs-Mysql-Kubernetes-Deployment-Cloud
<p>Simple Restfull application which have case user register and login, You can add more case whatever you want, authentication using Bearer TOKEN, use Nodejs,expressjs,mysql, Deployer using Kubernetes Google Cloud(GKE) ,connection mysql using sql cloud proxy</p>

# Foot Work
- docker-compose.yml use for development -> docker-compose up to development environment
- deployment.yml use for deploying app to production server
- push local container to gcr.io , you can use another container registry like hub.docker.com
- use that image which succesfully pushed to be use in yaml configuration(deployment)
- secret generator <pre>kubectl create secret generic cloudsql-instance-credentials(name credentials that describe  in deployment.yaml) --from-file=credentials.json=lib/g-cloud/secret_file.json</pre>

# Development way
- create .env inside root directory copy paste from .env-example file.
- Pointing DB_HOST config environment to docker service name `mysql-cloud` this name must same with service inside docker-compose mysql container. change later if You want to deploy to production using kubernetes deployment.yaml change with `127.0.0.1`
- <pre>docker-compse up --build</pre>
- or if you dont want to rebuild again & again <pre>docker-compose up </pre>
- access `http://localhost:8080/api/v1/users`

# logs case show
kubectl logs restfull-nodejs-mysql-5d59d7cb69-6hfmc(pod name change every redeploy) cloud-sql-proxy(container name)
kubectl logs restfull-nodejs-mysql-5d59d7cb69-6hfmc cloud-sql-proxy(container name)

# Assign Job into Cluster master
1. login to cluster master example gcloud ... you can get the link in google cloud console -> connect in master cluster
2. kubectl apply -f deployment.yaml -> will assign job
3. job will execute automatically by kubernetes(deploying)

# Production Way
1. <pre>docker tag viyancs/restfull-nodejs:latest asia.gcr.io/{project_id_google_cloud}/viyancs/restfull-nodejs:1.1</pre> -> increment version every update
2. <pre>docker push asia.gcr.io/{project_id_google_cloud}/viyancs/restfull-nodejs:1.1(version)</pre>
3. change deployment.yaml for image that change to new version
    <pre>containers:
    - name: restfull-viyancs
      image: asia.gcr.io/{project_id_google_cloud}/viyancs/restfull-nodejs:1.1(version)</pre>
4. login to cluster master
5. <pre>kubectl apply -f deployment.yaml</pre> ->reconfigure and execute job

# Api Documentations
====
https://documenter.getpostman.com/view/1305690/Szzn5wDS?version=latest
