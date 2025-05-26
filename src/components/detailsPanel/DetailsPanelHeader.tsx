import { Folder, File, Save, X, Edit, Trash } from "lucide-react"
import type { SelectedItem } from "../../types/TypeDefinitions"
import { VirtualFileSystemClient } from "../../VirtualFileSystemClient"
import { handleRenameSubmit, handleKeyPress, handleRenameClick, handleDeleteItem, handleEditFile, handleSaveFile, handleCancelEdit } from "../../utils/actionHandlers"
import type React from "react"


export default function DetailsPanelHeader(
    props: {
        selectedItem: SelectedItem | null,
        setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
        isRenaming: boolean,
        setIsRenaming: React.Dispatch<React.SetStateAction<boolean>>,
        newName: string,
        setNewName: React.Dispatch<React.SetStateAction<string>>,
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
        <>
            <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center">
                    {props.selectedItem?.type === 'directory' ? (
                    <Folder size={20} className="mr-2 text-yellow-500" />
                    ) : (
                    <File size={20} className="mr-2 text-blue-500" />
                    )}
                    
                    {props.isRenaming ? (
                    <div className="flex items-center">
                        <input
                        type="text"
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={props.newName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setNewName(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(
                            e,
                            ()=> handleRenameSubmit(
                                props.newName,
                                props.selectedItem,
                                props.setSelectedItem,
                                props.setIsRenaming,
                                props.client,
                                props.setClient,
                                props.setFileContent
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
                        onClick={() => handleRenameSubmit(
                                props.newName,
                                props.selectedItem,
                                props.setSelectedItem,
                                props.setIsRenaming,
                                props.client,
                                props.setClient,
                                props.setFileContent
                        )}
                        >
                            <Save size={16} />
                        </button>
                        <button 
                        className="ml-1 text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => props.setIsRenaming(false)}
                        >
                            <X size={16} />
                        </button>
                    </div>
                    ) : (
                    <h2 className="text-xl font-semibold">{props.selectedItem?.name}</h2>
                    )}
                </div>

                <div className="flex gap-2">
                    {props.selectedItem?.type === 'file' && !props.isEditing && (
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                        onClick={() => handleEditFile(props.setIsEditing)}
                    >
                        <Edit size={16} className="mr-1" /> Edit
                    </button>
                    )}
                    
                    {props.selectedItem?.type === 'file' && props.isEditing && (
                    <>
                        <button 
                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                        onClick={() => handleSaveFile(
                            props.selectedItem,
                            props.client,
                            props.setClient,
                            props.setIsEditing,
                            props.fileContent
                        )}
                        >
                        <Save size={16} className="mr-1" /> Save
                        </button>
                        <button 
                        className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                        onClick={()=> handleCancelEdit(
                            props.selectedItem,
                            props.client,
                            props.setFileContent,
                            props.setIsEditing
                        )}
                        >
                        <X size={16} className="mr-1" /> Cancel
                        </button>
                    </>
                    )}
                    
                    <button 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                    onClick={()=> handleRenameClick(
                        props.selectedItem,
                        props.setIsRenaming,
                        props.setNewName
                    )}
                    >
                    <Edit size={16} className="mr-1" /> Rename
                    </button>
                    
                    <button 
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                    onClick={()=> handleDeleteItem(
                        props.selectedItem,
                        props.setSelectedItem,
                        props.client,
                        props.setClient,
                        props.setFileContent
                    )}
                    >
                    <Trash size={16} className="mr-1" /> Delete
                    </button>
                </div>
            </div>
        </>
    )
}
