`docker pull IMAGE_NAME`
to pull the docker image to your local system.

`docker images`
list of all the docker images in your local system.

`docker run IMAGE_NAME` | `docker pull IMAGE_NAME`
to build a container from image, and runs it 

`docker run -it IMAGE_NAME`
to run a docker container interactively, in which we can input and output anything.

---
`docker ps -a`
to check all the container in the docker, all existing containers.

`docker ps`
to check the current running container, which is active.

---
`docker start CONTAINER_NAME or CONTAINER_ID`  &
`docker stop CONTAINER_NAME or CONTAINER_ID`

to start or stop a container, these are the commands

the difference between the `run` and `start` command is that, for run command it installs the container through image and runs it while the `start` or `stop` command only starts an existing container.

---

`docker rmi IMAGE_NAME` and `docker rm CONTAINER_NAME`

to delete and remove and image or a container we use the `rm` or `rmi` command, with the `CONTAINER_NAME` and  `IMAGE_NAME`

NOTE: to remove an image we need to remove the container that is created using the image, then only we can remove the image.

---

`docker pull IMAGE_NAME:Version_number`

to pull a version of an image, we use the above command.
if we just run with the image name we will  usually get the latest version of the image, but by using this version number we can pull a specific version of the image.

PS. there are often layers present in an image. which will be pulled separately,

---

we can detach a container and run, which will leave the container running in the background, 
by default the container keep running in an attached way,
so to run the container in the detached way the command is 

`docker run -d IMAGE_NAME`

`-d` is for detached 

---

to change the name of the container from the image we can use the command

`docker run --name CONTAINER_NAME -d IMAGE_NAME`

---

`docker run -p 8080:3000 my-app

this is for Docker port binding, from local port to container port.

![[Pasted image 20250509172950.png]]

---

there are certain troubleshoot commands in docker for checking the errors

for checking container logs
`docker logs CONTAINER_ID`

run additional commands on already running container, and in interactive mode we can access the container, 
for that we use this command
`docker exec -it CONTAINER_ID /bin/bash`

it is not necessary that every container contains bash commands do in that case we use this command 
`docker exec -it CONTAINER_ID /bin/sh`

----

for running "docker compose" or `.yaml` files the commands

`docker compose -f FILE_NAME.yaml up -d`
`docker compose -f FILE_NAMW.yaml down`

`up` means "we will create and start the containers in detached mode"
`down` means "to delete and remove the container we choose the down option"

---

for Dockerising our application in docker file

`from` : the base image we define it with this instruction 
`workdir` : we define our working directory, 
`copy` : from host to our image we copy our files, 
`run` : instruction we run inside out file, we can have multiple run commands
`cmd` : to run the image we will set that one command for the app to run.
`expose` : to expose the port of our image,
`env` : to decide the environment variable, 

---

