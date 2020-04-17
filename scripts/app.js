// Enums
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Input"] = 0] = "Input";
    FieldType[FieldType["TextArea"] = 1] = "TextArea";
    FieldType[FieldType["Date"] = 2] = "Date";
    FieldType[FieldType["Email"] = 3] = "Email";
    FieldType[FieldType["SelectField"] = 4] = "SelectField";
    FieldType[FieldType["CheckBox"] = 5] = "CheckBox";
})(FieldType || (FieldType = {}));
// classes
var FieldLabel = /** @class */ (function () {
    function FieldLabel() {
    }
    return FieldLabel;
}());
var InputField = /** @class */ (function () {
    function InputField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    return InputField;
}());
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    return TextAreaField;
}());
var DateField = /** @class */ (function () {
    function DateField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    return DateField;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    return EmailField;
}());
var SelectedField = /** @class */ (function () {
    function SelectedField(name, label, fieldType, value, options) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
        this.options = options;
    }
    return SelectedField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    return CheckboxField;
}());
var Form = /** @class */ (function () {
    function Form(fieldTab) {
        this.result = ' '; // render result
        this.getValueResult = ' ';
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
    Form.prototype.getValue = function () {
        for (var i = 0; i < this.fieldTab.length; i++) {
            this.getValueResult += "<p>" + this.fieldTab[i].label + ": " + this.fieldTab[i].value + "</p>";
        }
        document.getElementById('result').innerHTML = this.getValueResult;
    };
    Form.prototype.render = function () {
        for (var i = 0; i < this.fieldTab.length; i++) {
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
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"text\", value=\"" + this.fieldTab[i].value + "\"></p>";
                    break;
                case 1:
                    this.result += "<p>" + this.fieldTab[i].label + ": <textarea name=\"" + this.fieldTab[i].name + "\">" + this.fieldTab[i].value + "</textarea></p>";
                    break;
                case 2:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"date\", value=\"" + this.fieldTab[i].value + "\"></p>";
                    break;
                case 3:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"email\", value=\"" + this.fieldTab[i].value + "\"></p>";
                    break;
                case 4:
                    this.result += "<p>" + this.fieldTab[i].label + ": <select name=\"" + this.fieldTab[i].name + "\" id=\"" + this.fieldTab[i].name + "\">";
                    for (var j = 0; j < this.fieldTab[i].options.length; j++) {
                        this.result += "<option id=\"" + this.fieldTab[i].options[j] + "\">" + this.fieldTab[i].options[j] + "</option>";
                    }
                    this.result += "</select></p>";
                    break;
                case 5:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"checkbox\", value=\"" + this.fieldTab[i].value + "\"></p>";
                    break;
            }
        }
        document.getElementById('form').innerHTML = this.result;
    };
    return Form;
}());
var App = /** @class */ (function () {
    function App() {
    }
    return App;
}());
var btnSend = document.querySelector('#btn-submit');
var name1 = new InputField('name', 'Imię', FieldType.Input, "Łukasz");
var lastName = new InputField('lastName', 'Nazwisko', FieldType.Input, "Łopata");
var email = new EmailField('email', 'E-mail', FieldType.Email, "lukasz_lopata@wp.pl");
var options = ['Informatyka', 'Ekonometria', 'Plastyka'];
var fieldOfStudy = new SelectedField('fieldOfStudy', 'Kierunek studiów', FieldType.SelectField, options[0], options);
var eLearningPreferation = new CheckboxField('eLearn', 'Czy preferujesz e-learning?', FieldType.CheckBox, '');
var notes = new TextAreaField('notes', 'Uwagi', FieldType.TextArea, '');
var fieldTab = [name1, lastName, email, fieldOfStudy, eLearningPreferation, notes];
var form = new Form(fieldTab);
form.render();
form.getValue();
