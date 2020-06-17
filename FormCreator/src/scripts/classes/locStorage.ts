import { DataStorage } from "../Interfaces/dataStorage";

export class LocStorage implements DataStorage {
    allDocuments: Array<string> = [];    // Contains all saved documents (document ID in string array)

    constructor(){
        if(!(localStorage.getItem('allDocuments'))){
            localStorage.setItem('allDocuments', '');
        }
        if(localStorage.getItem(`allDocuments`).length < 1){
            this.allDocuments = [];
        }
        else{
            this.allDocuments = JSON.parse(localStorage.getItem(`allDocuments`));
        }
    }

    public saveDocument(fieldsValue: any){
        if(!(localStorage.getItem('allDocuments'))){
            localStorage.setItem('allDocuments', '');
            this.allDocuments = [];
        }
        let idDocument: string;
        let timestamp = Date.now();
        idDocument = timestamp.toString();
        localStorage.setItem(idDocument, JSON.stringify(fieldsValue));
        this.allDocuments.push(idDocument);
        localStorage.setItem(`allDocuments`, JSON.stringify(this.allDocuments));
        return idDocument;
    }

    loadDocument(idDocument: string){
        let docValues: Array<object>;
        docValues = JSON.parse(localStorage.getItem(idDocument));
        return docValues;
    }

    public getDocuments(){
        let idDocTab: Array<string> = JSON.parse(localStorage.getItem(`allDocuments`));
        return idDocTab;
    }
}