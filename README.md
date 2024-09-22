**Distributed Project Management REST API using MongoDB**

### Description:
This project is a server-side implementation for managing software projects, utilizing a RESTful API built with Node.js, Express, and MongoDB. The project data, including project details, team members, and images, is stored in MongoDB rather than files, ensuring efficient and scalable data management. Mongoose is used for defining schemas and performing server-side validations. The client-side remains identical to the previous exercises, focusing on interacting with the API.

Core functionalities include creating and managing projects and their team members, associating images with projects, and deleting images. The project manager can view a list of all projects, including details of the project, team members, and images. All RESTful routing follows standard HTTP methods and includes appropriate status codes for success or failure.

Client-side validation ensures that users provide correct data before sending it to the server, while server-side validation is handled through Mongoose schemas to maintain data integrity in the database.

### Readme.md:

```markdown
# Distributed Project Management REST API using MongoDB

## Description
This project implements a RESTful API for managing software projects, using MongoDB for data storage instead of files. It enables users to create and manage projects, team members, and project-related images through a Node.js and Express backend, with data validation on both the client and server sides. The API performs CRUD operations (Create, Read, Update, Delete) for projects and images, ensuring clean code architecture with separation into different modules.

The main functionalities are:
- **CreateMember**: Add a new team member with their name and email.
- **CreateProject**: Add a new project with a name, description, start date, and associated team members.
- **getProjects**: Retrieve a list of all projects, including project manager, team details, and images.
- **addImageToProject**: Attach an image (with URL and description) to a project.
- **deleteImageFromProject**: Remove an image from a project’s image list.

The database is connected using the Mongoose library, and all data is stored in MongoDB, including project and team details.

## Technologies Used
- **Node.js**: Backend environment to build the REST API.
- **Express.js**: Web framework for handling routing and HTTP requests.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB to define schemas and handle database operations.
- **REST API**: CRUD operations with standard HTTP methods (GET, POST, DELETE).
- **Client-side validation**: Ensuring valid data inputs before sending requests to the server.
- **Server-side validation**: Schema validation using Mongoose to enforce data structure integrity.

## API Endpoints

### 1. CreateMember
- **Method**: POST  
- **Route**: `/members`  
- **Description**: Adds a new team member to the database with their name and email.
- **Input**: 
  - `name` (string): The name of the member.
  - `email` (string): The email of the member.
- **Output**: Success status with a unique `ObjectId` for the new member or an error message if validation fails.

### 2. CreateProject
- **Method**: POST  
- **Route**: `/projects`  
- **Description**: Creates a new project with the project name, description, and team members.
- **Input**:
  - `name` (string): Name of the project.
  - `description` (string): Short project summary (20-80 characters).
  - `startDate` (timestamp): Start date of the project.
  - `manager` (object): Project manager's name and email.
  - `members` (array): List of team members (name, email, role).
- **Output**: Success status with a unique `ObjectId` for the project or an error message if validation fails.

### 3. getProjects
- **Method**: GET  
- **Route**: `/projects`  
- **Description**: Retrieves a list of all projects, including details like project manager, team members, and associated images.
- **Output**: A JSON array of project details.

### 4. addImageToProject
- **Method**: POST  
- **Route**: `/projects/:projectId/images`  
- **Description**: Adds an image to a project, including the image URL and a short description.
- **Input**:
  - `imageUrl` (string): The URL path to the image.
  - `description` (string): Short description of the image.
- **Output**: Success message or error if validation fails or the project ID does not exist.

### 5. deleteImageFromProject
- **Method**: DELETE  
- **Route**: `/projects/:projectId/images/:imageId`  
- **Description**: Deletes an image from a project's image list based on the provided project and image IDs.
- **Output**: Success message or error if the image or project ID does not exist.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/project-management-api.git
   cd project-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup MongoDB**:  
   Make sure MongoDB is installed and running on your local machine or set up a cloud MongoDB instance. Update the connection URL in your `.env` file.

4. **Run the server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3001`.

## Directory Structure

```plaintext
.
├── controllers
│   ├── memberController.js
│   ├── projectController.js
├── models
│   ├── memberModel.js
│   ├── projectModel.js
├── routes
│   ├── memberRoutes.js
│   ├── projectRoutes.js
├── .env
├── app.js
└── package.json
```

## Validation
- **Client-Side**: Ensures all required fields are entered correctly, providing real-time feedback for users.
- **Server-Side**: Mongoose schemas validate incoming data, ensuring all fields like name, description, and emails follow the required formats and restrictions.


