import type React from 'react';
import { Plus,RefreshCw } from 'lucide-react';

import { handleCreateClick, refreshContents } from '../utils/actionHandlers';
import type { VirtualFileSystemClient } from '../VirtualFileSystemClient';


export default function HeaderToolbar(
    props: {
        setCreatingType: React.Dispatch<React.SetStateAction<"file" | "directory" | null>>,
        setNewItemName: React.Dispatch<React.SetStateAction<string>>,
        client: VirtualFileSystemClient,
        setClient: React.Dispatch<React.SetStateAction<VirtualFileSystemClient>>
        currentPath: string,
    }
) {
    return (        
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Virtual File System</h1>
            <div className="flex gap-2">
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                onClick={() => handleCreateClick(
                    'file',
                    props.setCreatingType,
                    props.setNewItemName
                )}
            >
                <Plus size={16} className="mr-1" /> New File
            </button>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                onClick={() => handleCreateClick(
                    'directory',
                    props.setCreatingType,
                    props.setNewItemName
                )}
            >
                <Plus size={16} className="mr-1" /> New Folder
            </button>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                onClick={()=> refreshContents(
                    props.client,
                    props.setClient,
                )}
            >
                <RefreshCw size={16} className="mr-1" /> Refresh
            </button>
            </div>
        </div>
    )
}