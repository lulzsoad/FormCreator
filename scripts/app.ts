enum FieldType {
    Input,
    TextArea,
    Date,
    Email,
    SelectField,
    CheckBox
}


// Interfaces

interface Field {
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    options?: Array<string>;
    render:() => HTMLDivElement;
}

interface Storage {
    saveDocument(fieldsValue: any): string;
    loadDocument(idDocument: string): any;
    getDocuments(): Array<string>;
}

// classes

class LocStorage implements Storage {
    [name: string]: any;
    length: number;
    clear(): void {
        throw new Error("Method not implemented.");
    }
    getItem(key: string): string {
        throw new Error("Method not implemented.");
    }
    key(index: number): string {
        throw new Error("Method not implemented.");
    }
    removeItem(key: string): void {
        throw new Error("Method not implemented.");
    }
    setItem(key: string, value: string): void {
        throw new Error("Method not implemented.");
    }

    constructor(){}

    public saveDocument(fieldsValue: any){
        let idDocument: string;
        let timestamp = Date.now();
        idDocument = timestamp.toString();
        localStorage.setItem(idDocument, JSON.stringify(fieldsValue));
        return idDocument;
    }

    loadDocument(idDocument: string){
        let docValues: Array<string>;
        return docValues;
    }

    getDocuments(){
        let idDocTab: Array<string>;
        return idDocTab;
    }
}

class FieldLabel {
    // Should display label
}

class InputField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

class TextAreaField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

class DateField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

class EmailField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

class SelectedField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    options: Array<string>;
    render: () => HTMLDivElement;

    constructor (name: string, label: string, fieldType: FieldType, value: string, options: Array<string>) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
        this.options = options;
    }
}

class CheckboxField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

class Form{
    fieldTab: Array<Field>;
    result: string = ' '; // render result
    getValueResult: string = ' ';

    constructor (fieldTab: Array<Field>) {
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
            if(fieldTab[i].fieldType === 0) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name=${fieldTab[i].name}]`)).value;
            }
            if(fieldTab[i].fieldType === 1) {
                inputValue = (<HTMLInputElement>document.querySelector(`textarea[name=${fieldTab[i].name}]`)).value;
            }
            if(fieldTab[i].fieldType === 2) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name=${fieldTab[i].name}]`)).value;
            }
            if(fieldTab[i].fieldType === 3) {
                inputValue = (<HTMLInputElement>document.querySelector(`input[name=${fieldTab[i].name}]`)).value;
            }
            if(fieldTab[i].fieldType === 4) {
                inputValue = (<HTMLInputElement>document.querySelector(`select[name=${fieldTab[i].name}]`)).value;
            }
            if(fieldTab[i].fieldType === 5) {
                if((<HTMLInputElement>document.querySelector(`input[name=${fieldTab[i].name}]`)).checked)
                {
                    inputValue = "Tak";
                }
                else
                {
                    inputValue = "Nie";
                }
            }

            this.fieldTab[i].value = inputValue;
            
            this.getValueResult += `<p>${this.fieldTab[i].label}: ${this.fieldTab[i].value}</p>`

            
        }

        document.getElementById('result').innerHTML = this.getValueResult;
        this.getValueResult = " ";
        let doc = new LocStorage().saveDocument(fieldTab);
        console.log(doc);
    }

    render(){
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

        document.getElementById('form').innerHTML = this.result;
    }
}

class App {
    /*
    name: Field = new InputField('name', 'Imię', FieldType.Input, "Łukasz");
    lastName: Field = new InputField('lastName', 'Nazwisko', FieldType.Input, "Łopata");
    email: Field = new EmailField('email', 'E-mail', FieldType.Email, "lukasz_lopata@wp.pl");
    fieldOfStudy: Field = new SelectedField('fieldOfStudy', 'Kierunek studiów', FieldType.SelectField, 'Informatyka');
    eLearningPreferation: Field = new CheckboxField('eLearn', 'Czy preferujesz e-learning?', FieldType.CheckBox, '');
    notes: Field = new TextAreaField('notes', 'Uwagi', FieldType.TextArea, '');

    fieldTab: Array<Field> = [this.name, this.lastName, this.email, this.fieldOfStudy, this.eLearningPreferation, this.notes];

    form = new Form(this.fieldTab).render();
    */
    
}
    let btnSend = document.querySelector('#btn-submit');
    

    let name1: Field = new InputField('name', 'Imię', FieldType.Input, "Łukasz");
    let lastName: Field = new InputField('lastName', 'Nazwisko', FieldType.Input, "Łopata");
    let email: Field = new EmailField('email', 'E-mail', FieldType.Email, "lukasz_lopata@wp.pl");
    let options: Array<string> = ['Informatyka', 'Ekonometria', 'Plastyka'];
    let fieldOfStudy: Field = new SelectedField('fieldOfStudy', 'Kierunek studiów', FieldType.SelectField, options[0], options);
    let eLearningPreferation: Field = new CheckboxField('eLearn', 'Czy preferujesz e-learning?', FieldType.CheckBox, '');
    let notes: Field = new TextAreaField('notes', 'Uwagi', FieldType.TextArea, '');

    let fieldTab: Array<Field> = [name1, lastName, email, fieldOfStudy, eLearningPreferation, notes];

    let form = new Form(fieldTab);
    form.render();
    btnSend.addEventListener("click", function() {form.getValue()})