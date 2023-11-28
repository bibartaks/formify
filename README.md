# React.js Single Page Application with MongoDB Backend

This project is a responsive single page application built using React.js as the frontend framework, Vite for project scaffolding, and MongoDB for the backend database with Express.js. The application allows users to input and save their information, including name, selected sectors, and agreement to terms.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Database Structure](#database-structure)
- [Source Code](#source-code)
- [Online Testing](#online-testing)

## Project Overview

### 1. Frontend (React.js with Vite)

The frontend is built using React.js and Vite to ensure a responsive and efficient single page application. The main features include:

- A form for users to input their data.
- A "Sectors" select box populated with data from the backend.
- Validation of all input fields (name, sectors, agreement to terms).
- Ability for users to edit their data during the session.

### 2. Backend (Express.js with MongoDB)

The backend is implemented using Express.js and MongoDB. Key functionalities include:

- Storing user data (name, sectors, agreement) in the MongoDB database.
- Retrieving and displaying "Sectors" data in the frontend select box.
- Handling requests to save, validate, and refill user data.

## Tech Stack

The technologies used in this project include:

- **Frontend:**
  - [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/) - A fast build tool for modern web development.

- **Backend:**
  - [Express.js](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
  - [MongoDB](https://www.mongodb.com/) - A NoSQL database that provides flexibility and scalability.

- **Deployment:**
  - [Vercel](https://vercel.com/) - A platform for hosting and deploying web applications.

## Database Structure

The MongoDB database has a structure that accommodates sectors information. A full database dump (structure and data) is provided for reference.

### Using the Database Dump

To access the provided database dump, download the folder from the following Google Drive link:

[Download Database Dump](https://drive.google.com/drive/folders/1W6remqzu1ZiHcaXEd47TracRoL1JfN42?usp=drive_link)

### Database Dump Folder Contents

The database dump folder contains the following files:

- **`formify.sector`**: Data related to sectors, providing a high-level categorization for sector information.
- **`formify.sub_sector`**: Sub-sector information, offering a more detailed classification within each sector.
- **`formify.sub_sector_items`**: Items associated with sub-sectors, providing specific items of sub sector.
- **`formify.users_data`**: User-specific data, including names, selected sectors, and agreement information.

## Installation

To set up and run the project locally, follow these steps:

To set up and run the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bibartaks/formify
    cd formify
    ```

2. **Install frontend dependencies (assuming you're using Vite for React):**
    ```bash
    cd client
    npm install
    ```

3. **Install backend dependencies (assuming you're using Express.js):**
    ```bash
    cd ../server
    npm install
    ```

4. **Set up environment variables:**
    - Create a `.env` file in the `server` directory.
    - Define your environment variables in this file, including MongoDB connection string and any other necessary configuration.
    ```env
    MONGODB_API_KEY=your_mongodb_api_key
    ```

5. **Start MongoDB:**
    - Make sure MongoDB is installed and running. You can download MongoDB [here](https://www.mongodb.com/try/download/community).

6. **Run the backend server:**
    ```bash
    npm start
    ```

7. **Open a new terminal window and navigate to the `client` directory:**
    ```bash
    cd ../client
    ```

8. **Start the frontend development server :**
    ```bash
    npm run dev
    ```

9. **Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/) to see the application in action.**


## Online Testing

You can also test the application online. Visit the following link to access the live version:

[Formify Live Demo](https://formify-bibartaks-7.vercel.app/)
