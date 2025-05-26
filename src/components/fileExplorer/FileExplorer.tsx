import type { VirtualFileSystemClient } from "../../VirtualFileSystemClient";
import type { DirectoryListItem, SelectedItem } from "../../types/TypeDefinitions";
import type React from "react";
import ItemCreationComponent from "./ItemCreationComponent";
import ItemsList from "./ItemsList";


export default function FileExplorer(props: {
    creatingType: "file" | "directory" | null,
    setCreatingType: React.Dispatch<React.SetStateAction<'file' | 'directory' | null>>,
    newItemName: string,
    setNewItemName: React.Dispatch<React.SetStateAction<string>>,
    currentPath: string,
    setCurrentPath: React.Dispatch<React.SetStateAction<string>>,
    client: VirtualFileSystemClient,
    setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
    isRenaming: boolean,
    setIsRenaming: React.Dispatch<React.SetStateAction<boolean>>,
    contents: DirectoryListItem[] | null,
    selectedItem: SelectedItem | null,
    setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    setFileContent: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <div className="w-1/4 bg-white border-r overflow-auto p-2">
          <ItemCreationComponent
            creatingType = {props.creatingType}
            setCreatingType = {props.setCreatingType}
            newItemName = {props.newItemName}
            setNewItemName = {props.setNewItemName}
            currentPath = {props.currentPath}
            client = {props.client}
            setClient = {props.setClient}
            isRenaming = {props.isRenaming}
            setIsRenaming = {props.setIsRenaming}
          />

          <ItemsList
            contents={props.contents}
            selectedItem={props.selectedItem}
            setSelectedItem={props.setSelectedItem}
            currentPath={props.currentPath}
            setCurrentPath={props.setCurrentPath}
            setFileContent={props.setFileContent}
            client={props.client}
            setIsEditing={props.setIsEditing}
          />

        </div>
    )
}