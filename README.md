# QR Code Generator Application

## Overview
This project is a CI/CD-enabled QR Code Generator application deployed on **Amazon ECS** using **Docker** for containerization. The application consists of:
- A **frontend** interface for generating QR codes.
- **Terraform** scripts to provision AWS infrastructure (e.g., ECS cluster, task definitions, etc.).
- A **Jenkins pipeline** for automating the build, test, and deployment process.

The architecture includes:
1. **CI Pipeline**: Tests, builds, and pushes the Docker image to Docker Hub.
2. **CD Pipeline**: Deploys the updated Docker image to Amazon ECS.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [CI/CD Pipeline Workflow](#cicd-pipeline-workflow)
5. [Architecture Diagram](#architecture-diagram)
6. [Contributing](#contributing)
7. [License](#license)

---

## Prerequisites
Before running the application or setting up the pipelines, ensure you have the following installed:
- **Git**: To clone the repository.
- **Node.js**: For building and testing the frontend code.
- **Docker**: For building and pushing the Docker image.
- **AWS CLI**: For interacting with AWS services.
- **Terraform**: For provisioning AWS infrastructure.
- **Jenkins**: For running the CI/CD pipelines(Tools: AWS Credentials, AWS Step functions).
- **Docker Hub Account**: For storing Docker images.

---

## Project Structure
The repository is organized as follows:
```
qr-code-generator/
├── frontend/                # Frontend code for the QR Code Generator
│   ├── src/                 # Source files for the application
│   ├── Dockerfile           # Dockerfile for building the frontend image
├── terraform/               # Terraform scripts for AWS infrastructure
├── Jenkinsfile-ci           # Jenkins CI pipeline script
├── Jenkinsfile-cd           # Jenkins CD pipeline script
└── README.md                # This file
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/godcandidate/qr-code-generator.git
cd qr-code-generator
git checkout jenkins-deploy
```

### 2. Set Up AWS Infrastructure
Navigate to the `terraform/` folder and initialize Terraform:
```bash
cd terraform
terraform init
terraform apply
```
This will provision the required AWS resources (e.g., ECS cluster, task definitions).


<p align="center"> <img src="(assets/aws-infrastructure.png)" alt="Architecture Diagram" width="600"> </p>


### 3. Build and Run Locally (Optional)
To test the frontend locally:
```bash
cd ../frontend
npm install
npm start
```
Access the application at `http://localhost`.

### 4. Configure Jenkins
- Install the required Jenkins plugins (`Pipeline`, `AWS Steps Plugin`, etc.).
- Add credentials for Docker Hub and AWS in Jenkins.
- Create two Jenkins jobs:
  - **CI Pipeline**: Use `Jenkinsfile-ci`.
  - **CD Pipeline**: Use `Jenkinsfile-cd`.

### 5. Trigger the Pipelines
- Push changes to the `jenkins-deploy ` branch to trigger the CI pipeline.
- After CI completes, manually approve the CD pipeline to deploy to ECS.

---

## CI/CD Pipeline Workflow

### CI Pipeline
1. **Checkout Code**: Pulls the latest code from the Git repository.
2. **Install Dependencies**: Installs Node.js dependencies and runs unit tests.
3. **Build Docker Image**: Builds the frontend into a Docker image.
4. **Push to Docker Hub**: Pushes the Docker image to Docker Hub.

### CD Pipeline
1. **Approval Step**: Prompts the user to confirm deployment.
2. **Update Task Definition**: Updates the ECS task definition with the new Docker image.
3. **Deploy to ECS**: Updates the ECS service to use the new task definition.

---

## Architecture Diagram
<p align="center"> <img src="(assets/qr-pipeline-diagram.png)" alt="Architecture Diagram" width="800"> </p>

The diagram illustrates the flow of the CI/CD pipeline:
1. Developer commits code to GitHub.
2. Jenkins CI pipeline builds and tests the application, then pushes the Docker image to Docker Hub.
3. Jenkins CD pipeline deploys the updated image to Amazon ECS.

---

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
