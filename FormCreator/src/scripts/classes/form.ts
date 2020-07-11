import { Field } from '../Interfaces/field';
import { LocStorage } from './locStorage';
import { DocumentList } from './documentList';
import { Router } from './router';

export class Form{
    name: string;
    fieldTab: Array<Field>;
    result: string = ' '; // render result
    getValueResult: string = ' ';
    ID: string;

    constructor (name: string, fieldTab: Array<Field>) {
        this.name = name;
        this.fieldTab = fieldTab;
    }

    getValue(): void{
        for(let i: number = 0; i < this.fieldTab.length; i++) {
            let inputValue: string;
            if(this.fieldTab[i].fieldType === 0) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name='${this.fieldTab[i].name}']`)).value;
            }
            if(this.fieldTab[i].fieldType === 1) {
                inputValue = (<HTMLInputElement>document.querySelector(`textarea[name='${this.fieldTab[i].name}']`)).value;
            }
            if(this.fieldTab[i].fieldType === 2) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name='${this.fieldTab[i].name}']`)).value;
            }
            if(this.fieldTab[i].fieldType === 3) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name='${this.fieldTab[i].name}']`)).value;
            }
            if(this.fieldTab[i].fieldType === 4) {
                inputValue = (<HTMLInputElement>document.querySelector(`select[name='${this.fieldTab[i].name}']`)).value;
            }
            if(this.fieldTab[i].fieldType === 5) {
                if((<HTMLInputElement>document.querySelector(`input[name='${this.fieldTab[i].name}']`)).checked)
                {
                    inputValue = "Tak";
                }
                else
                {
                    inputValue = "Nie";
                }
            }

            this.fieldTab[i].value = inputValue;

            
        }
    }

    render(documentId?: string): void{
        this.result += `<form name=${this.name}> <table>`;
        let fieldTab: Array<Field> = this.fieldTab;

        for(let i: number = 0; i < this.fieldTab.length; i++) {
            /*
                Input,          0
                TextArea,       1
                Date,           2
                Email,          3
                SelectField,    4
                CheckBox        5
            */
            switch (this.fieldTab[i].fieldType) {
                case 0:
                    this.result += `<tr><td><p>${this.fieldTab[i].label}:</p> </td><td><input name="${this.fieldTab[i].name}", type="text", value="${this.fieldTab[i].value}"></td>`;
                    break;
                case 1:
                    this.result += `<tr><td><p>${this.fieldTab[i].label}:</p></td> <td><textarea name="${this.fieldTab[i].name}">${this.fieldTab[i].value}</textarea></td></tr>`;
                    break;
                case 2:
                    this.result += `<tr><td><p>${this.fieldTab[i].label}:</p></td> <td><input name="${this.fieldTab[i].name}", type="date", value="${this.fieldTab[i].value}"></td></tr>`;
                    break;
                case 3:
                    this.result += `<tr><td><p>${this.fieldTab[i].label}:</p></td> <td><input name="${this.fieldTab[i].name}", type="email", value="${this.fieldTab[i].value}"></td></tr>`;
                    break;
                case 4:
                    this.result += `<tr><td><p>${this.fieldTab[i].label}: </p></td><td><select name="${this.fieldTab[i].name}" >`;
                    for(let j = 0; j < this.fieldTab[i].options.length; j++) {
                        if(this.fieldTab[i].value == this.fieldTab[i].options[j])
                            this.result += `<option id="${this.fieldTab[i].options[j]}" selected>${this.fieldTab[i].options[j]}</option>`;
                        else
                            this.result += `<option id="${this.fieldTab[i].options[j]}">${this.fieldTab[i].options[j]}</option>`;
                    }
                    this.result += `</select></td></tr>`;
                    break;
                case 5:
                    if(this.fieldTab[i].value == "Tak")
                        this.result += `<tr><td><p>${this.fieldTab[i].label}: </p></td><td><input name="${this.fieldTab[i].name}", type="checkbox"checked></td></tr>`;
                    else
                        this.result += `<tr><td><p>${this.fieldTab[i].label}:</p></td> <td><input name="${this.fieldTab[i].name}", type="checkbox"></td></tr>`;
                    break;

            }
            
            
        }

        this.result += `<tr><td><input id="btn-back-form" value="Wstecz" type="button"></td><td><input id="btn-save-form" value="Zapisz" type="button"></td></tr>`;
        this.result += "</table></form>";

        document.getElementById('form').innerHTML = this.result;

        let btnBackForm: Element = document.querySelector('#btn-back-form');
        let btnSaveForm: Element = document.querySelector('#btn-save-form');

        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') >-1 ) {
            btnBackForm.addEventListener("click", function(){
                window.location.href = "./index.html";
            });
    
            btnSaveForm.addEventListener("click", function(){
                let form: Form = new Form('name', fieldTab);
                form.getValue();
                form.save();
                
            });
        }
        else {
            btnBackForm.addEventListener("click", function(){
                window.location.href = "./document-list.html";
            });
    
            btnSaveForm.addEventListener("click", function(){
                let id: string = Router.getParam();
                let form: Form = new Form('name', fieldTab);
                form.getValue();
                form.saveEditedForm(documentId);
            });
        }

        
        
        
    }

    save(): void{
        let doc: LocStorage = new LocStorage();
        doc.saveDocument(this.fieldTab);
        console.log('Document has been saved');
        window.location.href = "./index.html";
    }

    saveEditedForm(documentId: string): void{
        localStorage.setItem(`${documentId}`, JSON.stringify(this.fieldTab));
        window.location.href = "./document-list.html";
    }
}