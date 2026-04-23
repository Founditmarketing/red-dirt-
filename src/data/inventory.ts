// We export a flexible generic interface since columns from Google Sheets can vary.
export interface TractorItem {
    id: string | number;
    [key: string]: any;
}
