# Authentication and Authorization System

## Overview

This project is a comprehensive authentication and authorization system with both frontend and backend implementations. The frontend is built using ReactJS and modern tools such as `react-hook-form`, `zod`, `tanstack-query`, and `typescript`. The backend has two implementations: one using Node.js with Express and TypeScript, and another using Java Spring Boot.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration, login and protected resources (admin dashboard, user profile)
- JWT-based authentication
- Role-based authorization
- Form validation with `react-hook-form` and `zod`
- State management with `tanstack-query`
- Type safety with TypeScript

## Technologies

### Frontend

- **ReactJS**: A JavaScript library for building user interfaces
- **react-hook-form**: Performant, flexible, and extensible forms with easy-to-use validation
- **zod**: TypeScript-first schema declaration and validation library
- **tanstack-query**: Powerful asynchronous state management for TS/JS, React, Solid, Vue, Svelte, and Angular
- **TypeScript**: Typed JavaScript at Any Scale

### Backend

#### Node.js Implementation

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express**: Fast, unopinionated, minimalist web framework for Node.js
- **TypeScript**: Typed JavaScript at Any Scale
- **bcrypt**: A library to help you hash passwords
- **jsonwebtoken**: JSON Web Token implementation

#### Java Implementation

- **Spring Boot**: Framework to simplify the bootstrapping and development of new Spring applications
- **Java**: High-level, class-based, object-oriented programming language

## Installation

### Frontend

1. Clone the repository:
    ```sh
    git clone https://github.com/Viktor-stefanov/Authentication-System.git
    cd Authentication-System/frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server (on port 8000, to change port number specify a different port in vite.config.ts):
    ```sh
    npm run dev
    ```

### Backend (Node.js)

1. Navigate to the backend directory:
    ```sh
    cd ../backend-node
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a .env file which will hold all your sensitive information including:
  - Database information (host, user, password, port)
  - JWT secret
  - server process PORT number

4. Start the server (opens up a server process on port 8080 by default to change port number change the value of the PORT environment variable in your .env file):
    ```sh
    npm run dev
    ```

### Backend (Java Spring Boot)

1. Navigate to the backend directory:
    ```sh
    cd ../backend-java
    ```

2. Build the project:
    ```sh
    ./mvnw clean install
    ```

3. Start the server:
    ```sh
    ./mvnw spring-boot:run
    ```

## Usage

1. Open your browser and navigate to `http://localhost:8000` for the frontend.
2. The backend Node.js server will be running on `http://localhost:8080`.
3. The backend Java Spring Boot server will be running on `http://localhost:8080`.


## License

This project is licensed under the MIT License. 
