# Task Management App (React Native with Expo)

This is a task management app built using **React Native**, **Expo**, **Redux Toolkit**, **React Native Paper**, and **TypeScript**. The app includes features for authentication (signup/login), task management (view, add, edit, delete tasks), and token-based authentication using **JWT**.

## Features

### Authentication
- **Signup Screen**: Users can register with name, email, and password.
- **Login Screen**: Users can log in using their email and password. Token-based authentication is implemented using **JWT** stored in **AsyncStorage**.
- **Logout**: A logout button is available that clears the stored JWT token and navigates the user back to the Login screen.

### Task Management
- **Home Screen**: Displays tasks fetched from the backend. Includes pull-to-refresh functionality.
- **Add Task Screen**: Allows users to create a new task with a title and description.
- **Task Details Screen**: Displays detailed information about a task, and allows users to edit or delete tasks.

## Tech Stack & Tools

- **React Native** with **Expo**
- **Redux Toolkit** for state management
- **React Navigation** (Stack Navigator) for navigating between screens
- **AsyncStorage** for storing JWT tokens
- **React Native Paper** or **NativeBase** for UI components
- **TypeScript** for type safety

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
2. **Install dependencies**:
Run the following command to install all the necessary dependencies:
 ```bash
   npm install
   ```

3. **Start the App**:
After installing dependencies, you can start the app with:
 ```bash
   npm start
   ```
This will start the development server, and you can open the app on your simulator or mobile device using the Expo Go app.

## Folder Structure
Expo file based routing is implemented where dynamic routing is also supported. 
