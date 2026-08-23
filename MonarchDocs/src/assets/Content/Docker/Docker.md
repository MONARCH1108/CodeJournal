## Why do we need Docker?
Suppose we are building a Node.js application on a machine, and the project relies on a large number of dependencies. Since it's a massive project, setting it up properly requires all those dependencies to be correctly installed and configured.

Now, if another team member wants to contribute to the development of this project, they would also need the exact same environment and dependencies on their local machine to run and develop the application successfully.

This is where Docker becomes essential. Docker allows us to package the entire application—including all its dependencies, configurations, and environment settings—into a container. This ensures that the application runs consistently across different machines, eliminating the "it works on my machine" problem and simplifying development, testing, and deployment.

two important terms in docker,
1. Docker container
2. docker image

---
## Docker Container
A Docker container is a lightweight, standalone unit that packages an application along with all its dependencies, libraries, and configuration files. This ensures that the application runs consistently in any environment.

By using containers, we can easily replicate and share our project across different machines. For example, we can move a container from Machine A to Machine B without needing to manually install all the dependencies again. This makes collaboration easier and ensures that everyone on the team works with the exact same setup, eliminating the hassle of repeatedly configuring environments.

![[Pasted image 20250508190453.png]]

Properties associated with containers:
1. **Portable**:  
    Containers can be easily shared across different systems and users in the form of Docker images. This ensures that applications run the same way regardless of where they are deployed—be it a developer's laptop, a testing server, or a production environment.
    
2.  **Lightweight**:  
    Containers are minimal in size compared to virtual machines. They share the host OS kernel, which makes them faster to start and easier to create, update, and scale over time.
---
## Docker Image
![[Pasted image 20250508200701.png]]

- **Blueprint for Containers**:  
    A Docker image serves as a blueprint or template used to create Docker containers. It defines the application, its dependencies, and the environment configuration.
    
- **Shared Between Teammates**:  
    When collaborating on a project, we don’t share running containers. Instead, we share Docker images so that anyone can create consistent containers from the same source.
    
- **Containers Hold Resources, Not Images**:  
    Containers are runtime instances created from images. They contain the actual application, running processes, and resources—but not the image itself.
    
- **Static Snapshot**:  
    A Docker image is a static, read-only snapshot of what the container should look like. It captures the file system and environment at a specific point in time.
---

## Docker Image layers
![[Pasted image 20250509160133.png]]

- **Layered Architecture**:  
    A Docker image is made up of multiple read-only layers stacked on top of each other. These layers represent instructions from the Docker file (like installing packages or copying files). At the base of every image, there is typically a lightweight Linux-based layer (such as Alpine, Ubuntu, or Debian).
    
- **Immutability of Layers**:  
    All layers beneath the top layer are immutable—meaning they cannot be changed once created. You can only modify or add to the topmost writable layer, which is specific to the container created from the image.
    
- **Layer Names and Identity**:  
    The names (or IDs) of the lower layers cannot be changed. Only the top-level image tag (e.g., `myapp:latest`) can be renamed or versioned. These tags reference the entire image, including all underlying layers.
    
- **Shared Layers and Caching**:  
    If multiple containers are created from the same image or if similar image versions are running on a single machine, Docker will reuse existing layers to save space and time. In such cases, you may encounter a message like:  
    **"Layer already exists"**—indicating Docker has detected and is reusing an existing layer rather than downloading or rebuilding it.

----
## Port Binding

Each Docker container can have its own internal ports exposed for communication. However, these internal ports are isolated within the container by default.

To make a container accessible from the host machine or the outside world, **port binding** is used. This maps a specific port on the host to a port inside the container.

By default, containers do **not** automatically bind their internal ports to the host. You must explicitly define the port mapping using the `-p` or `--publish` flag when running a container

host machine port and container ports are not same, but we can bind them, 
bind the host port with container port.

---
## Docker Vs Virtual Machine
![[Pasted image 20250512153746.png]]

the fundamental difference between docker and VM
1. the docker only uses the Host OS kernel, and virtualizes the Application layer only, but for VM it virtualizes both the Host and Application layer, because Docker only virtualizes the application layer it has less over head resulting in being light in weight. 
2. VM are compatible with all underlying operating systems, because they virtualize both host kernel and application, and also uses host kernel, this is docker disadvantages, as it primarily built for linux systems. and because of the docker desktop app we are able to use in our windows and mac, 
3. Docker itself contain small linux based VM which helps us run our container, and in linux based systems docker runs and performs better.
---

## Docker compose 
nstead of running Docker commands in the terminal, we can put them in a single file called a `.yaml` file.
**Benefits:**
1. Whenever we run it, all the containers can be started at once without any problems.
2. If any changes are needed, we can make them directly in the YAML file.
3. It is easy to manage when running multiple containers.
4. proper indentation is important for proper `.yaml` file

---

## Dockerising our application

![[Pasted image 20250512165138.png]]

to dockerize our app, we will create a docker app, 
commands for docker app [[Commands]]
