import React, { useState, useEffect } from 'react';

import type { FileSystemStructure, SelectedItem, DirectoryListItem } from './types/TypeDefinitions';
import { VirtualFileSystemClient } from './VirtualFileSystemClient';
import HeaderToolbar from "./components/HeaderToolbar"
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import { refreshContents } from './utils/actionHandlers';
import FileExplorer from './components/fileExplorer/FileExplorer';
import DetailsPanel from './components/detailsPanel/DetailsPanel';


const App: React.FC = () => {
  
  // Initilize the virtual file system structure and use it to instantiate the VirtualFileSystemClient
  const virtualFileSystemStructureInitializer: FileSystemStructure = {
    "/": {
      type:'directory',
      created: new Date(),
      accessed: new Date(),
      modified: new Date(),
      children: {}
    }
  }

  const [client, setClient] = useState<VirtualFileSystemClient>(new VirtualFileSystemClient(virtualFileSystemStructureInitializer));
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>(''); // This state handles the 
  const [creatingType, setCreatingType] = useState<'file' | 'directory' | null>(null);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [contents, setContents] = useState<DirectoryListItem[] | null>(null);


  useEffect(() => {
    refreshContents(client, setClient);
  }, [currentPath]);

  useEffect(()=> {
    setContents(client.listDirectory(currentPath));
  }, [client]);
  
  // Generate breadcrumb navigation items (path segments)
  // Path parts are extracted by spliting the path string with the '/' separator, and filtering out empty segments.
  const breadcrumbs = currentPath.split('/').filter(Boolean);
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <HeaderToolbar 
        setCreatingType={setCreatingType}
        setNewItemName={setNewItemName}
        client = {client}
        setClient={setClient}
        currentPath={currentPath}
      />

      <BreadcrumbNavigation  
          breadcrumbs = {breadcrumbs}
          setCurrentPath = {setCurrentPath}
          setSelectedItem = {setSelectedItem}
          setFileContent =  {setFileContent}
          setIsEditing = {setIsEditing}
          contents = {contents}
          setContents = {setContents}
      />

      <div className="flex flex-1 overflow-hidden">
        <FileExplorer
          creatingType = {creatingType}
          setCreatingType = {setCreatingType}
          newItemName = {newItemName}
          setNewItemName = {setNewItemName}
          currentPath = {currentPath}
          setCurrentPath = {setCurrentPath}
          client = {client}
          setClient = {setClient}
          isRenaming = {isRenaming}
          setIsRenaming = {setIsRenaming}
          contents = {contents}
          selectedItem = {selectedItem}
          setSelectedItem = {setSelectedItem}
          setIsEditing = {setIsEditing}
          setFileContent = {setFileContent} 
        />

        <DetailsPanel
          selectedItem = {selectedItem}
          setSelectedItem = {setSelectedItem}
          isRenaming = {isRenaming}
          setIsRenaming = {setIsRenaming}
          newName = {newName}
          setNewName = {setNewName}
          currentPath = {currentPath}
          client = {client}
          setClient = {setClient}
          fileContent = {fileContent}    
          setFileContent = {setFileContent}
          creatingType = {creatingType}
          setCreatingType = {setCreatingType}
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
        />
      </div>
    </div>
  );
};

export default App;