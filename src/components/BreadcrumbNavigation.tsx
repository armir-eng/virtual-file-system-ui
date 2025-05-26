import React from 'react';
import { Folder, SortAsc, SortDesc } from 'lucide-react';

import type { DirectoryListItem, SelectedItem } from '../types/TypeDefinitions';
import { handleItemsSorting, handleNavigate } from '../utils/actionHandlers';


export default function BreadcrumbNavigation(
  props: {
    breadcrumbs: string[],
    setCurrentPath: React.Dispatch<React.SetStateAction<string>>,
    setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>,
    setFileContent: React.Dispatch<React.SetStateAction<string>>,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    contents: DirectoryListItem[] | null,
    setContents: React.Dispatch<React.SetStateAction<DirectoryListItem[] | null>>,
  }
) {

  return (
    <div className="bg-white px-4 py-2 flex items-center border-b">
      <div className="flex items-center">
        <button 
          className="hover:bg-gray-200 p-1 rounded transition-colors"
          onClick={() => handleNavigate(
            '/',
            props.setCurrentPath,
            props.setSelectedItem,
            props.setFileContent,
            props.setIsEditing
          )}
        >
          <Folder size={16} />
        </button>
        <span className="mx-1">/</span>
        { props.breadcrumbs.map((part, i) => {
          const path = '/' + props.breadcrumbs.slice(0, i + 1).join('/');
          return (
            <React.Fragment key={path}>
              <button 
                className="hover:text-blue-500 transition-colors"
                onClick={() => handleNavigate(
                  path,
                  props.setCurrentPath,
                  props.setSelectedItem,
                  props.setFileContent,
                  props.setIsEditing
                )}
              >
                {part}
              </button>
              {i < props.breadcrumbs.length - 1 && <span className="mx-1">/</span>}
            </React.Fragment>
          );
        })}

        <button onClick={()=> handleItemsSorting(props.contents, props.setContents, "ascending")}>
          <SortAsc/>
        </button>

        <button onClick = {()=> handleItemsSorting(props.contents, props.setContents, "descending")}>
          <SortDesc/>
        </button>

      </div>
    </div>
  )
}