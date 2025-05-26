import type { SelectedItem } from "../../types/TypeDefinitions"
import type { VirtualFileSystemClient } from "../../VirtualFileSystemClient"
import ItemMetadata from "./ItemMetadata"
import DetailsPanelHeader from "./DetailsPanelHeader"
import FileContentArea from "./FileContentArea"


export default function DetailsPanel(
    props: {
        selectedItem: SelectedItem | null,
        setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
        isRenaming: boolean,
        setIsRenaming: React.Dispatch<React.SetStateAction<boolean>>,
        newName: string,
        setNewName: React.Dispatch<React.SetStateAction<string>>,
        currentPath: string,
        client: VirtualFileSystemClient,
        setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
        fileContent: string,    
        setFileContent: React.Dispatch<React.SetStateAction<string>>,
        creatingType: "file" | "directory" | null,
        setCreatingType: React.Dispatch<React.SetStateAction<"file" | "directory" | null>>,
        isEditing: boolean,
        setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    return (
        <div className="flex-1 p-4 overflow-auto">
          {props.selectedItem ? (
            <div className="h-full flex flex-col">
                <DetailsPanelHeader
                    selectedItem={props.selectedItem}
                    setSelectedItem={props.setSelectedItem}
                    isRenaming={props.isRenaming}
                    setIsRenaming={props.setIsRenaming}
                    newName={props.newName}
                    setNewName={props.setNewName}
                    client={props.client}
                    setClient={props.setClient}
                    fileContent={props.fileContent}
                    setFileContent={props.setFileContent}
                    creatingType={props.creatingType}
                    setCreatingType={props.setCreatingType}
                    isEditing={props.isEditing}
                    setIsEditing={props.setIsEditing}
                />
              
              <ItemMetadata selectedItem={props.selectedItem}/>
              
              <FileContentArea 
                selectedItem = {props.selectedItem}
                isEditing = {props.isEditing}
                fileContent = {props.fileContent}
                setFileContent = {props.setFileContent}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Select a file or directory to view details</p>
            </div>
          )}
        </div>
    )
}