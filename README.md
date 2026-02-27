## Virtual File System Client

This application is a file system client, implemented with React and Typescript. It provides a user interface to manipulate the system data. It allows an intuitive way to perform the basic operations like:
- Creating
- Deleting
- Renaming
- Updating a file content

It **fetches the file system structure data from the API server** and uses it to display the items in a hierarchical manner. Users can navigate through directories and easily perform the CRUD actions. Each of these operations is performed through API calls to the backend server.

### Features implemented
- Directories browsing through a breadcrumb navigation and a file explorer view
- Details panel for displaying the selected item's information
- File and directory creation
- Items sorting based on their name
- File content editing
- Items renaming
- Items deletion

### Technical details
- The application contains four main components:
  - `FileExplorer`: Displays the file system structure in a tree-like view.
  - `Breadcrumb`: A mean to display the current path and allow the navigation through directories.
  - `DetailsPanel`: Displays details of the selected file or directory.
  - `FileContentArea`: Allows editing the content of files.

- Lucide-React library is utilized for the icon components.

### Rooms for improvement
- Implementation of the search functionality to find files or directories is found hard to implement, due to:
  - The system is designed to fetch the entire file system structure, which can be inefficient for large file systems.
  - The frontend design is not good enough to support this feature (A refactoring is needed).


### Local Setup
To set up and run the Virtual File System Client locally, follow these steps:

- Clone the repository: ```git clone https://github.com/armir-eng/virtual-file-system-ui```

- Navigate to the project directory: ```cd virtual-file-system-ui```

- Create the ```.env``` file out of ```.env.example```:
  - Apply the command: ```cp .env.example .env```
  - Set the real value of ```VITE_API_URL```
    - For development testing mode: ```http://localhost:8080``` (corresponding the documented port in the API's repository)
    - For production deployment, set the domain name chosen for the API: I.e: ```https://virtual-file-system-api.armir.io``` 

- Install the dependencies: ```npm install```
- Start the development server: ```npm start```
