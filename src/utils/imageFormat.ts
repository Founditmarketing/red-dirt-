export const processGoogleDriveUrl = (url: string): string => {
    // Regex to extract the file ID from a standard Google Drive share link
    const driveRegex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveRegex);
    
    if (match && match[1]) {
        // Convert to direct export link for image tags using lh3 endpoint which bypasses Google Drive's iframe and hotlinking origin policies
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    
    // Fallback: If it's already an http link, return it. Otherwise, assume it's a local filename.
    return url.startsWith('http') ? url : `/tractors/${url}`;
};
