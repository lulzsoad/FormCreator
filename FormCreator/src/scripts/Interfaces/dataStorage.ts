export interface DataStorage {
    saveDocument(fieldsValue: any): string;
    loadDocument(idDocument: string): any;
    getDocuments(): Array<string>;
}