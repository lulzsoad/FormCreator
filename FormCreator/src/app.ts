import { Field } from './scripts/Interfaces/field';
import { DataStorage } from "./scripts/Interfaces/dataStorage";
import { FieldType } from "./scripts/Enumerators/fieldType";
import { InputField, TextAreaField, DateField, EmailField, SelectedField, CheckboxField } from './scripts/classes/fields';
import { Form } from "./scripts/classes/form";
import { LocStorage } from "./scripts/classes/locStorage";
import { DocumentList } from './scripts/classes/documentList';
import { Router } from './scripts/classes/router';
import { FormCreator } from './scripts/classes/formCreator';


export class App {

    constructor(){
        var p = window.location.pathname;

        // index.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('index') >-1 ) {
            new FormCreator().newForm();
            
        }
        //document-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('document-list') >-1 ) {
            let documentList: DocumentList = new DocumentList();
            documentList.render();
        }
        // new-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') >-1 ) {
            //new FormCreator().renderFormList();
            let id: string = Router.getParam();
            let gottenForm: any = new FormCreator().getForm(id);
            let form: Form = new Form('name', gottenForm);
            form.render(id);
        }
        // edit-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('edit-document') >-1 ) {
            let id: string = Router.getParam();
            let document: any = new DocumentList().getDocument(id);
            let form: Form = new Form('name', document);
            form.render(id);
        }
        // form-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('form-list') >-1 ) {
            new FormCreator().renderFormList();
        }
        
    }
    
}
    