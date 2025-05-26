import type { FileSystemStructure } from "../types/TypeDefinitions";

// This utilty function is used to validate the file system structure data received from the backend.
// Chose to implement it in a Vanilla fashion.
export function isValidSystemStructureObject(data: any): data is FileSystemStructure {
  
    // If the backend service fails to respond,
    if (typeof data != "object" || data === null ) {
        return false;
    }

    for (const key in data) {
        
        const node = data[key];
        
        // Check first if the node data is correctly served as an object
        if (typeof node !== "object") {
            return false
        }
        
        // Check if the node has the common properties of a file system item, and then check the correctness of their type
        if (
            !node.created 
                ||
            !node.accessed 
                || 
            !node.modified 
                ||
            typeof node.created !== "string" 
                || 
            typeof node.accessed !== "string" 
                || 
            typeof node.modified !== "string"
        ) {
            return false;
        }

        // Check if the timestamp metadata properties are valid date strings
        else if (
            isNaN(new Date(node.accessed).getTime())
                            ||
            isNaN(new Date(node.created).getTime())
                            ||
            isNaN(new Date(node.modified).getTime())
        ) {
            return false;
        }

        if (node.type === "file") {
            if (
                // Check if the file node has its specific properties
                !node.content 
                    ||
                !node.size
                    ||
                // Check if the property values are of the correct type
                typeof node.content !== "string"
                    ||
                typeof node.size !== "number"
            ) {
                return false;
            }
        
            // Recursively validate the children nodes data of a directory item
            else if (node.type === "directory" && node.children) {
                if (!isValidSystemStructureObject(node.children) ){
                    return false;
                }
            }
        }  
    }

    return true;
}