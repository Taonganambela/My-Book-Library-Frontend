My Book Library Application
````````````````````````````

Technology Choices
```````````````````

I built this application is using React, Tailwind and Material-UI (MUI) for the frontend, and Axios for handling my API requests. Here's a breakdown of the technology stack:

    React: I choose it for its component-based architecture and reusability, which facilitates building interactive UIs. React's useState and useEffect hooks are utilized for state management and lifecycle methods, respectively.

    Material-UI: Provides a set of pre-built React components.

    Axios: Used for making asynchronous HTTP requests to interact with a RESTful API. Axios simplifies the process of sending and handling responses from the backend server.

Challenges Faced
`````````````````

    State Management: Managing form data, book list, and edit states (using useState hooks) required careful handling to ensure synchronization and proper rendering of components.

    Responsive ness: Ensuring responsive UI design across different screen sizes using tailwind.

Additional Features Implemented
````````````````````````````````

    Snackbar Notifications: Informative notifications (success or error messages) are displayed using Snackbar from Material-UI to provide feedback on CRUD operations.

    Conditional Rendering: Components are conditionally rendered based on editIndex state to switch between 'Add' and 'Update' functionality in the form.

Running the Application
`````````````````````````

    Install dependencies using npm install.
    Start the development server with npm dev.
    Access the application at http://localhost:3000 in your web browser.

Conclusion
```````````

This application demonstrates the use of React.js with Material-UI and Axios to build a responsive CRUD interface for managing a book library. 