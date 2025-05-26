import type React from "react";

import { VirtualFileSystemClient } from "../VirtualFileSystemClient";
import type { DirectoryListItem, SelectedItem } from "../types/TypeDefinitions";


export const handleCreateClick = (
    type: 'file' | 'directory',
    setCreatingType: React.Dispatch<React.SetStateAction<"file" | "directory" | null>>,
    setNewItemName: React.Dispatch<React.SetStateAction<string>>
): void => {
    setCreatingType(type);
    setNewItemName('');
  };


export const refreshContents = async (
    client: VirtualFileSystemClient,
    setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
): Promise<void> => {
    await client.loadFileSystemFromBackend(setClient);
};


export const handleNavigate = (
  path: string,
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>,
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
  setFileContent: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>

): void => {
    setCurrentPath(path);
    setSelectedItem(null);
    setFileContent('');
    setIsEditing(false);
};  


export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
  action: () => void,
  creatingType: "file" | "directory" | null,
  setCreatingType: React.Dispatch<React.SetStateAction<"file" | "directory" | null>>,
  isRenaming: boolean,
  setIsRenaming: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    if (e.key === 'Enter') {
      action();
    } else if (e.key === 'Escape') {
      if (creatingType) {
        setCreatingType(null);
      } else if (isRenaming) {
        setIsRenaming(false);
      }
    }
  };


export const handleCreateSubmit = async (
  newItemName: string,
  currentPath: string,
  creatingType: "file" | "directory" | null,
  setCreatingType: React.Dispatch<React.SetStateAction<"file" | "directory" | null>>,
  client: VirtualFileSystemClient,
  setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
  setNewItemName: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
    if (!newItemName.trim()) return;
    
    const newPath = `${currentPath === '/' ? '' : currentPath}/${newItemName}`;
    
    if (creatingType === 'file') {
      await client.writeFile(newPath, '', setClient);
    } else {
      await client.createDirectory(newPath, setClient);
    }
    
    setCreatingType(null);
    setNewItemName('');
    refreshContents(client, setClient);
};


export const handleSelectItem = (
  currentPath: string,
  item: DirectoryListItem,
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
  setFileContent: React.Dispatch<React.SetStateAction<string>>,
  client: VirtualFileSystemClient,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    const itemPath = `${currentPath === '/' ? '' : currentPath}/${item.name}`;
    
    setSelectedItem({
      ...item,
      path: itemPath
    });

    if (item.type === 'file') {
      const content = client.readFile(itemPath);
      setFileContent(content || '');
      setIsEditing(false);
    } else {
      setFileContent('');
    }
  };


export const handleRenameSubmit = (
  newName: string,
  selectedItem: SelectedItem | null,
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
  setIsRenaming: React.Dispatch<React.SetStateAction<boolean>>,
  client: VirtualFileSystemClient,
  setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
  setFileContent: React.Dispatch<React.SetStateAction<string>>
): void => {
    if (!newName.trim() || newName === selectedItem?.name) {
      setIsRenaming(false);
      return;
    }
    
    if (selectedItem) {
      client.rename(selectedItem.path, newName, setClient);
      
      setIsRenaming(false);
      setSelectedItem(null);
      setFileContent('');
      refreshContents(client, setClient);
    }
  };


export const handleEditFile = (
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    setIsEditing(true);
  };

export const handleSaveFile = async (
  selectedItem: SelectedItem | null,
  client: VirtualFileSystemClient,
  setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  fileContent: string
): Promise<void> => {
  if (selectedItem && selectedItem.type === 'file') {
    await client.writeFile(selectedItem.path, fileContent, setClient);
    setIsEditing(false);
  }
};

export const handleCancelEdit = (
  selectedItem: SelectedItem | null,
  client: VirtualFileSystemClient,
  setFileContent: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (selectedItem && selectedItem.type === 'file') {
    const content = client.readFile(selectedItem.path);
    setFileContent(content || '');
    setIsEditing(false);
  }
};


export const handleDeleteItem = (
  selectedItem: SelectedItem | null,
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
  client: VirtualFileSystemClient,
  setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
  setFileContent: React.Dispatch<React.SetStateAction<string>>
): void => {
  if (selectedItem) {
    client.delete(selectedItem.path, setClient);
    setSelectedItem(null);
    setFileContent('');
    refreshContents(client, setClient);
  }
};


export const handleRenameClick = (
  selectedItem: SelectedItem | null,
  setIsRenaming: React.Dispatch<React.SetStateAction<boolean>>,
  setNewName: React.Dispatch<React.SetStateAction<string>>
): void => {
  if (selectedItem) {
    setIsRenaming(true);
    setNewName(selectedItem.name);
  }
};


export const handleItemsSorting = (
  contents: DirectoryListItem[] | null,
  setContents: React.Dispatch<React.SetStateAction<DirectoryListItem[] | null>>,
  itemsOrder: "ascending" | "descending"
)=> {

  if (contents && itemsOrder) {

    let sortedItemNames: string[] = (itemsOrder === "ascending") ? contents.map(item=> item.name).sort(): contents.map(item=> item.name).sort().reverse(); 
    
    const sortedContents: DirectoryListItem[] =  [];
    sortedItemNames.forEach(name => {
      sortedContents.push(contents.find(item=> item.name === name) as DirectoryListItem); 
    });
    
    setContents(sortedContents);
  }
}