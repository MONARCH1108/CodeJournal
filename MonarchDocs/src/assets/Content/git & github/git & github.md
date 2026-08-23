---

---

---
## Git
- version control system is a tool that helps to track changes in our code.
- **Git** is a **Version Control System**, it is 
	- popular
	- open source
	- fast & scalable
* **Git** also helps in tracking out history of code,
* to collaborate with other developers.
* Store and manage our code using **Git**
---

## Configuring Git

1. **git config --global user.name "My Name"
2. **git config --global user.email "mail@gmail.com"
3. **git config --list**

You are configuring Git to use this **name** and **email** for all repositories on your system.

To verify your settings, use:

**git config --list**

This will display your current Git configuration, including your **username** (`Monarch1108`) and **email** (`abhayemani8@gmail.com`).
These credentials are used by Git to **identify you as the author** when you commit code. 
Additionally, when pushing code to GitHub or other remote repositories, this email is linked to your GitHub account, ensuring proper attribution of your commits.

---
## Basic Commands : **Clone & Status**

* **(Github) -> (Remote)
* **(Personal system) -> (Local)

### Clone Command :
* **git clone https://example.repo/
* this command is for cloning the entire repository and all the files in it from remote to local.

### Status Command :
* **git status 
* this command will check the status of cloned or current repository, if we cloned any repo and checked status there will be a message **`up to date & noting to commit`** 
* but if we made any changes to the code and then check the status there will be a message that says that
![[Pasted image 20250212115426.png]]
this means that we have modified the readme file and that we have to commit these changes

---

there are 4 stages for a file in Git:
- **untracked**: new files that git has not tracked yet.
- **Modified**: files which are modified after cloning.
- **Staged**: Files which are ready to be committed.
- **Unmodified**: Files which remain unchanged.
![[Pasted image 20250212120443.png]]
---

## Main Commands: Add & Commit

### Add Command
- **git add <-file name->  (for adding single file)
- **git add .                (for adding multiple files)**
- this command will add the **untracked files** into the **repository(Remote)**,  which means that new files will  be added into the repo and git will track the files from now.
- if changes happen then, the status will show **modified**

### Commit Command
- **git commit -m "message"
- this command will commit those added files or modified files and commit them to be pushed into the github.
- when we check the status now, we can see that there will be a message that says
![[Pasted image 20250212121801.png]]

- the message that says **Your branch is ahead..** means that this commit happened only in **local** and not in **remote**
- for pushing the code into **remote**

## Push Command
- **git push origin main**
- this will **Push** all the **committed** files into the **Github** repository.
![[Pasted image 20250212122507.png]]
- now all the code files will be visible in the github repository. and in the commits we can see all our commit history.
- this command will push code into the **main Branch** and we can also push our code into **Branch 1 and 2** as well.

## Init Command
- **git init**
- this command will initialize a local git repository that we can push to remote from local, 
- some **important commands**
- **git remote add origin <-link->
- **git remote -v (to verify the remote)
- **git branch (to check branch)
- **git branch -M main (to rename branch)
- **git push origin main
---
# Work Flow
![[Pasted image 20250213123520.png]]

---
# Git Branches

![[Pasted image 20250213123738.png]]

- there are many developers working on a single project, in git there is a feature called branches, each developers will work on one aspect of the project, and deploy the code in github, 
- each developer or for each feature they will be given a designated branch, so
	- developer 1 -> branch 1
	- developer 2 -> branch 2
	- so on................
- and when all the development is done, those branches will be merged together in a single main branch, 
- for example in web development multiple departments will be working on front end and back end, and push they code into their respective branches in git and finally merge together

## To check our Branch commands
- **git branch                                 (to check branch)
- **git branch -M main                  (to rename branch)
- **git checkout <-branch name->           (to navigate)
- **git checkout -b <-new branch name-> (to create new branch)
- **git branch -d <-branch name->     (to delete branch)

- **git push origin <-branch name->
### step by step use case:
- **git branch** shows us which branch we are in
- **git checkout -b <-branch name->** create a new branch with use defined name and automatically move to that branch.
- from that branch also we can add code, which will be under that branch in github, until we merge.
- to move to main branch or any other branch we use
**git checkout <-branch name->** and move to that branch,
- we can also change the branch name using **git branch -M main**
- if we want to delete a branch then **git branch -d <-branch name-> 
- if we want to push code to an other branch, rather than main branch **git push origin <-branch name->
---
![[Pasted image 20250213135546.png]]
![[Pasted image 20250213135605.png]]
- if the user accepts your code that you have defined in your particular branch, then he identifies your pull request and then merges you code the main branch.
- some times when one code overlaps other, then there might be something called as **merge conflicts**
![[Pasted image 20250213135914.png]]
![[Pasted image 20250213140037.png]]
- to merge branches locally, we use **git merge**
![[Pasted image 20250213141201.png]]
![[Pasted image 20250213142848.png]]

---
