// This interface models the structure of an item data
// It covers both directory and file items, setting the 'content' and 'size' fields as optional.  
export interface FileSystemItem {
  type: 'file' | 'directory';
  content?: string; // present if the item is a file type
  size?: number; // present if the item is a file type
  accessed: Date;
  created: Date;
  modified: Date;
  children?: Record<string, FileSystemItem>;
}

// This interface models the file system data main structure.
// It is initialized with the '/' directory item, and it recursively refers to the FileSystemItem children nodes.
export interface FileSystemStructure {
  '/': FileSystemItem;
}
  
export interface DirectoryListItem {
  name: string;
  type: 'file' | 'directory';
  size: number | null;
  created: Date;
  modified: Date;
}
  
export interface SelectedItem extends DirectoryListItem {
    path: string;
}