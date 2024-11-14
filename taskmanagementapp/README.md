Task Management Application
A simple and user-friendly task management application to help users keep track of their tasks. This application allows users to add, edit, delete, and filter tasks with different priority levels. Task data is stored locally in the browser using localStorage to persist user data across sessions.

Table of Contents
Overview
Core Features
Setup Instructions
Usage
Additional Information
Overview
This Task Management Application is designed to provide an intuitive dashboard where users can manage their daily tasks effectively. The app is divided into three main sections for task management:

Upcoming Tasks: Tasks with upcoming deadlines.
Overdue Tasks: Tasks that are past their due date.
Completed Tasks: Tasks marked as completed.
The app includes:

A dashboard interface that shows upcoming, overdue, and completed tasks.
Task creation, editing, and deletion functionality.
Priority levels for tasks (High, Medium, Low).
Search and filter options for quick access and management.
Core Features
Dashboard
Displays a list of tasks categorized as Upcoming, Overdue, or Completed.
Task Management
Add Tasks: Users can create tasks with a title, description, due date, and priority level.
Edit Tasks: Users can edit existing tasks to update details or priority.
Delete Tasks: Users can remove tasks as needed.
Priority Levels
Three levels of priority: High, Medium, and Low.
Users can set and update priority for each task.
Search and Filter
Search: Quickly find tasks by title or description.
Filter: Filter tasks based on priority level and completion status.
Local Storage
Task data is saved in localStorage so tasks persist even when the browser is closed or the page is refreshed.
Setup Instructions
Prerequisites
Node.js (v14 or above)
NPM or Yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open the application:

The app should now be running at http://localhost:3000.

Building for Production
To create an optimized production build:

bash
Copy code
npm run build
The build files will be located in the dist folder.

Usage
Adding a Task: Use the "Add Task" button to create a new task. Enter the title, description, select a due date, and set a priority level.
Editing a Task: Select a task to edit its details, including title, description, due date, and priority.
Deleting a Task: Click the delete icon next to a task to remove it from the list.
Filtering and Searching: Use the search bar to find specific tasks by title or description. Use filter options to view tasks by priority or status.
Additional Information
Technologies Used
React: Frontend library for building user interfaces.
Vite: Development server and build tool.
Tailwind CSS: CSS framework for styling.
Local Storage: To persist task data between sessions.
