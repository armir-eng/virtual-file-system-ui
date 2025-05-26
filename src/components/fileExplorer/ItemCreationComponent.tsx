import { File, Folder, Save, X } from "lucide-react";

import { handleKeyPress, handleCreateSubmit } from "../../utils/actionHandlers";
import type { VirtualFileSystemClient } from "../../VirtualFileSystemClient";


export default function ItemCreationComponent(
    props: {
        creatingType: "file" | "directory" | null,
        setCreatingType: React.Dispatch<React.SetStateAction<'file' | 'directory' | null>>,
        newItemName: string,
        setNewItemName: React.Dispatch<React.SetStateAction<string>>,
        currentPath: string,
        client: VirtualFileSystemClient,
        setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>,
        isRenaming: boolean,
        setIsRenaming: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    return (
        <div className="mb-4">
            {
                props.creatingType 
                    && 
                (
                    <div className="flex items-center mb-2">
                        {
                            props.creatingType === 'file' ? <File size={16} className="mr-2 text-blue-500" /> : <Folder size={16} className="mr-2 text-yellow-500" />
                        }
                        <input
                            type="text"
                            className="border rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`New ${props.creatingType === 'file' ? 'file' : 'folder'} name`}
                            value={props.newItemName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setNewItemName(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(
                            e,
                            () => handleCreateSubmit(
                                props.newItemName,
                                props.currentPath,
                                props.creatingType,
                                props.setCreatingType,
                                props.client,
                                props.setClient,
                                props.setNewItemName
                            ),
                            props.creatingType,
                            props.setCreatingType,
                            props.isRenaming,
                            props.setIsRenaming
                        )}
                            autoFocus
                        />
                        
                        <button 
                            className="ml-2 text-green-600 hover:text-green-800 transition-colors"
                            onClick={() => handleCreateSubmit(
                            props.newItemName,
                            props.currentPath,
                            props.creatingType,
                            props.setCreatingType,
                            props.client,
                            props.setClient,
                            props.setNewItemName
                            )}
                        >
                            <Save size={16} />
                        </button>
                        <button 
                            className="ml-1 text-red-600 hover:text-red-800 transition-colors"
                            onClick={() => props.setCreatingType(null)}
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
        </div>
    )
}