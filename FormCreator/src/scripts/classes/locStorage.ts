import { DataStorage } from "../Interfaces/dataStorage";
import { Form } from "./form";
import { Field } from "../Interfaces/field";

export class LocStorage implements DataStorage {
    allDocuments: Array<string> = [];    // Contains all saved documents (document ID in string array)
    allForms: Array<string> = []; // Contains all forms

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

        if(!(localStorage.getItem('allForms'))){
            localStorage.setItem('allForms', '');
        }
        if(localStorage.getItem(`allForms`).length < 1){
            this.allForms = [];
        }
        else{
            this.allForms = JSON.parse(localStorage.getItem(`allForms`));
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
    
    removeDocument(id: string) {
        localStorage.removeItem(`${id}`);
        let allDocumentsTab: Array<string> = JSON.parse(localStorage.getItem(`allDocuments`));
        let index = allDocumentsTab.indexOf(id);
        if (index > -1) {
            allDocumentsTab.splice(index, 1);
            }
        localStorage.setItem(`allDocuments`, JSON.stringify(allDocumentsTab));
        window.location.reload();
    }

    public saveForm(fieldsTab: any){
        if(!(localStorage.getItem('allForms'))){
            localStorage.setItem('allForms', '');
            this.allForms = [];
        }
        let idForm: string;
        let timestamp = Date.now();
        idForm = timestamp.toString();
        localStorage.setItem(idForm, JSON.stringify(fieldsTab));
        this.allForms.push(idForm);
        localStorage.setItem(`allForms`, JSON.stringify(this.allForms));
        return idForm;
    }

    loadForm(idForm: string){
        let formFields: Array<object>;
        formFields = JSON.parse(localStorage.getItem(idForm));
        return formFields;
    }

    public getForms(){
        let idFormTab: Array<string> = JSON.parse(localStorage.getItem(`allForms`));
        return idFormTab;
    }
    
    removeForm(id: string) {
        localStorage.removeItem(`${id}`);
        let allFormsTab: Array<string> = JSON.parse(localStorage.getItem(`allForms`));
        let index = allFormsTab.indexOf(id);
        if (index > -1) {
            allFormsTab.splice(index, 1);
            }
        localStorage.setItem(`allForms`, JSON.stringify(allFormsTab));
        window.location.reload();
    }
}