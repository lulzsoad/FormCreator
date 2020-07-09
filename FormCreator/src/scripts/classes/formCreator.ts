import { Field } from '../Interfaces/field';
import { FieldType } from "../Enumerators/fieldType";
import { InputField, TextAreaField, DateField, EmailField, SelectedField, CheckboxField } from './fields';
import { Form } from './form';
import { LocStorage } from './locStorage';

export class FormCreator {
    allForms: Array<string>;
    renderResult: string = '';

    newForm() {
        let result: string = '';
            let fieldsTab: Array<Field> = [];
            let fieldTypeTab: Array<string> = [];
            result += `<form name=form-creator>
            <p>Nazwa formularza: <input type='text' id=form-creator-formname></p>
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
                let formNameField: HTMLInputElement = document.querySelector(`input[id=form-creator-formname]`);
                let fieldLabel: string = (<HTMLInputElement>document.querySelector('input[name=field-label]')).value;
                //let fieldType: string = (<HTMLInputElement>document.querySelector('select[name=field-type]')).value;
                let fieldName: string = (<HTMLInputElement>document.querySelector('input[name=field-name]')).value;
                let fieldDefaultValue = (<HTMLInputElement>document.querySelector('input[name=field-default-value]'));
                let fieldDefaultValueTA = (<HTMLInputElement>document.querySelector('textarea[name=field-default-value]'));
                if(fieldLabel.length < 1 || fieldName.length < 1){
                    alert('Uzupełnij wszystkie pola')
                }
                else {
                    formNameField.disabled = true;
                    if(selectFormCreator.selectedIndex == 0) {
                        fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type=text value="${fieldDefaultValue.value}"></p>`);
                        fieldsTab.push(new InputField(fieldName, fieldLabel, FieldType.Input, fieldDefaultValue.value));
                    }
                    if(selectFormCreator.selectedIndex == 1) {
                        fieldTypeTab.push(`<p>${fieldLabel}: <textarea name=${fieldName}>${fieldDefaultValueTA.value}</textarea></p>`);
                        fieldsTab.push(new TextAreaField(fieldName, fieldLabel, FieldType.TextArea, fieldDefaultValueTA.value));
                    }
                    if(selectFormCreator.selectedIndex == 2) {
                        fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type=date value="${fieldDefaultValue.value}"></p>`);
                        fieldsTab.push(new DateField(fieldName, fieldLabel, FieldType.Date, fieldDefaultValue.value));
                    }
                    if(selectFormCreator.selectedIndex == 3) {
                        fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type=email value="${fieldDefaultValue.value}"></p>`);
                        fieldsTab.push(new EmailField(fieldName, fieldLabel, FieldType.Email, fieldDefaultValue.value));
                    }
                    if(selectFormCreator.selectedIndex == 4) {
                        let result = `<p>${fieldLabel}: <select name="${fieldName}">`
                        let options: Array<string> = [];
                        
                        let inputQuantityOpts: HTMLInputElement = document.querySelector(`#form-creator-options-quantity-input`);
                        for(let i = 0; i < (inputQuantityOpts.value as unknown as number); i++) {
                            result += `<option>${(<HTMLInputElement>document.querySelector(`input[name=option${i}]`)).value}</option>`
                            options.push((<HTMLInputElement>document.querySelector(`input[name=option${i}]`)).value);
                        }
    
                        result += `</select></p>`
                        fieldTypeTab.push(result);
                        fieldsTab.push(new SelectedField(fieldName, fieldLabel, FieldType.SelectField, fieldDefaultValue.value, options));
                    }
                    if(selectFormCreator.selectedIndex == 5) {
                        if(fieldDefaultValue.checked == true) {
                            fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type="checkbox" checked></p>`);
                            fieldsTab.push(new CheckboxField(fieldName, fieldLabel, FieldType.CheckBox, "Tak"));
                        }
                        else {
                            fieldTypeTab.push(`<p>${fieldLabel}: <input name="${fieldName}" type="checkbox"></p>`);
                            fieldsTab.push(new CheckboxField(fieldName, fieldLabel, FieldType.CheckBox, "Nie"));
                        }
                            
                    }
                    
                    
    
                     for(let i = 0; i<fieldTypeTab.length; i++) {
                         result += fieldTypeTab[i];
                     }
    
                     result += `<input type=button id='btn-formcreator-save-form' value='Zapisz formularz'>`;
    
                    document.querySelector(`#form-creator-view`).innerHTML = result;
    
                    let btnFormCreatorSaveForm = document.querySelector(`#btn-formcreator-save-form`);
                     btnFormCreatorSaveForm.addEventListener(`click`, function(){
    
                         let name: string = (<HTMLInputElement>document.querySelector(`input[id=form-creator-formname]`)).value
                         let form = new Form(name, fieldsTab);
                         new FormCreator().saveForm(form);
                         window.location.href = "./index.html";
                     })
                }
                
            })
    }

    saveForm(form: Form){
        new LocStorage().saveForm(form.name, form.fieldTab);
    }

    getForm(id: string){
        let form: any = JSON.parse(localStorage.getItem(`${id}`));
        return form;
    }

    getFormName(id: string){
        let formName: string = JSON.parse(localStorage.getItem(`${id}` + 'name'));
        return formName;
    }

    renderFormList(){
        let allForms: Array<string> = this.allForms;
        this.renderResult = '';
        this.allForms = new LocStorage().getForms();
        let removeButtons: Array<Element> = [,];

        this.renderResult += '<table border=1><tr><td>ID</td><td>Nazwa</td><td>Wypełnij</td></tr>';
        for(var i:number = 0; i < this.allForms.length; i++) {
            let form: any = new FormCreator().getForm(this.allForms[i]);
            
            this.renderResult += `<tr><td><p id=form-id-${i}>${this.allForms[i]}</p></td><td>${this.getFormName(this.allForms[i])}</td><td><a href="./new-document.html?id=${this.allForms[i]}">Wypełnij</a></td></tr>`
        }
        this.renderResult += '</table>'

        document.getElementById('form-list').innerHTML = this.renderResult; // Rendering list
    }
}