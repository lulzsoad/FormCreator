import { Field } from '../Interfaces/field';
import { FieldType } from "../Enumerators/fieldType";
import { InputField, TextAreaField, DateField, EmailField, SelectedField, CheckboxField } from './fields';
import { Form } from './form';
import { LocStorage } from './locStorage';

export class FormCreator {
    allForms: Array<string>;
    renderResult: string = '';

    newForm(): void {
        let result: string = '';
            let fieldsTab: Array<Field> = [];
            let fieldTypeTab: Array<string> = [];
            result += `<table>
            <form name=form-creator>
            <tr><td>Nazwa formularza: </td><td><input type='text' id=form-creator-formname></td></tr>
            <tr><td>Etykieta: </td> <td><input type=text name=field-label></td></tr>
            <tr><td>Typ pola: </td> <td><select id=form-creator-select name=field-type>
                <option>Pole jednolinijkowe</option>
                <option>Pole tekstowe</option>
                <option>Data</option>
                <option>E-mail</option>
                <option id=selected-field-creator>Lista rozwijana</option>
                <option>Checkbox</option>
            </select></td></tr>
            <tr><td>Nazwa: </td><td><input type=text name=field-name></td></tr>
                <tr><td colspan=2><div id=form-creator-options>
                    <div id=form-creator-options-quantity></div>
                    <div id=form-creator-options-options></div>
                    <div id=form-creator-options-error style="color: red"></div>
                </div></td></tr>
                <tr id=form-creator-default-value><td><p >Domyślna wartość: </p></td><td><input name=field-default-value type=text></td></tr>
                <tr><td><p>Liczba opcji: </p></td><td><input type=number id=form-creator-options-quantity-input disabled></td></tr>
                <tr><td colspan=2><input type=button id=btn-form-creator-submit value=Dodaj></td></tr>
            
            </form>
            </table>`;

            
            document.getElementById('form-creator-creator').innerHTML = result;
            
            let formQuantityOpts: Element = document.querySelector(`#form-creator-options-quantity`);
            let formOptions: Element = document.querySelector(`#form-creator-options-options`);
            let formOptionsError: Element = document.querySelector(`#form-creator-options-error`);
            let inputDefaultValue: Element = document.querySelector('#form-creator-default-value');
            let selectFormCreator: HTMLSelectElement = document.querySelector(`#form-creator-select`);
            let inputQuantityOpts: HTMLInputElement = document.querySelector(`#form-creator-options-quantity-input`);
            selectFormCreator.addEventListener(`change`, (event) =>{
                if(selectFormCreator.selectedIndex == 0){
                    inputDefaultValue.innerHTML = `<tr><td><p>Domyślna wartość: </p></td><td><input name=field-default-value type=text></tr>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                    inputQuantityOpts.disabled = true;
                }
                else if(selectFormCreator.selectedIndex == 1){
                    inputDefaultValue.innerHTML = `<tr><td><p>Domyślna wartość:</p></td> <td><textarea name=field-default-value></textarea></td></tr>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                    inputQuantityOpts.disabled = true;
                }
                else if(selectFormCreator.selectedIndex == 2){
                    inputDefaultValue.innerHTML = `<tr><td><p>Domyślna wartość: </p></td><td><input name=field-default-value type=date></td></tr>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                    inputQuantityOpts.disabled = true;
                }
                else if(selectFormCreator.selectedIndex == 3){
                    inputDefaultValue.innerHTML = `<tr><td><p>Domyślna wartość: </p></td><td><input name=field-default-value type=email></td></tr>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                    inputQuantityOpts.disabled = true;
                }
                else if(selectFormCreator.selectedIndex == 4) {
                    //formQuantityOpts.innerHTML = '<tr><td><p>Liczba opcji: </p></td><td><input type=number id=form-creator-options-quantity-input></td></tr>';
                    
                    inputQuantityOpts.disabled = false;
                    inputQuantityOpts.addEventListener(`change`, function(){
                        let quantity: number = inputQuantityOpts.value as unknown as number;
                        let result: string = '<table><tr><td colspan=2><p>Opcje:</p></td></tr>';
                        if(quantity > 100)
                            formOptionsError.textContent = `Można wybrać maksymalnie 100 opcji!`;
                        else {
                            for(let i: number = 0; i < quantity; i++) {
                                result += `<tr><td>Opcja nr ${i+1}: </td><td><input type=text name=option${i}></td></tr>`;
                            }
                            result += `</table>`
                            formOptions.innerHTML = result;
                        }
                        
                    })
                    inputDefaultValue.innerHTML = `<tr><td><p>Domyślna wartość: </p></td><td><input name=field-default-value type=text disabled value="Zablokowana funkcja"></td></tr>`;
                }
                else if(selectFormCreator.selectedIndex == 5){
                    inputDefaultValue.innerHTML = `<tr><td><p>Domyślna wartość: </p></td><td><input name=field-default-value type=checkbox></td></tr>`;
                    formQuantityOpts.innerHTML = '';
                    formOptions.innerHTML = ``;
                    formOptionsError.innerHTML = ``;
                    inputQuantityOpts.disabled = true;
                }
                else {
                    
                }
            })

            let btnFormCreatorAddField: Element = document.querySelector(`#btn-form-creator-submit`);
            btnFormCreatorAddField.addEventListener(`click`, function(){
                let result: string = '<form><table>';
                let formNameField: HTMLInputElement = document.querySelector(`input[id=form-creator-formname]`);
                let fieldLabel: string = (<HTMLInputElement>document.querySelector('input[name=field-label]')).value;
                let fieldName: string = (<HTMLInputElement>document.querySelector('input[name=field-name]')).value;
                let fieldDefaultValue: HTMLInputElement = (<HTMLInputElement>document.querySelector('input[name=field-default-value]'));
                let fieldDefaultValueTA: HTMLInputElement = (<HTMLInputElement>document.querySelector('textarea[name=field-default-value]'));
                if(fieldLabel.length < 1 || fieldName.length < 1){
                    alert('Uzupełnij wszystkie pola')
                }
                else {
                    formNameField.disabled = true;
                    if(selectFormCreator.selectedIndex == 0) {
                        fieldTypeTab.push(`<tr><td><p>${fieldLabel}: </p></td><td><input name="${fieldName}" type=text value="${fieldDefaultValue.value}"></td></tr>`);
                        fieldsTab.push(new InputField(fieldName, fieldLabel, FieldType.Input, fieldDefaultValue.value));
                    }
                    if(selectFormCreator.selectedIndex == 1) {
                        fieldTypeTab.push(`<tr><td><p>${fieldLabel}:</p></td> <td><textarea name=${fieldName}>${fieldDefaultValueTA.value}</textarea></td></tr>`);
                        fieldsTab.push(new TextAreaField(fieldName, fieldLabel, FieldType.TextArea, fieldDefaultValueTA.value));
                    }
                    if(selectFormCreator.selectedIndex == 2) {
                        fieldTypeTab.push(`<tr><td><p>${fieldLabel}:</p></td> <td><input name="${fieldName}" type=date value="${fieldDefaultValue.value}"></td></tr>`);
                        fieldsTab.push(new DateField(fieldName, fieldLabel, FieldType.Date, fieldDefaultValue.value));
                    }
                    if(selectFormCreator.selectedIndex == 3) {
                        fieldTypeTab.push(`<tr><td><p>${fieldLabel}:</p></td> <td><input name="${fieldName}" type=email value="${fieldDefaultValue.value}"></td></tr>`);
                        fieldsTab.push(new EmailField(fieldName, fieldLabel, FieldType.Email, fieldDefaultValue.value));
                    }
                    if(selectFormCreator.selectedIndex == 4) {
                        let result: string = `<tr><td><p>${fieldLabel}: </p></td> <td><select name="${fieldName}">`
                        let options: Array<string> = [];
                        
                        let inputQuantityOpts: HTMLInputElement = document.querySelector(`#form-creator-options-quantity-input`);
                        for(let i: number = 0; i < (inputQuantityOpts.value as unknown as number); i++) {
                            result += `<option>${(<HTMLInputElement>document.querySelector(`input[name=option${i}]`)).value}</option>`
                            options.push((<HTMLInputElement>document.querySelector(`input[name=option${i}]`)).value);
                        }
    
                        result += `</select></td></tr>`
                        fieldTypeTab.push(result);
                        fieldsTab.push(new SelectedField(fieldName, fieldLabel, FieldType.SelectField, fieldDefaultValue.value, options));
                    }
                    if(selectFormCreator.selectedIndex == 5) {
                        if(fieldDefaultValue.checked == true) {
                            fieldTypeTab.push(`<tr><td><p>${fieldLabel}:</p></td> <td><input name="${fieldName}" type="checkbox" checked></td></tr>`);
                            fieldsTab.push(new CheckboxField(fieldName, fieldLabel, FieldType.CheckBox, "Tak"));
                        }
                        else {
                            fieldTypeTab.push(`<tr><td><p>${fieldLabel}:</p></td> <td><input name="${fieldName}" type="checkbox"></td></tr>`);
                            fieldsTab.push(new CheckboxField(fieldName, fieldLabel, FieldType.CheckBox, "Nie"));
                        }
                            
                    }
                    
                    
    
                     for(let i: number = 0; i<fieldTypeTab.length; i++) {
                         result += fieldTypeTab[i];
                     }
    
                     result += `<tr><td colspan=2><input type=button id='btn-formcreator-save-form' value='Zapisz formularz'></td></tr>`;
                     result += `</table></form>`;
    
                    document.querySelector(`#form-creator-view`).innerHTML = result;
    
                    let btnFormCreatorSaveForm: Element = document.querySelector(`#btn-formcreator-save-form`);
                     btnFormCreatorSaveForm.addEventListener(`click`, function(){
    
                         let name: string = (<HTMLInputElement>document.querySelector(`input[id=form-creator-formname]`)).value
                         let form: Form = new Form(name, fieldsTab);
                         new FormCreator().saveForm(form);
                         window.location.href = "./index.html";
                     })
                }
                
            })
    }

    saveForm(form: Form): void{
        new LocStorage().saveForm(form.name, form.fieldTab);
    }

    getForm(id: string): void{
        let form: any = JSON.parse(localStorage.getItem(`${id}`));
        return form;
    }

    getFormName(id: string): string{
        let formName: string = JSON.parse(localStorage.getItem(`${id}` + 'name'));
        return formName;
    }

    renderFormList(): void{
        this.renderResult = '<h1>Lista formularzy</h1><br>';
        this.allForms = new LocStorage().getForms();

        this.renderResult += '<table border=1><tr><td>ID</td><td>Nazwa</td><td>Wypełnij</td></tr>';
        for(var i:number = 0; i < this.allForms.length; i++) {
            this.renderResult += `<tr><td><p id=form-id-${i}>${this.allForms[i]}</p></td><td>${this.getFormName(this.allForms[i])}</td><td><a href="./new-document.html?id=${this.allForms[i]}">Wypełnij</a></td></tr>`
        }
        this.renderResult += '</table>'

        document.getElementById('form-list').innerHTML = this.renderResult; // Rendering list
    }
}