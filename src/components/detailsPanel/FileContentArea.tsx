import type { SelectedItem } from "../../types/TypeDefinitions"


export default function FileContentArea(
    props: {
        selectedItem: SelectedItem | null,
        isEditing: boolean,
        fileContent: string,
        setFileContent: React.Dispatch<React.SetStateAction<string>>,
    }
) {
    return (
        <>
            {props.selectedItem?.type === 'file' && (
                <div className="flex-1 overflow-auto">
                {props.isEditing ? (
                <textarea
                    className="w-full h-full p-2 border rounded font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={props.fileContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setFileContent(e.target.value)}
                />
                ) : (
                <pre className="p-2 border rounded bg-gray-50 font-mono overflow-auto h-full whitespace-pre-wrap">
                    {props.fileContent}
                </pre>
                )}
            </div>
            )}
        </>
    )
}