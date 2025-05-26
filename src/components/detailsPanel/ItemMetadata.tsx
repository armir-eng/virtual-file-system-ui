import type { SelectedItem } from "../../types/TypeDefinitions"
import { formatDate, formatSize } from "../../utils/metadataFormatters"


export default function ItemMetadata(
    props: {
        selectedItem: SelectedItem | null
    }
) {
    return (
        <div className="mb-4 text-sm text-gray-600">
            <div>Type: {props.selectedItem?.type === 'directory' ? 'Directory' : 'File'}</div>
            {props.selectedItem?.type === 'file' && props.selectedItem.size !== null && (
                <div>Size: {formatSize(props.selectedItem.size)}</div>
            )}
            {props.selectedItem?.created && (
                <div>Created: {formatDate(props.selectedItem.created)}</div>
            )}
            {props.selectedItem?.modified && (
                <div>Modified: {formatDate(props.selectedItem.modified)}</div>
            )}
            <div>Path: {props.selectedItem?.path}</div>
        </div>
    )
}