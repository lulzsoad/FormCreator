(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var form_1 = require("./scripts/classes/form");
var documentList_1 = require("./scripts/classes/documentList");
var router_1 = require("./scripts/classes/router");
var formCreator_1 = require("./scripts/classes/formCreator");
var App = /** @class */ (function () {
    function App() {
        var p = window.location.pathname;
        // index.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('index') > -1) {
            new formCreator_1.FormCreator().newForm();
        }
        //document-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('document-list') > -1) {
            var documentList = new documentList_1.DocumentList();
            documentList.render();
        }
        // new-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') > -1) {
            //new FormCreator().renderFormList();
            var id = router_1.Router.getParam();
            var gottenForm = new formCreator_1.FormCreator().getForm(id);
            var form = new form_1.Form('name', gottenForm);
            form.render(id);
            // let name: Field = new InputField('name', 'Imię', FieldType.Input, "");
            // let lastName: Field = new InputField('lastName', 'Nazwisko', FieldType.Input, "");
            // let email: Field = new EmailField('email', 'E-mail', FieldType.Email, "");
            // let options: Array<string> = ['Informatyka', 'Ekonometria', 'Plastyka'];
            // let fieldOfStudy: Field = new SelectedField('fieldOfStudy', 'Kierunek studiów', FieldType.SelectField, options[0], options);
            // let eLearningPreferation: Field = new CheckboxField('eLearn', 'Czy preferujesz e-learning?', FieldType.CheckBox, '');
            // let notes: Field = new TextAreaField('notes', 'Uwagi', FieldType.TextArea, '');
            // let fieldTab: Array<Field> = [name, lastName, email, fieldOfStudy, eLearningPreferation, notes];
            // let form = new Form('name', fieldTab);
            // form.render();
        }
        // edit-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('edit-document') > -1) {
            var id = router_1.Router.getParam();
            var document_1 = new documentList_1.DocumentList().getDocument(id);
            var form = new form_1.Form('name', document_1);
            form.render(id);
        }
        // form-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('form-list') > -1) {
            new formCreator_1.FormCreator().renderFormList();
        }
    }
    return App;
}());
exports.App = App;
},{"./scripts/classes/documentList":4,"./scripts/classes/form":6,"./scripts/classes/formCreator":7,"./scripts/classes/router":9}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var app = new app_1.App();
},{"./app":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldType = void 0;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Input"] = 0] = "Input";
    FieldType[FieldType["TextArea"] = 1] = "TextArea";
    FieldType[FieldType["Date"] = 2] = "Date";
    FieldType[FieldType["Email"] = 3] = "Email";
    FieldType[FieldType["SelectField"] = 4] = "SelectField";
    FieldType[FieldType["CheckBox"] = 5] = "CheckBox";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentList = void 0;
var locStorage_1 = require("./locStorage");
var DocumentList = /** @class */ (function () {
    function DocumentList() {
        this.renderResult = '';
        if (!(localStorage.getItem('allDocuments'))) {
            localStorage.setItem('allDocuments', '');
        }
        if (localStorage.getItem("allDocuments").length < 1) {
            this.allDocuments = [];
        }
        else {
            this.getDocumentList();
            //this.render();
        }
    }
    DocumentList.prototype.getDocumentList = function () {
        this.allDocuments = new locStorage_1.LocStorage().getDocuments();
    };
    DocumentList.prototype.render = function () {
        var allDocs = this.allDocuments;
        this.renderResult = '';
        this.getDocumentList();
        var removeButtons = [,];
        this.renderResult += '<table border=1><tr><td>id</td><td>Edytuj</td><td>Usuń</td></tr>';
        for (var i = 0; i < this.allDocuments.length; i++) {
            this.renderResult += "<tr><td><p id=doc-id-" + i + ">" + this.allDocuments[i] + "</p></td><td><a href=\"./edit-document.html?id=" + this.allDocuments[i] + "\">Edytuj</a></td><td><input id=btn-remove-doc-" + allDocs[i] + " type=button value=Usu\u0144></td></tr>";
        }
        this.renderResult += '</table>';
        document.getElementById('document-list').innerHTML = this.renderResult; // Rendering list
        var _loop_1 = function (j) {
            removeButtons[j] = document.querySelector("#btn-remove-doc-" + allDocs[j]);
            if (removeButtons[j]) {
                removeButtons[j].addEventListener('click', function () {
                    new DocumentList().removeDocument(allDocs[j]);
                });
            }
        };
        // Adding click events to remove buttons
        for (var j = 0; j < allDocs.length; j++) {
            _loop_1(j);
        }
    };
    DocumentList.prototype.getDocument = function (id) {
        var doc = JSON.parse(localStorage.getItem("" + id));
        return doc;
    };
    DocumentList.prototype.removeDocument = function (id) {
        localStorage.removeItem("" + id);
        var allDocumentsTab = JSON.parse(localStorage.getItem("allDocuments"));
        var index = allDocumentsTab.indexOf(id);
        if (index > -1) {
            allDocumentsTab.splice(index, 1);
        }
        localStorage.setItem("allDocuments", JSON.stringify(allDocumentsTab));
        window.location.reload();
    };
    return DocumentList;
}());
exports.DocumentList = DocumentList;
},{"./locStorage":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxField = exports.SelectedField = exports.EmailField = exports.DateField = exports.TextAreaField = exports.InputField = void 0;
var InputField = /** @class */ (function () {
    function InputField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    InputField.prototype.getValue = function () {
        return this.value;
    };
    return InputField;
}());
exports.InputField = InputField;
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    TextAreaField.prototype.getValue = function () {
        return this.value;
    };
    return TextAreaField;
}());
exports.TextAreaField = TextAreaField;
var DateField = /** @class */ (function () {
    function DateField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    DateField.prototype.getValue = function () {
        return this.value;
    };
    return DateField;
}());
exports.DateField = DateField;
var EmailField = /** @class */ (function () {
    function EmailField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    EmailField.prototype.getValue = function () {
        return this.value;
    };
    return EmailField;
}());
exports.EmailField = EmailField;
var SelectedField = /** @class */ (function () {
    function SelectedField(name, label, fieldType, value, options) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
        this.options = options;
    }
    SelectedField.prototype.getValue = function () {
        return this.value;
    };
    return SelectedField;
}());
exports.SelectedField = SelectedField;
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    CheckboxField.prototype.getValue = function () {
        return this.value;
    };
    return CheckboxField;
}());
exports.CheckboxField = CheckboxField;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var locStorage_1 = require("./locStorage");
var router_1 = require("./router");
var Form = /** @class */ (function () {
    function Form(name, fieldTab) {
        this.result = ' '; // render result
        this.getValueResult = ' ';
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
    Form.prototype.getValue = function () {
        for (var i = 0; i < this.fieldTab.length; i++) {
            var inputValue = void 0;
            if (this.fieldTab[i].fieldType === 0) {
                inputValue = document.querySelector("input[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 1) {
                inputValue = document.querySelector("textarea[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 2) {
                inputValue = document.querySelector("input[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 3) {
                inputValue = document.querySelector("input[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 4) {
                inputValue = document.querySelector("select[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 5) {
                if (document.querySelector("input[name='" + this.fieldTab[i].name + "']").checked) {
                    inputValue = "Tak";
                }
                else {
                    inputValue = "Nie";
                }
            }
            this.fieldTab[i].value = inputValue;
            //this.getValueResult += `<p>${this.fieldTab[i].label}: ${this.fieldTab[i].value}</p>`
        }
        // document.getElementById('result').innerHTML = this.getValueResult;
        // this.getValueResult = " ";
    };
    Form.prototype.render = function (documentId) {
        this.result += "<form name=" + this.name + ">";
        var fieldTab = this.fieldTab;
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
                    this.result += "<p>" + this.fieldTab[i].label + ": <select name=\"" + this.fieldTab[i].name + "\" >";
                    for (var j = 0; j < this.fieldTab[i].options.length; j++) {
                        if (this.fieldTab[i].value == this.fieldTab[i].options[j])
                            this.result += "<option id=\"" + this.fieldTab[i].options[j] + "\" selected>" + this.fieldTab[i].options[j] + "</option>";
                        else
                            this.result += "<option id=\"" + this.fieldTab[i].options[j] + "\">" + this.fieldTab[i].options[j] + "</option>";
                    }
                    this.result += "</select></p>";
                    break;
                case 5:
                    if (this.fieldTab[i].value == "Tak")
                        this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"checkbox\"checked></p>";
                    else
                        this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"checkbox\"></p>";
                    break;
            }
        }
        this.result += "<p><input id=\"btn-back-form\" value=\"Wstecz\" type=\"button\"><input id=\"btn-save-form\" value=\"Zapisz\" type=\"button\"></p>";
        this.result += "</form>";
        document.getElementById('form').innerHTML = this.result;
        var btnBackForm = document.querySelector('#btn-back-form');
        var btnSaveForm = document.querySelector('#btn-save-form');
        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') > -1) {
            btnBackForm.addEventListener("click", function () {
                window.location.href = "./index.html";
            });
            btnSaveForm.addEventListener("click", function () {
                var form = new Form('name', fieldTab);
                form.getValue();
                form.save();
            });
        }
        else {
            btnBackForm.addEventListener("click", function () {
                window.location.href = "./document-list.html";
            });
            btnSaveForm.addEventListener("click", function () {
                var id = router_1.Router.getParam();
                var form = new Form('name', fieldTab);
                form.getValue();
                form.saveEditedForm(documentId);
            });
        }
    };
    Form.prototype.save = function () {
        var doc = new locStorage_1.LocStorage();
        doc.saveDocument(this.fieldTab);
        console.log('Document has been saved');
        window.location.href = "./index.html";
    };
    Form.prototype.saveEditedForm = function (documentId) {
        localStorage.setItem("" + documentId, JSON.stringify(this.fieldTab));
        window.location.href = "./document-list.html";
    };
    return Form;
}());
exports.Form = Form;
},{"./locStorage":8,"./router":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormCreator = void 0;
var fieldType_1 = require("../Enumerators/fieldType");
var fields_1 = require("./fields");
var form_1 = require("./form");
var locStorage_1 = require("./locStorage");
var FormCreator = /** @class */ (function () {
    function FormCreator() {
        this.renderResult = '';
    }
    FormCreator.prototype.newForm = function () {
        var result = '';
        var fieldsTab = [];
        var fieldTypeTab = [];
        result += "<form name=form-creator>\n            <p>Nazwa formularza: <input type='text' id=form-creator-formname></p>\n            <p>Etykieta: <input type=text name=field-label></p>\n            <p>Typ pola: <select id=form-creator-select name=field-type></p>\n            <option>Pole jednolinijkowe</option>\n            <option>Pole tekstowe</option>\n            <option>Data</option>\n            <option>E-mail</option>\n            <option id=selected-field-creator>Lista rozwijana</option>\n            <option>Checkbox</option>\n            </select>\n            <p>Nazwa: <input type=text name=field-name></p>\n                <div id=form-creator-options>\n                    <div id=form-creator-options-quantity></div>\n                    <div id=form-creator-options-options></div>\n                    <div id=form-creator-options-error style=\"color: red\"></div>\n                </div>\n            <p id=form-creator-default-value>Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=text></p>\n            <input type=button id=btn-form-creator-submit value=Dodaj>\n            </form>";
        document.getElementById('form-creator-creator').innerHTML = result;
        var formQuantityOpts = document.querySelector("#form-creator-options-quantity");
        var formOptions = document.querySelector("#form-creator-options-options");
        var formOptionsError = document.querySelector("#form-creator-options-error");
        var inputDefaultValue = document.querySelector('#form-creator-default-value');
        var selectFormCreator = document.querySelector("#form-creator-select");
        selectFormCreator.addEventListener("change", function (event) {
            if (selectFormCreator.selectedIndex == 0) {
                inputDefaultValue.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=text>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
            }
            else if (selectFormCreator.selectedIndex == 1) {
                inputDefaultValue.innerHTML = "Domy\u015Blna warto\u015B\u0107: <textarea name=field-default-value></textarea>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
            }
            else if (selectFormCreator.selectedIndex == 2) {
                inputDefaultValue.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=date>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
            }
            else if (selectFormCreator.selectedIndex == 3) {
                inputDefaultValue.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=email>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
            }
            else if (selectFormCreator.selectedIndex == 4) {
                formQuantityOpts.innerHTML = 'Liczba opcji: <input type=number id=form-creator-options-quantity-input>';
                var inputQuantityOpts_1 = document.querySelector("#form-creator-options-quantity-input");
                inputQuantityOpts_1.addEventListener("change", function () {
                    var quantity = inputQuantityOpts_1.value;
                    var result = 'Opcje: <br>';
                    if (quantity > 100)
                        formOptionsError.textContent = "Mo\u017Cna wybra\u0107 maksymalnie 100 opcji!";
                    else {
                        for (var i = 0; i < quantity; i++) {
                            result += "Opcja nr " + (i + 1) + ": <input type=text name=option" + i + "><br>";
                        }
                        formOptions.innerHTML = result;
                    }
                });
                inputDefaultValue.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=text disabled value=\"Zablokowana funkcja\">";
            }
            else if (selectFormCreator.selectedIndex == 5) {
                inputDefaultValue.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=checkbox>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
            }
            else {
            }
        });
        var btnFormCreatorAddField = document.querySelector("#btn-form-creator-submit");
        btnFormCreatorAddField.addEventListener("click", function () {
            var result = '';
            var formNameField = document.querySelector("input[id=form-creator-formname]");
            var fieldLabel = document.querySelector('input[name=field-label]').value;
            //let fieldType: string = (<HTMLInputElement>document.querySelector('select[name=field-type]')).value;
            var fieldName = document.querySelector('input[name=field-name]').value;
            var fieldDefaultValue = document.querySelector('input[name=field-default-value]');
            var fieldDefaultValueTA = document.querySelector('textarea[name=field-default-value]');
            if (fieldLabel.length < 1 || fieldName.length < 1) {
                alert('Uzupełnij wszystkie pola');
            }
            else {
                formNameField.disabled = true;
                if (selectFormCreator.selectedIndex == 0) {
                    fieldTypeTab.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=text value=\"" + fieldDefaultValue.value + "\"></p>");
                    fieldsTab.push(new fields_1.InputField(fieldName, fieldLabel, fieldType_1.FieldType.Input, fieldDefaultValue.value));
                }
                if (selectFormCreator.selectedIndex == 1) {
                    fieldTypeTab.push("<p>" + fieldLabel + ": <textarea name=" + fieldName + ">" + fieldDefaultValueTA.value + "</textarea></p>");
                    fieldsTab.push(new fields_1.TextAreaField(fieldName, fieldLabel, fieldType_1.FieldType.TextArea, fieldDefaultValueTA.value));
                }
                if (selectFormCreator.selectedIndex == 2) {
                    fieldTypeTab.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=date value=\"" + fieldDefaultValue.value + "\"></p>");
                    fieldsTab.push(new fields_1.DateField(fieldName, fieldLabel, fieldType_1.FieldType.Date, fieldDefaultValue.value));
                }
                if (selectFormCreator.selectedIndex == 3) {
                    fieldTypeTab.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=email value=\"" + fieldDefaultValue.value + "\"></p>");
                    fieldsTab.push(new fields_1.EmailField(fieldName, fieldLabel, fieldType_1.FieldType.Email, fieldDefaultValue.value));
                }
                if (selectFormCreator.selectedIndex == 4) {
                    var result_1 = "<p>" + fieldLabel + ": <select name=\"" + fieldName + "\">";
                    var options = [];
                    var inputQuantityOpts = document.querySelector("#form-creator-options-quantity-input");
                    for (var i = 0; i < inputQuantityOpts.value; i++) {
                        result_1 += "<option>" + document.querySelector("input[name=option" + i + "]").value + "</option>";
                        options.push(document.querySelector("input[name=option" + i + "]").value);
                    }
                    result_1 += "</select></p>";
                    fieldTypeTab.push(result_1);
                    fieldsTab.push(new fields_1.SelectedField(fieldName, fieldLabel, fieldType_1.FieldType.SelectField, fieldDefaultValue.value, options));
                }
                if (selectFormCreator.selectedIndex == 5) {
                    if (fieldDefaultValue.checked == true) {
                        fieldTypeTab.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=\"checkbox\" checked></p>");
                        fieldsTab.push(new fields_1.CheckboxField(fieldName, fieldLabel, fieldType_1.FieldType.CheckBox, "Tak"));
                    }
                    else {
                        fieldTypeTab.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=\"checkbox\"></p>");
                        fieldsTab.push(new fields_1.CheckboxField(fieldName, fieldLabel, fieldType_1.FieldType.CheckBox, "Nie"));
                    }
                }
                for (var i = 0; i < fieldTypeTab.length; i++) {
                    result += fieldTypeTab[i];
                }
                result += "<input type=button id='btn-formcreator-save-form' value='Zapisz formularz'>";
                document.querySelector("#form-creator-view").innerHTML = result;
                var btnFormCreatorSaveForm = document.querySelector("#btn-formcreator-save-form");
                btnFormCreatorSaveForm.addEventListener("click", function () {
                    var name = document.querySelector("input[id=form-creator-formname]").value;
                    var form = new form_1.Form(name, fieldsTab);
                    new FormCreator().saveForm(form);
                    window.location.href = "./index.html";
                });
            }
        });
    };
    FormCreator.prototype.saveForm = function (form) {
        new locStorage_1.LocStorage().saveForm(form.name, form.fieldTab);
    };
    FormCreator.prototype.getForm = function (id) {
        var form = JSON.parse(localStorage.getItem("" + id));
        return form;
    };
    FormCreator.prototype.getFormName = function (id) {
        var formName = JSON.parse(localStorage.getItem("" + id + 'name'));
        return formName;
    };
    FormCreator.prototype.renderFormList = function () {
        var allForms = this.allForms;
        this.renderResult = '';
        this.allForms = new locStorage_1.LocStorage().getForms();
        var removeButtons = [,];
        this.renderResult += '<table border=1><tr><td>ID</td><td>Nazwa</td><td>Wypełnij</td></tr>';
        for (var i = 0; i < this.allForms.length; i++) {
            var form = new FormCreator().getForm(this.allForms[i]);
            this.renderResult += "<tr><td><p id=form-id-" + i + ">" + this.allForms[i] + "</p></td><td>" + this.getFormName(this.allForms[i]) + "</td><td><a href=\"./new-document.html?id=" + this.allForms[i] + "\">Wype\u0142nij</a></td></tr>";
        }
        this.renderResult += '</table>';
        document.getElementById('form-list').innerHTML = this.renderResult; // Rendering list
    };
    return FormCreator;
}());
exports.FormCreator = FormCreator;
},{"../Enumerators/fieldType":3,"./fields":5,"./form":6,"./locStorage":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocStorage = void 0;
var LocStorage = /** @class */ (function () {
    function LocStorage() {
        this.allDocuments = []; // Contains all saved documents (document ID in string array)
        this.allForms = []; // Contains all forms
        if (!(localStorage.getItem('allDocuments'))) {
            localStorage.setItem('allDocuments', '');
        }
        if (localStorage.getItem("allDocuments").length < 1) {
            this.allDocuments = [];
        }
        else {
            this.allDocuments = JSON.parse(localStorage.getItem("allDocuments"));
        }
        if (!(localStorage.getItem('allForms'))) {
            localStorage.setItem('allForms', '');
        }
        if (localStorage.getItem("allForms").length < 1) {
            this.allForms = [];
        }
        else {
            this.allForms = JSON.parse(localStorage.getItem("allForms"));
        }
    }
    LocStorage.prototype.saveDocument = function (fieldsValue) {
        if (!(localStorage.getItem('allDocuments'))) {
            localStorage.setItem('allDocuments', '');
            this.allDocuments = [];
        }
        var idDocument;
        var timestamp = Date.now();
        idDocument = timestamp.toString();
        localStorage.setItem(idDocument, JSON.stringify(fieldsValue));
        this.allDocuments.push(idDocument);
        localStorage.setItem("allDocuments", JSON.stringify(this.allDocuments));
        return idDocument;
    };
    LocStorage.prototype.loadDocument = function (idDocument) {
        var docValues;
        docValues = JSON.parse(localStorage.getItem(idDocument));
        return docValues;
    };
    LocStorage.prototype.getDocuments = function () {
        var idDocTab = JSON.parse(localStorage.getItem("allDocuments"));
        return idDocTab;
    };
    LocStorage.prototype.removeDocument = function (id) {
        localStorage.removeItem("" + id);
        var allDocumentsTab = JSON.parse(localStorage.getItem("allDocuments"));
        var index = allDocumentsTab.indexOf(id);
        if (index > -1) {
            allDocumentsTab.splice(index, 1);
        }
        localStorage.setItem("allDocuments", JSON.stringify(allDocumentsTab));
        window.location.reload();
    };
    LocStorage.prototype.saveForm = function (name, fieldsTab) {
        if (!(localStorage.getItem('allForms'))) {
            localStorage.setItem('allForms', '');
            this.allForms = [];
        }
        var idForm;
        var timestamp = Date.now();
        var idFormName;
        idForm = timestamp.toString();
        idFormName = timestamp.toString() + "name";
        localStorage.setItem(idForm, JSON.stringify(fieldsTab));
        localStorage.setItem(idFormName, JSON.stringify(name));
        this.allForms.push(idForm);
        localStorage.setItem("allForms", JSON.stringify(this.allForms));
        return idForm;
    };
    LocStorage.prototype.loadForm = function (idForm) {
        var formFields;
        formFields = JSON.parse(localStorage.getItem(idForm));
        return formFields;
    };
    LocStorage.prototype.getForms = function () {
        var idFormTab = JSON.parse(localStorage.getItem("allForms"));
        return idFormTab;
    };
    LocStorage.prototype.removeForm = function (id) {
        localStorage.removeItem("" + id);
        var allFormsTab = JSON.parse(localStorage.getItem("allForms"));
        var index = allFormsTab.indexOf(id);
        if (index > -1) {
            allFormsTab.splice(index, 1);
        }
        localStorage.setItem("allForms", JSON.stringify(allFormsTab));
        window.location.reload();
    };
    return LocStorage;
}());
exports.LocStorage = LocStorage;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.getParam = function () {
        var query = window.location.search.substr(1);
        var urlParams = new URLSearchParams(query);
        var id = urlParams.get('id');
        return id;
    };
    return Router;
}());
exports.Router = Router;
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlLnRzIiwic3JjL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcy50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybUNyZWF0b3IudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2UudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0lBLCtDQUE4QztBQUU5QywrREFBOEQ7QUFDOUQsbURBQWtEO0FBQ2xELDZEQUE0RDtBQUc1RDtJQUVJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFakMsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRSxDQUFDLENBQUMsRUFBRztZQUN4RixJQUFJLHlCQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUUvQjtRQUNELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQUc7WUFDaEcsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDdEMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pCO1FBQ0Qsb0JBQW9CO1FBQ3BCLElBQUksUUFBUSxD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LFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQXJHQSxBQXFHQyxJQUFBO0FBckdZLGdDQUFVOzs7OztBQ0p2QjtJQUFBO0lBU0EsQ0FBQztJQVBVLGVBQVEsR0FBZjtRQUNJLElBQU0sS0FBSyxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHdCQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL3NjcmlwdHMvSW50ZXJmYWNlcy9maWVsZCc7XHJcbmltcG9ydCB7IERhdGFTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9JbnRlcmZhY2VzL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gXCIuL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlXCI7XHJcbmltcG9ydCB7IElucHV0RmllbGQsIFRleHRBcmVhRmllbGQsIERhdGVGaWVsZCwgRW1haWxGaWVsZCwgU2VsZWN0ZWRGaWVsZCwgQ2hlY2tib3hGaWVsZCB9IGZyb20gJy4vc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcyc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvZm9ybVwiO1xyXG5pbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgRG9jdW1lbnRMaXN0IH0gZnJvbSAnLi9zY3JpcHRzL2NsYXNzZXMvZG9jdW1lbnRMaXN0JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NsYXNzZXMvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybUNyZWF0b3IgfSBmcm9tICcuL3NjcmlwdHMvY2xhc3Nlcy9mb3JtQ3JlYXRvcic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB2YXIgcCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuXHJcbiAgICAgICAgLy8gaW5kZXguaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2luZGV4JykgPi0xICkge1xyXG4gICAgICAgICAgICBuZXcgRm9ybUNyZWF0b3IoKS5uZXdGb3JtKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2RvY3VtZW50LWxpc3QuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2RvY3VtZW50LWxpc3QnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGxldCBkb2N1bWVudExpc3QgPSBuZXcgRG9jdW1lbnRMaXN0KCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50TGlzdC5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbmV3LWRvY3VtZW50Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCduZXctZG9jdW1lbnQnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIC8vbmV3IEZvcm1DcmVhdG9yKCkucmVuZGVyRm9ybUxpc3QoKTtcclxuICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBSb3V0ZXIuZ2V0UGFyYW0oKTtcclxuICAgICAgICAgICAgbGV0IGdvdHRlbkZvcm0gPSBuZXcgRm9ybUNyZWF0b3IoKS5nZXRGb3JtKGlkKTtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybSgnbmFtZScsIGdvdHRlbkZvcm0pO1xyXG4gICAgICAgICAgICBmb3JtLnJlbmRlcihpZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gbGV0IG5hbWU6IEZpZWxkID0gbmV3IElucHV0RmllbGQoJ25hbWUnLCAnSW1pxJknLCBGaWVsZFR5cGUuSW5wdXQsIFwiXCIpO1xyXG4gICAgICAgICAgICAvLyBsZXQgbGFzdE5hbWU6IEZpZWxkID0gbmV3IElucHV0RmllbGQoJ2xhc3ROYW1lJywgJ05hendpc2tvJywgRmllbGRUeXBlLklucHV0LCBcIlwiKTtcclxuICAgICAgICAgICAgLy8gbGV0IGVtYWlsOiBGaWVsZCA9IG5ldyBFbWFpbEZpZWxkKCdlbWFpbCcsICdFLW1haWwnLCBGaWVsZFR5cGUuRW1haWwsIFwiXCIpO1xyXG4gICAgICAgICAgICAvLyBsZXQgb3B0aW9uczogQXJyYXk8c3RyaW5nPiA9IFsnSW5mb3JtYXR5a2EnLCAnRWtvbm9tZXRyaWEnLCAnUGxhc3R5a2EnXTtcclxuICAgICAgICAgICAgLy8gbGV0IGZpZWxkT2ZTdHVkeTogRmllbGQgPSBuZXcgU2VsZWN0ZWRGaWVsZCgnZmllbGRPZlN0dWR5JywgJ0tpZXJ1bmVrIHN0dWRpw7N3JywgRmllbGRUeXBlLlNlbGVjdEZpZWxkLCBvcHRpb25zWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgLy8gbGV0IGVMZWFybmluZ1ByZWZlcmF0aW9uOiBGaWVsZCA9IG5ldyBDaGVja2JveEZpZWxkKCdlTGVhcm4nLCAnQ3p5IHByZWZlcnVqZXN6IGUtbGVhcm5pbmc/JywgRmllbGRUeXBlLkNoZWNrQm94LCAnJyk7XHJcbiAgICAgICAgICAgIC8vIGxldCBub3RlczogRmllbGQgPSBuZXcgVGV4dEFyZWFGaWVsZCgnbm90ZXMnLCAnVXdhZ2knLCBGaWVsZFR5cGUuVGV4dEFyZWEsICcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxldCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+ID0gW25hbWUsIGxhc3ROYW1lLCBlbWFpbCwgZmllbGRPZlN0dWR5LCBlTGVhcm5pbmdQcmVmZXJhdGlvbiwgbm90ZXNdO1xyXG5cclxuICAgICAgICAgICAgLy8gbGV0IGZvcm0gPSBuZXcgRm9ybSgnbmFtZScsIGZpZWxkVGFiKTtcclxuICAgICAgICAgICAgLy8gZm9ybS5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWRpdC1kb2N1bWVudC5odG1sXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignZWRpdC1kb2N1bWVudCcpID4tMSApIHtcclxuICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBSb3V0ZXIuZ2V0UGFyYW0oKTtcclxuICAgICAgICAgICAgbGV0IGRvY3VtZW50ID0gbmV3IERvY3VtZW50TGlzdCgpLmdldERvY3VtZW50KGlkKTtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybSgnbmFtZScsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgZm9ybS5yZW5kZXIoaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3JtLWxpc3QuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2Zvcm0tbGlzdCcpID4tMSApIHtcclxuICAgICAgICAgICAgbmV3IEZvcm1DcmVhdG9yKCkucmVuZGVyRm9ybUxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAnO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xyXG4iLCJleHBvcnQgZW51bSBGaWVsZFR5cGUge1xyXG4gICAgSW5wdXQsXHJcbiAgICBUZXh0QXJlYSxcclxuICAgIERhdGUsXHJcbiAgICBFbWFpbCxcclxuICAgIFNlbGVjdEZpZWxkLFxyXG4gICAgQ2hlY2tCb3hcclxufSIsImltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tIFwiLi9sb2NTdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRMaXN0IHtcclxuICAgIGFsbERvY3VtZW50czogQXJyYXk8c3RyaW5nPjtcclxuICAgIHJlbmRlclJlc3VsdDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9jdW1lbnRMaXN0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RG9jdW1lbnRMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gbmV3IExvY1N0b3JhZ2UoKS5nZXREb2N1bWVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGFsbERvY3M6IEFycmF5PHN0cmluZz4gPSB0aGlzLmFsbERvY3VtZW50cztcclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCA9ICcnO1xyXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnRMaXN0KCk7XHJcbiAgICAgICAgbGV0IHJlbW92ZUJ1dHRvbnM6IEFycmF5PEVsZW1lbnQ+ID0gWyxdO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPHRhYmxlIGJvcmRlcj0xPjx0cj48dGQ+aWQ8L3RkPjx0ZD5FZHl0dWo8L3RkPjx0ZD5Vc3XFhDwvdGQ+PC90cj4nO1xyXG4gICAgICAgIGZvcih2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5hbGxEb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gYDx0cj48dGQ+PHAgaWQ9ZG9jLWlkLSR7aX0+JHt0aGlzLmFsbERvY3VtZW50c1tpXX08L3A+PC90ZD48dGQ+PGEgaHJlZj1cIi4vZWRpdC1kb2N1bWVudC5odG1sP2lkPSR7dGhpcy5hbGxEb2N1bWVudHNbaV19XCI+RWR5dHVqPC9hPjwvdGQ+PHRkPjxpbnB1dCBpZD1idG4tcmVtb3ZlLWRvYy0ke2FsbERvY3NbaV19IHR5cGU9YnV0dG9uIHZhbHVlPVVzdcWEPjwvdGQ+PC90cj5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ICs9ICc8L3RhYmxlPidcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvY3VtZW50LWxpc3QnKS5pbm5lckhUTUwgPSB0aGlzLnJlbmRlclJlc3VsdDsgLy8gUmVuZGVyaW5nIGxpc3RcclxuXHJcbiAgICAgICAgLy8gQWRkaW5nIGNsaWNrIGV2ZW50cyB0byByZW1vdmUgYnV0dG9uc1xyXG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGo8IGFsbERvY3MubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICByZW1vdmVCdXR0b25zW2pdID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi1yZW1vdmUtZG9jLSR7YWxsRG9jc1tqXX1gKTtcclxuICAgICAgICAgICAgaWYocmVtb3ZlQnV0dG9uc1tqXSl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVCdXR0b25zW2pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRG9jdW1lbnRMaXN0KCkucmVtb3ZlRG9jdW1lbnQoYWxsRG9jc1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldERvY3VtZW50KGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkb2M6IGFueSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7aWR9YCkpO1xyXG4gICAgICAgIHJldHVybiBkb2M7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRG9jdW1lbnQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke2lkfWApO1xyXG4gICAgICAgIGxldCBhbGxEb2N1bWVudHNUYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKSk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gYWxsRG9jdW1lbnRzVGFiLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGFsbERvY3VtZW50c1RhYi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbERvY3VtZW50c2AsIEpTT04uc3RyaW5naWZ5KGFsbERvY3VtZW50c1RhYikpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSBcIi4uL0ludGVyZmFjZXMvZmllbGRcIjtcclxuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSBcIi4uL0VudW1lcmF0b3JzL2ZpZWxkVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0RmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRBcmVhRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0ZWRGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIG9wdGlvbnM6IEFycmF5PHN0cmluZz47XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZywgb3B0aW9uczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9JbnRlcmZhY2VzL2ZpZWxkJztcclxuaW1wb3J0IHsgTG9jU3RvcmFnZSB9IGZyb20gJy4vbG9jU3RvcmFnZSc7XHJcbmltcG9ydCB7IERvY3VtZW50TGlzdCB9IGZyb20gJy4vZG9jdW1lbnRMaXN0JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm17XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBmaWVsZFRhYjogQXJyYXk8RmllbGQ+O1xyXG4gICAgcmVzdWx0OiBzdHJpbmcgPSAnICc7IC8vIHJlbmRlciByZXN1bHRcclxuICAgIGdldFZhbHVlUmVzdWx0OiBzdHJpbmcgPSAnICc7XHJcbiAgICBJRDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGZpZWxkVGFiOiBBcnJheTxGaWVsZD4pIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWIgPSBmaWVsZFRhYjtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBjb25zdHJ1Y3RvciAoaW5wdXRGaWVsZDogSW5wdXRGaWVsZCwgdGV4dEFyZWFGaWVsZDogVGV4dEFyZWFGaWVsZCwgZGF0ZUZpZWxkOiBEYXRlRmllbGQsIGVtYWlsRmllbGQ6IEVtYWlsRmllbGQsIHNlbGVjdGVkRmllbGQ6IFNlbGVjdGVkRmllbGQsIGNoZWNrYm94RmllbGQ6IENoZWNrYm94RmllbGQpe1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbMF0gPSBpbnB1dEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbMV0gPSB0ZXh0QXJlYUZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbMl0gPSBkYXRlRmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYlszXSA9IGVtYWlsRmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYls0XSA9IHNlbGVjdGVkRmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYls1XSA9IGNoZWNrYm94RmllbGQ7XHJcbiAgICB9XHJcbiAgICAqL1xyXG5cclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmllbGRUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0VmFsdWU6IHN0cmluZztcclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9J11gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdGV4dGFyZWFbbmFtZT0nJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9J11gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9J11gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9J11gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2VsZWN0W25hbWU9JyR7dGhpcy5maWVsZFRhYltpXS5uYW1lfSddYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBpZigoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9J11gKSkuY2hlY2tlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gXCJUYWtcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gXCJOaWVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWVsZFRhYltpXS52YWx1ZSA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuZ2V0VmFsdWVSZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06ICR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX08L3A+YFxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0JykuaW5uZXJIVE1MID0gdGhpcy5nZXRWYWx1ZVJlc3VsdDtcclxuICAgICAgICAvLyB0aGlzLmdldFZhbHVlUmVzdWx0ID0gXCIgXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKGRvY3VtZW50SWQ/OiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMucmVzdWx0ICs9IGA8Zm9ybSBuYW1lPSR7dGhpcy5uYW1lfT5gO1xyXG4gICAgICAgIGxldCBmaWVsZFRhYiA9IHRoaXMuZmllbGRUYWI7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmZpZWxkVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICBJbnB1dCwgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgVGV4dEFyZWEsICAgICAgIDFcclxuICAgICAgICAgICAgICAgIERhdGUsICAgICAgICAgICAyXHJcbiAgICAgICAgICAgICAgICBFbWFpbCwgICAgICAgICAgM1xyXG4gICAgICAgICAgICAgICAgU2VsZWN0RmllbGQsICAgIDRcclxuICAgICAgICAgICAgICAgIENoZWNrQm94ICAgICAgICA1XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cInRleHRcIiwgdmFsdWU9XCIke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9XCI+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDx0ZXh0YXJlYSBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCI+JHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfTwvdGV4dGFyZWE+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJkYXRlXCIsIHZhbHVlPVwiJHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfVwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiZW1haWxcIiwgdmFsdWU9XCIke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9XCI+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxzZWxlY3QgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiID5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS52YWx1ZSA9PSB0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnNbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPG9wdGlvbiBpZD1cIiR7dGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdfVwiIHNlbGVjdGVkPiR7dGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8b3B0aW9uIGlkPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnNbal19XCI+JHt0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnNbal19PC9vcHRpb24+YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDwvc2VsZWN0PjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0udmFsdWUgPT0gXCJUYWtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJjaGVja2JveFwiY2hlY2tlZD48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiY2hlY2tib3hcIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPjxpbnB1dCBpZD1cImJ0bi1iYWNrLWZvcm1cIiB2YWx1ZT1cIldzdGVjelwiIHR5cGU9XCJidXR0b25cIj48aW5wdXQgaWQ9XCJidG4tc2F2ZS1mb3JtXCIgdmFsdWU9XCJaYXBpc3pcIiB0eXBlPVwiYnV0dG9uXCI+PC9wPmA7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgKz0gXCI8L2Zvcm0+XCI7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJykuaW5uZXJIVE1MID0gdGhpcy5yZXN1bHQ7XHJcblxyXG4gICAgICAgIGxldCBidG5CYWNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tYmFjay1mb3JtJyk7XHJcbiAgICAgICAgbGV0IGJ0blNhdmVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1zYXZlLWZvcm0nKTtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignbmV3LWRvY3VtZW50JykgPi0xICkge1xyXG4gICAgICAgICAgICBidG5CYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2luZGV4Lmh0bWxcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgYnRuU2F2ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtKCduYW1lJywgZmllbGRUYWIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBidG5CYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2RvY3VtZW50LWxpc3QuaHRtbFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICBidG5TYXZlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IFJvdXRlci5nZXRQYXJhbSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybSgnbmFtZScsIGZpZWxkVGFiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uc2F2ZUVkaXRlZEZvcm0oZG9jdW1lbnRJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZSgpe1xyXG4gICAgICAgIGxldCBkb2MgPSBuZXcgTG9jU3RvcmFnZSgpO1xyXG4gICAgICAgIGRvYy5zYXZlRG9jdW1lbnQodGhpcy5maWVsZFRhYik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RvY3VtZW50IGhhcyBiZWVuIHNhdmVkJyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vaW5kZXguaHRtbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVFZGl0ZWRGb3JtKGRvY3VtZW50SWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7ZG9jdW1lbnRJZH1gLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZpZWxkVGFiKSk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vZG9jdW1lbnQtbGlzdC5odG1sXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL0ludGVyZmFjZXMvZmllbGQnO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiLi4vRW51bWVyYXRvcnMvZmllbGRUeXBlXCI7XHJcbmltcG9ydCB7IElucHV0RmllbGQsIFRleHRBcmVhRmllbGQsIERhdGVGaWVsZCwgRW1haWxGaWVsZCwgU2VsZWN0ZWRGaWVsZCwgQ2hlY2tib3hGaWVsZCB9IGZyb20gJy4vZmllbGRzJztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XHJcbmltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tICcuL2xvY1N0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm1DcmVhdG9yIHtcclxuICAgIGFsbEZvcm1zOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcmVuZGVyUmVzdWx0OiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBuZXdGb3JtKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgZmllbGRzVGFiOiBBcnJheTxGaWVsZD4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkVHlwZVRhYjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gYDxmb3JtIG5hbWU9Zm9ybS1jcmVhdG9yPlxyXG4gICAgICAgICAgICA8cD5OYXp3YSBmb3JtdWxhcnphOiA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9Zm9ybS1jcmVhdG9yLWZvcm1uYW1lPjwvcD5cclxuICAgICAgICAgICAgPHA+RXR5a2lldGE6IDxpbnB1dCB0eXBlPXRleHQgbmFtZT1maWVsZC1sYWJlbD48L3A+XHJcbiAgICAgICAgICAgIDxwPlR5cCBwb2xhOiA8c2VsZWN0IGlkPWZvcm0tY3JlYXRvci1zZWxlY3QgbmFtZT1maWVsZC10eXBlPjwvcD5cclxuICAgICAgICAgICAgPG9wdGlvbj5Qb2xlIGplZG5vbGluaWprb3dlPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24+UG9sZSB0ZWtzdG93ZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uPkRhdGE8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbj5FLW1haWw8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbiBpZD1zZWxlY3RlZC1maWVsZC1jcmVhdG9yPkxpc3RhIHJvendpamFuYTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uPkNoZWNrYm94PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8cD5OYXp3YTogPGlucHV0IHR5cGU9dGV4dCBuYW1lPWZpZWxkLW5hbWU+PC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1mb3JtLWNyZWF0b3Itb3B0aW9ucz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPWZvcm0tY3JlYXRvci1vcHRpb25zLXF1YW50aXR5PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnMtb3B0aW9ucz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPWZvcm0tY3JlYXRvci1vcHRpb25zLWVycm9yIHN0eWxlPVwiY29sb3I6IHJlZFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxwIGlkPWZvcm0tY3JlYXRvci1kZWZhdWx0LXZhbHVlPkRvbXnFm2xuYSB3YXJ0b8WbxIc6IDxpbnB1dCBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWUgdHlwZT10ZXh0PjwvcD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9YnV0dG9uIGlkPWJ0bi1mb3JtLWNyZWF0b3Itc3VibWl0IHZhbHVlPURvZGFqPlxyXG4gICAgICAgICAgICA8L2Zvcm0+YDtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1jcmVhdG9yLWNyZWF0b3InKS5pbm5lckhUTUwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZm9ybVF1YW50aXR5T3B0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itb3B0aW9ucy1xdWFudGl0eWApO1xyXG4gICAgICAgICAgICBsZXQgZm9ybU9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtb3B0aW9uc2ApO1xyXG4gICAgICAgICAgICBsZXQgZm9ybU9wdGlvbnNFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itb3B0aW9ucy1lcnJvcmApO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXREZWZhdWx0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1jcmVhdG9yLWRlZmF1bHQtdmFsdWUnKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdEZvcm1DcmVhdG9yOiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itc2VsZWN0YCk7XHJcbiAgICAgICAgICAgIHNlbGVjdEZvcm1DcmVhdG9yLmFkZEV2ZW50TGlzdGVuZXIoYGNoYW5nZWAsIChldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlLmlubmVySFRNTCA9IGBEb215xZtsbmEgd2FydG/Fm8SHOiA8aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9dGV4dD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPHRleHRhcmVhIG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZT48L3RleHRhcmVhPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9uc0Vycm9yLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlLmlubmVySFRNTCA9IGBEb215xZtsbmEgd2FydG/Fm8SHOiA8aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9ZGF0ZT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPWVtYWlsPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9uc0Vycm9yLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUXVhbnRpdHlPcHRzLmlubmVySFRNTCA9ICdMaWN6YmEgb3Bjamk6IDxpbnB1dCB0eXBlPW51bWJlciBpZD1mb3JtLWNyZWF0b3Itb3B0aW9ucy1xdWFudGl0eS1pbnB1dD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dFF1YW50aXR5T3B0czogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itb3B0aW9ucy1xdWFudGl0eS1pbnB1dGApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UXVhbnRpdHlPcHRzLmFkZEV2ZW50TGlzdGVuZXIoYGNoYW5nZWAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBxdWFudGl0eSA9IGlucHV0UXVhbnRpdHlPcHRzLnZhbHVlIGFzIHVua25vd24gYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9ICdPcGNqZTogPGJyPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHF1YW50aXR5ID4gMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci50ZXh0Q29udGVudCA9IGBNb8W8bmEgd3licmHEhyBtYWtzeW1hbG5pZSAxMDAgb3BjamkhYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgT3BjamEgbnIgJHtpKzF9OiA8aW5wdXQgdHlwZT10ZXh0IG5hbWU9b3B0aW9uJHtpfT48YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zLmlubmVySFRNTCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlLmlubmVySFRNTCA9IGBEb215xZtsbmEgd2FydG/Fm8SHOiA8aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9dGV4dCBkaXNhYmxlZCB2YWx1ZT1cIlphYmxva293YW5hIGZ1bmtjamFcIj5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlLmlubmVySFRNTCA9IGBEb215xZtsbmEgd2FydG/Fm8SHOiA8aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9Y2hlY2tib3g+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUXVhbnRpdHlPcHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGxldCBidG5Gb3JtQ3JlYXRvckFkZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi1mb3JtLWNyZWF0b3Itc3VibWl0YCk7XHJcbiAgICAgICAgICAgIGJ0bkZvcm1DcmVhdG9yQWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1OYW1lRmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtpZD1mb3JtLWNyZWF0b3ItZm9ybW5hbWVdYCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRMYWJlbDogc3RyaW5nID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9ZmllbGQtbGFiZWxdJykpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgZmllbGRUeXBlOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9ZmllbGQtdHlwZV0nKSkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGROYW1lOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1maWVsZC1uYW1lXScpKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZERlZmF1bHRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWVdJykpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRGVmYXVsdFZhbHVlVEEgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlXScpKTtcclxuICAgICAgICAgICAgICAgIGlmKGZpZWxkTGFiZWwubGVuZ3RoIDwgMSB8fCBmaWVsZE5hbWUubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1V6dXBlxYJuaWogd3N6eXN0a2llIHBvbGEnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU5hbWVGaWVsZC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8cD4ke2ZpZWxkTGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7ZmllbGROYW1lfVwiIHR5cGU9dGV4dCB2YWx1ZT1cIiR7ZmllbGREZWZhdWx0VmFsdWUudmFsdWV9XCI+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgSW5wdXRGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5JbnB1dCwgZmllbGREZWZhdWx0VmFsdWUudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8cD4ke2ZpZWxkTGFiZWx9OiA8dGV4dGFyZWEgbmFtZT0ke2ZpZWxkTmFtZX0+JHtmaWVsZERlZmF1bHRWYWx1ZVRBLnZhbHVlfTwvdGV4dGFyZWE+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgVGV4dEFyZWFGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5UZXh0QXJlYSwgZmllbGREZWZhdWx0VmFsdWVUQS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1kYXRlIHZhbHVlPVwiJHtmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZX1cIj48L3A+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc1RhYi5wdXNoKG5ldyBEYXRlRmllbGQoZmllbGROYW1lLCBmaWVsZExhYmVsLCBGaWVsZFR5cGUuRGF0ZSwgZmllbGREZWZhdWx0VmFsdWUudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8cD4ke2ZpZWxkTGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7ZmllbGROYW1lfVwiIHR5cGU9ZW1haWwgdmFsdWU9XCIke2ZpZWxkRGVmYXVsdFZhbHVlLnZhbHVlfVwiPjwvcD5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzVGFiLnB1c2gobmV3IEVtYWlsRmllbGQoZmllbGROYW1lLCBmaWVsZExhYmVsLCBGaWVsZFR5cGUuRW1haWwsIGZpZWxkRGVmYXVsdFZhbHVlLnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYDxwPiR7ZmllbGRMYWJlbH06IDxzZWxlY3QgbmFtZT1cIiR7ZmllbGROYW1lfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dFF1YW50aXR5T3B0czogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itb3B0aW9ucy1xdWFudGl0eS1pbnB1dGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgKGlucHV0UXVhbnRpdHlPcHRzLnZhbHVlIGFzIHVua25vd24gYXMgbnVtYmVyKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYDxvcHRpb24+JHsoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1vcHRpb24ke2l9XWApKS52YWx1ZX08L29wdGlvbj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9b3B0aW9uJHtpfV1gKSkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGA8L3NlbGVjdD48L3A+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGVUYWIucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgU2VsZWN0ZWRGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5TZWxlY3RGaWVsZCwgZmllbGREZWZhdWx0VmFsdWUudmFsdWUsIG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpZWxkRGVmYXVsdFZhbHVlLmNoZWNrZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD48L3A+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgQ2hlY2tib3hGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5DaGVja0JveCwgXCJUYWtcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1cImNoZWNrYm94XCI+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzVGFiLnB1c2gobmV3IENoZWNrYm94RmllbGQoZmllbGROYW1lLCBmaWVsZExhYmVsLCBGaWVsZFR5cGUuQ2hlY2tCb3gsIFwiTmllXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGk8ZmllbGRUeXBlVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gZmllbGRUeXBlVGFiW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGA8aW5wdXQgdHlwZT1idXR0b24gaWQ9J2J0bi1mb3JtY3JlYXRvci1zYXZlLWZvcm0nIHZhbHVlPSdaYXBpc3ogZm9ybXVsYXJ6Jz5gO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci12aWV3YCkuaW5uZXJIVE1MID0gcmVzdWx0O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bkZvcm1DcmVhdG9yU2F2ZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLWZvcm1jcmVhdG9yLXNhdmUtZm9ybWApO1xyXG4gICAgICAgICAgICAgICAgICAgICBidG5Gb3JtQ3JlYXRvclNhdmVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKXtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtpZD1mb3JtLWNyZWF0b3ItZm9ybW5hbWVdYCkpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtKG5hbWUsIGZpZWxkc1RhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRm9ybUNyZWF0b3IoKS5zYXZlRm9ybShmb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2luZGV4Lmh0bWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVGb3JtKGZvcm06IEZvcm0pe1xyXG4gICAgICAgIG5ldyBMb2NTdG9yYWdlKCkuc2F2ZUZvcm0oZm9ybS5uYW1lLCBmb3JtLmZpZWxkVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb3JtKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBmb3JtOiBhbnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2lkfWApKTtcclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb3JtTmFtZShpZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgZm9ybU5hbWU6IHN0cmluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7aWR9YCArICduYW1lJykpO1xyXG4gICAgICAgIHJldHVybiBmb3JtTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb3JtTGlzdCgpe1xyXG4gICAgICAgIGxldCBhbGxGb3JtczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuYWxsRm9ybXM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgPSAnJztcclxuICAgICAgICB0aGlzLmFsbEZvcm1zID0gbmV3IExvY1N0b3JhZ2UoKS5nZXRGb3JtcygpO1xyXG4gICAgICAgIGxldCByZW1vdmVCdXR0b25zOiBBcnJheTxFbGVtZW50PiA9IFssXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gJzx0YWJsZSBib3JkZXI9MT48dHI+PHRkPklEPC90ZD48dGQ+TmF6d2E8L3RkPjx0ZD5XeXBlxYJuaWo8L3RkPjwvdHI+JztcclxuICAgICAgICBmb3IodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuYWxsRm9ybXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZvcm06IGFueSA9IG5ldyBGb3JtQ3JlYXRvcigpLmdldEZvcm0odGhpcy5hbGxGb3Jtc1tpXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSBgPHRyPjx0ZD48cCBpZD1mb3JtLWlkLSR7aX0+JHt0aGlzLmFsbEZvcm1zW2ldfTwvcD48L3RkPjx0ZD4ke3RoaXMuZ2V0Rm9ybU5hbWUodGhpcy5hbGxGb3Jtc1tpXSl9PC90ZD48dGQ+PGEgaHJlZj1cIi4vbmV3LWRvY3VtZW50Lmh0bWw/aWQ9JHt0aGlzLmFsbEZvcm1zW2ldfVwiPld5cGXFgm5pajwvYT48L3RkPjwvdHI+YFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPC90YWJsZT4nXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWxpc3QnKS5pbm5lckhUTUwgPSB0aGlzLnJlbmRlclJlc3VsdDsgLy8gUmVuZGVyaW5nIGxpc3RcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGFTdG9yYWdlIH0gZnJvbSBcIi4uL0ludGVyZmFjZXMvZGF0YVN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuL2Zvcm1cIjtcclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9maWVsZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExvY1N0b3JhZ2UgaW1wbGVtZW50cyBEYXRhU3RvcmFnZSB7XHJcbiAgICBhbGxEb2N1bWVudHM6IEFycmF5PHN0cmluZz4gPSBbXTsgICAgLy8gQ29udGFpbnMgYWxsIHNhdmVkIGRvY3VtZW50cyAoZG9jdW1lbnQgSUQgaW4gc3RyaW5nIGFycmF5KVxyXG4gICAgYWxsRm9ybXM6IEFycmF5PHN0cmluZz4gPSBbXTsgLy8gQ29udGFpbnMgYWxsIGZvcm1zXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRm9ybXMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRm9ybXMnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmFsbEZvcm1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRm9ybXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVEb2N1bWVudChmaWVsZHNWYWx1ZTogYW55KXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWREb2N1bWVudDogc3RyaW5nO1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlkRG9jdW1lbnQgPSB0aW1lc3RhbXAudG9TdHJpbmcoKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpZERvY3VtZW50LCBKU09OLnN0cmluZ2lmeShmaWVsZHNWYWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzLnB1c2goaWREb2N1bWVudCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbERvY3VtZW50c2AsIEpTT04uc3RyaW5naWZ5KHRoaXMuYWxsRG9jdW1lbnRzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkRG9jdW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERvY3VtZW50KGlkRG9jdW1lbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRvY1ZhbHVlczogQXJyYXk8b2JqZWN0PjtcclxuICAgICAgICBkb2NWYWx1ZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkRG9jdW1lbnQpKTtcclxuICAgICAgICByZXR1cm4gZG9jVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREb2N1bWVudHMoKXtcclxuICAgICAgICBsZXQgaWREb2NUYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkRG9jVGFiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW1vdmVEb2N1bWVudChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7aWR9YCk7XHJcbiAgICAgICAgbGV0IGFsbERvY3VtZW50c1RhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBhbGxEb2N1bWVudHNUYWIuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgYWxsRG9jdW1lbnRzVGFiLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRG9jdW1lbnRzYCwgSlNPTi5zdHJpbmdpZnkoYWxsRG9jdW1lbnRzVGFiKSk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlRm9ybShuYW1lOiBzdHJpbmcsIGZpZWxkc1RhYjogYW55KXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxGb3JtcycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxGb3JtcycsICcnKTtcclxuICAgICAgICAgICAgdGhpcy5hbGxGb3JtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWRGb3JtOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgbGV0IGlkRm9ybU5hbWU6IHN0cmluZztcclxuICAgICAgICBpZEZvcm0gPSB0aW1lc3RhbXAudG9TdHJpbmcoKTtcclxuICAgICAgICBpZEZvcm1OYW1lID0gdGltZXN0YW1wLnRvU3RyaW5nKCkgKyBgbmFtZWA7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaWRGb3JtLCBKU09OLnN0cmluZ2lmeShmaWVsZHNUYWIpKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpZEZvcm1OYW1lLCBKU09OLnN0cmluZ2lmeShuYW1lKSk7XHJcbiAgICAgICAgdGhpcy5hbGxGb3Jtcy5wdXNoKGlkRm9ybSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbEZvcm1zYCwgSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxGb3JtcykpO1xyXG4gICAgICAgIHJldHVybiBpZEZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEZvcm0oaWRGb3JtOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBmb3JtRmllbGRzOiBBcnJheTxvYmplY3Q+O1xyXG4gICAgICAgIGZvcm1GaWVsZHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkRm9ybSkpO1xyXG4gICAgICAgIHJldHVybiBmb3JtRmllbGRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRGb3Jtcygpe1xyXG4gICAgICAgIGxldCBpZEZvcm1UYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApKTtcclxuICAgICAgICByZXR1cm4gaWRGb3JtVGFiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW1vdmVGb3JtKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtpZH1gKTtcclxuICAgICAgICBsZXQgYWxsRm9ybXNUYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBhbGxGb3Jtc1RhYi5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBhbGxGb3Jtc1RhYi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbEZvcm1zYCwgSlNPTi5zdHJpbmdpZnkoYWxsRm9ybXNUYWIpKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImV4cG9ydCBjbGFzcyBSb3V0ZXIge1xyXG5cclxuICAgIHN0YXRpYyBnZXRQYXJhbSgpIHtcclxuICAgICAgICBjb25zdCBxdWVyeTogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XHJcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7IFxyXG4gICAgICAgIGNvbnN0IGlkID0gdXJsUGFyYW1zLmdldCgnaWQnKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcblxyXG59Il19
