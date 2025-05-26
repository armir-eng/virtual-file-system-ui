import type { DirectoryListItem, SelectedItem } from "../../types/TypeDefinitions";
import { VirtualFileSystemClient } from "../../VirtualFileSystemClient";
import { handleSelectItem, handleNavigate } from "../../utils/actionHandlers";
import { File, Folder } from 'lucide-react';


export default function ItemsList(
    props: {
        contents: DirectoryListItem[] | null,
        selectedItem: DirectoryListItem | null,
        setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
        currentPath: string,
        setCurrentPath: React.Dispatch<React.SetStateAction<string>>,
        setFileContent: React.Dispatch<React.SetStateAction<string>>,
        client: VirtualFileSystemClient,
        setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    }
) {

    return (
        <div>
            {props.contents?.map((item: DirectoryListItem) => (
              <div 
                key={item.name}
                className={`flex items-center p-1 rounded cursor-pointer transition-colors ${props.selectedItem && props.selectedItem.name === item.name ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => handleSelectItem(
                    props.currentPath,
                    item,
                    props.setSelectedItem,
                    props.setFileContent,
                    props.client,
                    props.setIsEditing
                )}
                onDoubleClick={() => {
                  if (item.type === 'directory') {
                    handleNavigate(
                      `${props.currentPath === '/' ? '' : props.currentPath}/${item.name}`,
                      props.setCurrentPath,
                      props.setSelectedItem,
                      props.setFileContent,
                      props.setIsEditing
                    );
                  }
                }}
              >
                {item.type === 'directory' ? (
                  <Folder size={16} className="mr-2 text-yellow-500" />
                ) : (
                  <File size={16} className="mr-2 text-blue-500" />
                )}
                <span className="truncate">{item.name}</span>
              </div>
            ))}
        </div>
    )
}