// Format file size
export const formatSize = (sizeInBytes: number | null): string => {
    if (sizeInBytes === null || sizeInBytes === undefined) return 'N/A';
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Format date
export const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
};