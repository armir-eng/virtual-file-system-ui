import type { FileSystemItem, FileSystemStructure, DirectoryListItem } from "./types/TypeDefinitions";
import { isValidSystemStructureObject } from "./utils/backendDataValidator";


// Get the API root URL from the environment variable
const apiURL = import.meta.env.VITE_API_URL


export class VirtualFileSystemClient {
    private fs: FileSystemStructure;

    constructor(fs: FileSystemStructure){
      this.fs = fs;
    }
      
    // This method loads the backend serialized file system structure data.
    // It is called when the application is initialized, and whenever a CRUD operation is performed.
    // It uses the validation utility to check the backend response correctness, and then updates the state of the VirtualFileSystemClient instance with the new data. 
    async loadFileSystemFromBackend(setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>) {
      const response = await fetch(`${apiURL}/fs/data`);
      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to load file system:", error);
        return;
      }

      const data = await response.json();

      if (isValidSystemStructureObject(data)){
        const updatedClient = new VirtualFileSystemClient(data);
        setClient(updatedClient);
      }

      else {
        console.error("Invalid file system structure received from backend!");
      }
    }
  
    // This method is analogous to the node object by its path
    // It is analogous to the '_get_node_object_by_path()' method in the backend file system structure definition.
    private _getObjectByPath(path: string): FileSystemItem | null {
      const parts = path.split('/').filter(Boolean); // Extract parts of the path, removing the empty segments of it.
      let current = this.fs['/'];
      
      if (path === '/') return current;
      
      for (const part of parts) {
        if (!current.children || !current.children[part]) {
          return null;
        }
        current = current.children[part];
      }
      
      return current;
    }
    

    // This method generates the list of items in a directory.
    // Its result will be used to populate the file explorer component.
    listDirectory(path: string): DirectoryListItem[] | null {
      const dir = this._getObjectByPath(path);
      if (!dir || dir.type !== 'directory') return null;
      
      return Object.entries(dir.children || {}).map(([name, obj]) => ({
        name,
        type: obj.type,
        size: obj.type === 'file' ? (obj.size || 0) : null,
        created: obj.created,
        modified: obj.modified
      }));
    }
    
    // This method gets the content of a file by its path, if it exists. 
    readFile(path: string): string | null {
      const file = this._getObjectByPath(path);
      if (!file || file.type !== 'file') return null;
      return file.content || '';
    }
    
    // This is the file writing operation.
    // It calls the respective API endpoint to write the file content.
    async writeFile(
      path: string,
      content: string,
      setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>
    ): Promise<void> {
      // This function executes the file writing operation request.
      // The backend covers the file existence check, by creating it if it does not exist.
      // This way, we do not need to have a seperate function for its creation. 
      const response = await fetch(`${apiURL}/fs/file/write`, {
        headers: {
          'Content-Type': 'application/json'
        },  
        method: 'POST',
        body: JSON.stringify({'path': path, 'content': content })
      })

      if (response.ok) {
        this.loadFileSystemFromBackend(setClient);      
      }
      
      else {
        const error = await response.text();
        console.error("Failed to write file:", error);
      }
    }

    // This method creates a new directory at the specified path, calling the respective API endpoint.
    async createDirectory(
      path: string,
      setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>
    ): Promise<void> {
      const response = await fetch(`${apiURL}/fs/directory/create`, {
        headers: {
          'Content-Type': 'application/json'
        },  
        method: 'POST',
        body: JSON.stringify({'path': path })
      });
      
      if (response.ok) {
        await this.loadFileSystemFromBackend(setClient);
      }

      else {
        const error = await response.text();
        console.error("Failed to create directory:", error);
      }

    }
    
    // This method performs the item deletion, calling the respective API endpoint. 
    async delete(
      path: string,
      setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>
    ): Promise<void> {
      const response = await fetch(`${apiURL}/fs/delete`, {
        headers: {
          'Content-Type': 'application/json'
        },  
        method: 'POST',
        body: JSON.stringify({'path': path })
      })

      if (response.ok) {
        await this.loadFileSystemFromBackend(setClient);
      }

      else {
        const error = await response.text();
        console.error("Failed to create directory:", error);

      }
    }
  
    // This method performs the item renaming operation, calling the respective API endpoint.
    async rename(
      oldPath: string,
      newName: string,
      setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>
    ): Promise<void> {

      const response = await fetch(`${apiURL}/fs/rename`, {
        headers: {
          'Content-Type': 'application/json'
        },  
        method: 'POST',
        body: JSON.stringify({'old_path': oldPath, 'new_name': newName })
      });

      if (response.ok) {
        await this.loadFileSystemFromBackend(setClient);
      }

      else {
        const error = await response.text();
        console.error("Failed to rename item:", error);
      }
    }
  };