# Spring Boot & React Application

This project is a full-stack web application (Book Management System) using Spring Boot for the backend and React for the frontend. This README provides the steps to set up and run the project locally.

## Prerequisites
Before setting up the project, ensure you have the following installed:

**Java 11 or later** (for Spring Boot backend)

**Node.js & npm** (for React frontend)


## Setting up the Project Locally
1. Either Clone the Repository or download the zip file

for both frontend and backend code from github

git clone https://github.com/sreegopankr/bmsapp.git - for backend code 
git clone https://github.com/sreegopankr/bmsapp-frontend.git - for frontend code

let me explain how to setup the project locally in both cases

2. Setting up the Backend (Spring Boot)
Unzip or extract the backend dowloaded folder. Open it in intellij IDE. Then confirm the ENV is set to dev by default in the application.properties folder.

spring.profiles.active=${ENV:dev}

Then run the backend app to start the server.

By default, the Spring Boot application will run on http://localhost:8080.

3. Setting up the Frontend (React)
Navigate to or open the frontend folder:

cd bmsapp-frontend
Install npm dependencies: "npm i" command will install all the necessary packages.

To start the frontend :
npm run dev

This will run the React frontend on http://localhost:3000.

4. Verify the Full-Stack Application
Once both the backend and frontend servers are running, you should be able to navigate to http://localhost:3000 in your web browser to view the frontend.
The React application will interact with the Spring Boot backend running at http://localhost:8080 via API calls.