***NAME****
COVID-19 TRACKER SYSTEM

**Description**
Covid-19 Tracker System project contains both backend and frontend applications. Users can sign-up/in as admin or normal user. Admins can read/add/delete/update country and covid-19 data while normal users only can read.

Frontend is created with React framework to provide good user experience.

Backend is created with Spring Boot which is a Java framework to create RESTFUL API to provide communication between
server and client.

**INSTALLATION**

Backend (with a folder name backend):
-You need to open this folder in a Java Code editor like IntelliJ.
-This project uses Java version 11 and Maven for package managing. So, you need to download required Java version and Maven before starting this project to install dependencies which are listed in 'pom.xml' file.

-PostgreSQL is used for DBMS.
I created a Docker container so PSQL can run on it. So you need to download Docker first(https://www.docker.com/products/docker-desktop).
Once installation is completed(or you have installed docker before) you need to create a PSQL instance for Docker.
-Open your terminal and write these commands:
  * docker run --name covid19 -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:alpine  // (creates a psql instance for docker container)
  * docker ps -a    // (It lists docker containers, copy the id belongs to covid19 container from given schema and paste it to below ..... space)
  * docker exec -it ..... bin/bash    // (this step can be done in Docker's application dashboard. Open it and press the 'run button' belongs to covid19 container)
  
  After Docker setup, you need to connect to psql instance which is created above and create a DATABASE with a name 'covid19'
  * psql -U postgres (to connect psql)   
  CREATE DATABASE covid19;

You can find other information about PostgreSQL setup in resources/application.yml file if needed. 
-You can run this app after these steps. Tomcat server will be running on localhost:8080 after running this application.


Frontend (with a folder name Dashboard): 
-You need to Node.js(https://nodejs.org/en/) installed in your machine to use NPM(https://www.npmjs.com/) which is a package manager
for JavaScript. Once you've installed node.js, you can use npm. 
-After these steps, you need to open 'Dashboard' folder in a code editor like VSCode or Atom etc.
- Open code editor's terminal(or you can cd into the dashboard folder in your computer terminal but for simplicity you should prefer code editor's terminal), 
  and write the commands to install required packages and start the application:
  1) npm install (installs required packages which are listed in package.json file)
  2) npm start  (runs the app)

-With 'npm start' command, source code will be compiled. After that application will be running on your localhost:30000 and your browser will open automatically.
-To stop a running React app, you need to press 'control + c' in terminal.


************* First, you need to start backend project to create tables and access data in that tables. Once server is running on localhost:8080 you can run frontend application and start using dashboard. *******




