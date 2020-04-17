// Enums
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

// classes

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
    result: string = ' ';

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

    getVaue(){
        
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
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="text", value="${this.fieldTab[i].value}"></p>`;
                    break;
                case 1:
                    this.result += `<p>${this.fieldTab[i].label}: <textarea name="${this.fieldTab[i].name}">${this.fieldTab[i].value}</textarea></p>`;
                    break;
                case 2:
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="date", value="${this.fieldTab[i].value}"></p>`;
                    break;
                case 3:
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="email", value="${this.fieldTab[i].value}"></p>`;
                    break;
                case 4:
                    this.result += `<p>${this.fieldTab[i].label}: <select name="${this.fieldTab[i].name}" id="${this.fieldTab[i].name}">`;
                    for(let j = 0; j < this.fieldTab[i].options.length; j++) {
                        this.result += `<option id="${this.fieldTab[i].options[j]}">${this.fieldTab[i].options[j]}</option>`;
                    }
                    this.result += `</select></p>`;
                    break;
                case 5:
                    this.result += `<p>${this.fieldTab[i].label}: <input name="${this.fieldTab[i].name}", type="checkbox", value="${this.fieldTab[i].value}"></p>`;
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