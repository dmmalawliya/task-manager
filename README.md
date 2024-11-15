# Task Manager

## Overview

Task Manager is a modern, responsive web application built with React.js. It allows users to efficiently manage their tasks with features such as priority setting, due dates, and categorization. The application supports both light and dark modes for enhanced user experience.

## Features

- Create, edit, and delete tasks
- Set task priorities (High, Medium, Low)
- Assign due dates to tasks
- Add tags to tasks for better organization
- Filter tasks by priority and status
- Search functionality for quick task lookup
- Responsive design for desktop and mobile use
- Dark mode support

## Technologies Used

- React
- Tailwind CSS
- shadcn/ui components

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:

   ```
   npm run dev
   ```

## Assumptions

During the development process, the following assumptions were made:

1. Local Storage: The application uses browser local storage for data persistence. In a production environment, this would be replaced with a proper backend database.

2. Single User: The current implementation assumes a single user environment. Multi-user support would require additional authentication and data isolation features.

3. Browser Compatibility: The application is developed and tested on modern browsers. It may not support older browser versions.

4. Time Zone: The application uses the local time zone for due dates. In a global application, time zone handling would need to be more robust.

5. Performance: The current implementation is suitable for managing hundreds of tasks. For larger scale use, additional optimization may be necessary.

## Future Enhancements

- Implement user authentication and multi-user support
- Add data synchronization across devices
- Introduce more advanced filtering and sorting options
- Implement task reminders and notifications
- Add data export/import functionality

## Contributing

Contributions to improve Task Manager are welcome. Please feel free to submit a Pull Request.
