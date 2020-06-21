import { Field } from '../Interfaces/field';
import { LocStorage } from './locStorage';
import { DocumentList } from './documentList';

export class Form{
    name: string;
    fieldTab: Array<Field>;
    result: string = ' '; // render result
    getValueResult: string = ' ';

    constructor (name: string, fieldTab: Array<Field>) {
        this.name = name;
        this.fieldTab = fieldTab;
    }
    /*
    constructor (inputField: InputField, textAreaField: TextAreaField, dateField: DateField, emailField: EmailField, selectedField: SelectedField, checkboxField: CheckboxField){
        this.fieldTab[0] = inputField;
        this.fieldTab[1] = textAreaField;
        this.fieldTab[2] = dateField;
        this.fieldTab[3] = emailField;
        this.fieldTab[4] = selectedField;
        this.fieldTab[5] = checkboxField;
    }
    */

    getValue(){
        for(let i = 0; i < this.fieldTab.length; i++) {
            let inputValue: string;
            if(this.fieldTab[i].fieldType === 0) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name=${this.fieldTab[i].name}]`)).value;
            }
            if(this.fieldTab[i].fieldType === 1) {
                inputValue = (<HTMLInputElement>document.querySelector(`textarea[name=${this.fieldTab[i].name}]`)).value;
            }
            if(this.fieldTab[i].fieldType === 2) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name=${this.fieldTab[i].name}]`)).value;
            }
            if(this.fieldTab[i].fieldType === 3) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name=${this.fieldTab[i].name}]`)).value;
            }
            if(this.fieldTab[i].fieldType === 4) {
                inputValue = (<HTMLInputElement>document.querySelector(`select[name=${this.fieldTab[i].name}]`)).value;
            }
            if(this.fieldTab[i].fieldType === 5) {
                if((<HTMLInputElement>document.querySelector(`input[name=${this.fieldTab[i].name}]`)).checked)
                {
                    inputValue = "Tak";
                }
                else
                {
                    inputValue = "Nie";
                }
            }

            this.fieldTab[i].value = inputValue;
            
            //this.getValueResult += `<p>${this.fieldTab[i].label}: ${this.fieldTab[i].value}</p>`

            
        }

        // document.getElementById('result').innerHTML = this.getValueResult;
        // this.getValueResult = " ";
    }

    render(){
        this.result += `<form name=${this.name}>`;
        let fieldTab = this.fieldTab;

        for(let i = 0; i < this.fieldTab.length; i++) {
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
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="text", value=""></p>`;
                    break;
                case 1:
                    this.result += `<p>${this.fieldTab[i].label}: <textarea name="${this.fieldTab[i].name}"></textarea></p>`;
                    break;
                case 2:
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="date", value=""></p>`;
                    break;
                case 3:
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="email", value=""></p>`;
                    break;
                case 4:
                    this.result += `<p>${this.fieldTab[i].label}: <select name="${this.fieldTab[i].name}" id="">`;
                    for(let j = 0; j < this.fieldTab[i].options.length; j++) {
                        this.result += `<option id="${this.fieldTab[i].options[j]}">${this.fieldTab[i].options[j]}</option>`;
                    }
                    this.result += `</select></p>`;
                    break;
                case 5:
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="checkbox", value=""></p>`;
                    break;

            }
            
            
        }

        this.result += `<p><input id="btn-back-form" value="Wstecz" type="button"><input id="btn-save-form" value="Zapisz" type="button"></p>`;
        this.result += "</form>";

        document.getElementById('form').innerHTML = this.result;

        let btnBackForm = document.querySelector('#btn-back-form');
        let btnSaveForm = document.querySelector('#btn-save-form');

        btnBackForm.addEventListener("click", function(){
            window.location.href = "./index.html";
        });

        btnSaveForm.addEventListener("click", function(){
            let form = new Form("form", fieldTab);
            form.getValue();
            form.save();
            
        });
    }

    save(){
        let doc = new LocStorage();
        doc.saveDocument(this.fieldTab);
        console.log('Document has been saved');
        window.location.href = "./index.html";
    }
}