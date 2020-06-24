import { Field } from './scripts/Interfaces/field';
import { DataStorage } from "./scripts/Interfaces/dataStorage";
import { FieldType } from "./scripts/Enumerators/fieldType";
import { InputField, TextAreaField, DateField, EmailField, SelectedField, CheckboxField } from "./scripts/classes/fields";
import { Form } from "./scripts/classes/form";
import { LocStorage } from "./scripts/classes/locStorage";
import { DocumentList } from './scripts/classes/documentList';
import { Router } from './scripts/classes/router';


export class App {

    constructor(){
        var p = window.location.pathname;

        // index.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('index') >-1 ) {
            let result: string = '';
            let fieldTypeTab: Array<string> = [];
            result += `<form name=form-creator>
            <p>Etykieta: <input type=text name=field-label></p>
            <p>Typ pola: <select id=form-creator-select name=field-type></p>
            <option>Pole jednolinijkowe</option>
            <option>Pole tekstowe</option>
            <option>Data</option>
            <option>E-mail</option>
            <option id=selected-field-creator>Lista rozwijana</option>
            <option>Checkbox</option>
            </select>
            <p>Nazwa: <input type=text name=field-name></p>
                <div id=form-creator-options>
                    <div id=form-creator-options-quantity></div>
                    <div id=form-creator-options-options></div>
                    <div id=form-creator-options-error style="color: red"></div>
                </div>
            <p id=form-creator-default-value>Domyślna wartość: <input name=field-default-value type=text></p>
            <input type=button id=btn-form-creator-submit value=Dodaj>
            </form>`;

            
            document.getElementById('form-creator-creator').innerHTML = result;
            
            let formQuantityOpts = document.querySelector(`#form-creator-options-quantity`);
            let formOptions = document.querySelector(`#form-creator-options-options`);
            let formOptionsError = document.querySelector(`#form-creator-options-error`);
            let inputDefaultValue = document.querySelector('#form-creator-default-value');
            var selectFormCreator: HTMLSelectElement = document.querySelector(`#form-creator-select`);
            selectFormCreator.addEventListener(`change`, (event) =>{
                if(selectFormCreator.selectedIndex == 0){
                    inputDefaultValue.innerHTML = `Domyślna wartość: <input name=field-default-value type=text>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                }
                else if(selectFormCreator.selectedIndex == 1){
                    inputDefaultValue.innerHTML = `Domyślna wartość: <textarea name=field-default-value></textarea>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                }
                else if(selectFormCreator.selectedIndex == 2){
                    inputDefaultValue.innerHTML = `Domyślna wartość: <input name=field-default-value type=date>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                }
                else if(selectFormCreator.selectedIndex == 3){
                    inputDefaultValue.innerHTML = `Domyślna wartość: <input name=field-default-value type=email>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                }
                else if(selectFormCreator.selectedIndex == 4) {
                    formQuantityOpts.innerHTML = 'Liczba opcji: <input type=number id=form-creator-options-quantity-input>';
                    let inputQuantityOpts: HTMLInputElement = document.querySelector(`#form-creator-options-quantity-input`);
                    inputQuantityOpts.addEventListener(`change`, function(){
                        let quantity = inputQuantityOpts.value as unknown as number
                        let result: string = 'Opcje: <br>';
                        if(quantity > 100)
                            formOptionsError.textContent = `Można wybrać maksymalnie 100 opcji!`;
                        else {
                            for(let i = 0; i < quantity; i++) {
                                result += `Opcja nr ${i+1}: <input type=text name=option${i}><br>`;
                            }
                            formOptions.innerHTML = result;
                        }
                        
                    })
                    inputDefaultValue.innerHTML = `Domyślna wartość: <input name=field-default-value type=text disabled value="Zablokowana funkcja">`;
                }
                else if(selectFormCreator.selectedIndex == 5){
                    inputDefaultValue.innerHTML = `Domyślna wartość: <input name=field-default-value type=checkbox>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                }
                else {
                    
                }
            })

            let btnFormCreatorAddField = document.querySelector(`#btn-form-creator-submit`);
            btnFormCreatorAddField.addEventListener(`click`, function(){
                let result = '';
                let fieldLabel: string = (<HTMLInputElement>document.querySelector('input[name=field-label]')).value;
                //let fieldType: string = (<HTMLInputElement>document.querySelector('select[name=field-type]')).value;
                let fieldName: string = (<HTMLInputElement>document.querySelector('input[name=field-name]')).value;
                let fieldDefaultValue = (<HTMLInputElement>document.querySelector('input[name=field-default-value]'));
                let fieldDefaultValueTA = (<HTMLInputElement>document.querySelector('textarea[name=field-default-value]'));
                if(selectFormCreator.selectedIndex == 0) {
                    fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type=text value="${fieldDefaultValue.value}"></p>`);
                }
                if(selectFormCreator.selectedIndex == 1) {
                    fieldTypeTab.push(`<p>${fieldLabel}: <textarea name=${fieldName}>${fieldDefaultValueTA.value}</textarea></p>`);
                }
                if(selectFormCreator.selectedIndex == 2) {
                    fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type=date value="${fieldDefaultValue.value}"></p>`);
                }
                if(selectFormCreator.selectedIndex == 3) {
                    fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type=email value="${fieldDefaultValue.value}"></p>`);
                }
                if(selectFormCreator.selectedIndex == 4) {
                    let result = `<p>${fieldLabel}: <select name="${fieldName}">`
                    
                    let inputQuantityOpts: HTMLInputElement = document.querySelector(`#form-creator-options-quantity-input`);
                    for(let i = 0; i < (inputQuantityOpts.value as unknown as number); i++) {
                        result += `<option>${(<HTMLInputElement>document.querySelector(`input[name=option${i}]`)).value}</option>`
                    }

                    result += `</select></p>`
                    fieldTypeTab.push(result);
                }
                if(selectFormCreator.selectedIndex == 5) {
                    if(fieldDefaultValue.checked == true)
                        fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type="checkbox" checked></p>`);
                    else
                        fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type="checkbox"></p>`);
                }
                
                

                 for(let i = 0; i<fieldTypeTab.length; i++) {
                     result += fieldTypeTab[i];
                 }

                document.querySelector(`#form-creator-view`).innerHTML = result;
            })
            
        }
        //document-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('document-list') >-1 ) {
            let documentList = new DocumentList();
            documentList.render();
        }
        // new-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') >-1 ) {
            let name: Field = new InputField('name', 'Imię', FieldType.Input, "");
            let lastName: Field = new InputField('lastName', 'Nazwisko', FieldType.Input, "");
            let email: Field = new EmailField('email', 'E-mail', FieldType.Email, "");
            let options: Array<string> = ['Informatyka', 'Ekonometria', 'Plastyka'];
            let fieldOfStudy: Field = new SelectedField('fieldOfStudy', 'Kierunek studiów', FieldType.SelectField, options[0], options);
            let eLearningPreferation: Field = new CheckboxField('eLearn', 'Czy preferujesz e-learning?', FieldType.CheckBox, '');
            let notes: Field = new TextAreaField('notes', 'Uwagi', FieldType.TextArea, '');

            let fieldTab: Array<Field> = [name, lastName, email, fieldOfStudy, eLearningPreferation, notes];

            let form = new Form("form1", fieldTab);
            form.render();
        }
        // edit-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('edit-document') >-1 ) {
            let id: string = Router.getParam();
            let document = new DocumentList().getDocument(id);
            let form = new Form('form', document);
            form.render(id);
        }
        
    }
    
}
    