import { Field } from "./scripts/Interfaces/field";
import { DataStorage } from "./scripts/Interfaces/dataStorage";
import { FieldType } from "./scripts/Enumerators/fieldType";
import { InputField, TextAreaField, DateField, EmailField, SelectedField, CheckboxField } from "./scripts/classes/fields";
import { Form } from "./scripts/classes/form";
import { LocStorage } from "./scripts/classes/locStorage";
import { DocumentList } from "./scripts/classes/documentList";


export class App {

    constructor(){
        let btnSend = document.querySelector('#btn-submit');

        let name1: Field = new InputField('name', 'Imię', FieldType.Input, "");
        let lastName: Field = new InputField('lastName', 'Nazwisko', FieldType.Input, "");
        let email: Field = new EmailField('email', 'E-mail', FieldType.Email, "");
        let options: Array<string> = ['Informatyka', 'Ekonometria', 'Plastyka'];
        let fieldOfStudy: Field = new SelectedField('fieldOfStudy', 'Kierunek studiów', FieldType.SelectField, options[0], options);
        let eLearningPreferation: Field = new CheckboxField('eLearn', 'Czy preferujesz e-learning?', FieldType.CheckBox, '');
        let notes: Field = new TextAreaField('notes', 'Uwagi', FieldType.TextArea, '');

        let fieldTab: Array<Field> = [name1, lastName, email, fieldOfStudy, eLearningPreferation, notes];

        let form = new Form(fieldTab);
        form.render();
        let doc = new LocStorage();
        let documentList = new DocumentList();
            
        btnSend.addEventListener("click", function() {
            form.getValue();
            doc.saveDocument(fieldTab);
            console.log(localStorage.getItem(`allDocuments`));
            documentList.render();
        })
    }
    
    

    
    
}
    