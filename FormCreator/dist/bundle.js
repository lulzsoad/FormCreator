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
                inputValue = document.querySelector("input[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 1) {
                inputValue = document.querySelector("textarea[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 2) {
                inputValue = document.querySelector("input[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 3) {
                inputValue = document.querySelector("input[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 4) {
                inputValue = document.querySelector("select[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 5) {
                if (document.querySelector("input[name=" + this.fieldTab[i].name + "]").checked) {
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
            var fieldLabel = document.querySelector('input[name=field-label]').value;
            //let fieldType: string = (<HTMLInputElement>document.querySelector('select[name=field-type]')).value;
            var fieldName = document.querySelector('input[name=field-name]').value;
            var fieldDefaultValue = document.querySelector('input[name=field-default-value]');
            var fieldDefaultValueTA = document.querySelector('textarea[name=field-default-value]');
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
                fieldsTab.push(new fields_1.SelectedField(fieldName, fieldLabel, fieldType_1.FieldType.Email, fieldDefaultValue.value, options));
            }
            if (selectFormCreator.selectedIndex == 5) {
                if (fieldDefaultValue.checked == true) {
                    fieldTypeTab.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=\"checkbox\" checked></p>");
                    fieldsTab.push(new fields_1.CheckboxField(fieldName, fieldLabel, fieldType_1.FieldType.Email, "Tak"));
                }
                else {
                    fieldTypeTab.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=\"checkbox\"></p>");
                    fieldsTab.push(new fields_1.CheckboxField(fieldName, fieldLabel, fieldType_1.FieldType.Email, "Nie"));
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
            });
        });
    };
    FormCreator.prototype.saveForm = function (form) {
        new locStorage_1.LocStorage().saveForm(form.fieldTab);
    };
    FormCreator.prototype.getForm = function (id) {
        var form = JSON.parse(localStorage.getItem("" + id));
        return form;
    };
    FormCreator.prototype.renderFormList = function () {
        var allForms = this.allForms;
        this.renderResult = '';
        this.allForms = new locStorage_1.LocStorage().getForms();
        var removeButtons = [,];
        this.renderResult += '<table border=1><tr><td>ID</td><td>Nazwa</td><td>Wypełnij</td></tr>';
        for (var i = 0; i < this.allForms.length; i++) {
            this.renderResult += "<tr><td><p id=form-id-" + i + ">" + this.allForms[i] + "</p></td><td>Nazwa</td><td><a href=\"./new-document.html?id=" + this.allForms[i] + "\">Wype\u0142nij</a></td></tr>";
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
    LocStorage.prototype.saveForm = function (fieldsTab) {
        if (!(localStorage.getItem('allForms'))) {
            localStorage.setItem('allForms', '');
            this.allForms = [];
        }
        var idForm;
        var timestamp = Date.now();
        idForm = timestamp.toString();
        localStorage.setItem(idForm, JSON.stringify(fieldsTab));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlLnRzIiwic3JjL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcy50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybUNyZWF0b3IudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2UudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0lBLCtDQUE4QztBQUU5QywrREFBOEQ7QUFDOUQsbURBQWtEO0FBQ2xELDZEQUE0RDtBQUc1RDtJQUVJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFakMsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRSxDQUFDLENBQUMsRUFBRztZQUN4RixJQUFJLHlCQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUUvQjtRQUNELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQUc7WUFDaEcsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDdEMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pCO1FBQ0Qsb0JBQW9CO1FBQ3BCLElBQUksUUFBUSxD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R0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0wsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FqR0EsQUFpR0MsSUFBQTtBQWpHWSxnQ0FBVTs7Ozs7QUNKdkI7SUFBQTtJQVNBLENBQUM7SUFQVSxlQUFRLEdBQWY7UUFDSSxJQUFNLEtBQUssR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSx3QkFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9zY3JpcHRzL0ludGVyZmFjZXMvZmllbGQnO1xyXG5pbXBvcnQgeyBEYXRhU3RvcmFnZSB9IGZyb20gXCIuL3NjcmlwdHMvSW50ZXJmYWNlcy9kYXRhU3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiLi9zY3JpcHRzL0VudW1lcmF0b3JzL2ZpZWxkVHlwZVwiO1xyXG5pbXBvcnQgeyBJbnB1dEZpZWxkLCBUZXh0QXJlYUZpZWxkLCBEYXRlRmllbGQsIEVtYWlsRmllbGQsIFNlbGVjdGVkRmllbGQsIENoZWNrYm94RmllbGQgfSBmcm9tICcuL3NjcmlwdHMvY2xhc3Nlcy9maWVsZHMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSBcIi4vc2NyaXB0cy9jbGFzc2VzL2Zvcm1cIjtcclxuaW1wb3J0IHsgTG9jU3RvcmFnZSB9IGZyb20gXCIuL3NjcmlwdHMvY2xhc3Nlcy9sb2NTdG9yYWdlXCI7XHJcbmltcG9ydCB7IERvY3VtZW50TGlzdCB9IGZyb20gJy4vc2NyaXB0cy9jbGFzc2VzL2RvY3VtZW50TGlzdCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJy4vc2NyaXB0cy9jbGFzc2VzL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1DcmVhdG9yIH0gZnJvbSAnLi9zY3JpcHRzL2NsYXNzZXMvZm9ybUNyZWF0b3InO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdmFyIHAgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblxyXG4gICAgICAgIC8vIGluZGV4Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdpbmRleCcpID4tMSApIHtcclxuICAgICAgICAgICAgbmV3IEZvcm1DcmVhdG9yKCkubmV3Rm9ybSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9kb2N1bWVudC1saXN0Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdkb2N1bWVudC1saXN0JykgPi0xICkge1xyXG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRMaXN0ID0gbmV3IERvY3VtZW50TGlzdCgpO1xyXG4gICAgICAgICAgICBkb2N1bWVudExpc3QucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG5ldy1kb2N1bWVudC5odG1sXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignbmV3LWRvY3VtZW50JykgPi0xICkge1xyXG4gICAgICAgICAgICAvL25ldyBGb3JtQ3JlYXRvcigpLnJlbmRlckZvcm1MaXN0KCk7XHJcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nID0gUm91dGVyLmdldFBhcmFtKCk7XHJcbiAgICAgICAgICAgIGxldCBnb3R0ZW5Gb3JtID0gbmV3IEZvcm1DcmVhdG9yKCkuZ2V0Rm9ybShpZCk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm0oJ25hbWUnLCBnb3R0ZW5Gb3JtKTtcclxuICAgICAgICAgICAgZm9ybS5yZW5kZXIoaWQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGxldCBuYW1lOiBGaWVsZCA9IG5ldyBJbnB1dEZpZWxkKCduYW1lJywgJ0ltacSZJywgRmllbGRUeXBlLklucHV0LCBcIlwiKTtcclxuICAgICAgICAgICAgLy8gbGV0IGxhc3ROYW1lOiBGaWVsZCA9IG5ldyBJbnB1dEZpZWxkKCdsYXN0TmFtZScsICdOYXp3aXNrbycsIEZpZWxkVHlwZS5JbnB1dCwgXCJcIik7XHJcbiAgICAgICAgICAgIC8vIGxldCBlbWFpbDogRmllbGQgPSBuZXcgRW1haWxGaWVsZCgnZW1haWwnLCAnRS1tYWlsJywgRmllbGRUeXBlLkVtYWlsLCBcIlwiKTtcclxuICAgICAgICAgICAgLy8gbGV0IG9wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbJ0luZm9ybWF0eWthJywgJ0Vrb25vbWV0cmlhJywgJ1BsYXN0eWthJ107XHJcbiAgICAgICAgICAgIC8vIGxldCBmaWVsZE9mU3R1ZHk6IEZpZWxkID0gbmV3IFNlbGVjdGVkRmllbGQoJ2ZpZWxkT2ZTdHVkeScsICdLaWVydW5layBzdHVkacOzdycsIEZpZWxkVHlwZS5TZWxlY3RGaWVsZCwgb3B0aW9uc1swXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIC8vIGxldCBlTGVhcm5pbmdQcmVmZXJhdGlvbjogRmllbGQgPSBuZXcgQ2hlY2tib3hGaWVsZCgnZUxlYXJuJywgJ0N6eSBwcmVmZXJ1amVzeiBlLWxlYXJuaW5nPycsIEZpZWxkVHlwZS5DaGVja0JveCwgJycpO1xyXG4gICAgICAgICAgICAvLyBsZXQgbm90ZXM6IEZpZWxkID0gbmV3IFRleHRBcmVhRmllbGQoJ25vdGVzJywgJ1V3YWdpJywgRmllbGRUeXBlLlRleHRBcmVhLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgZmllbGRUYWI6IEFycmF5PEZpZWxkPiA9IFtuYW1lLCBsYXN0TmFtZSwgZW1haWwsIGZpZWxkT2ZTdHVkeSwgZUxlYXJuaW5nUHJlZmVyYXRpb24sIG5vdGVzXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxldCBmb3JtID0gbmV3IEZvcm0oJ25hbWUnLCBmaWVsZFRhYik7XHJcbiAgICAgICAgICAgIC8vIGZvcm0ucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVkaXQtZG9jdW1lbnQuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2VkaXQtZG9jdW1lbnQnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nID0gUm91dGVyLmdldFBhcmFtKCk7XHJcbiAgICAgICAgICAgIGxldCBkb2N1bWVudCA9IG5ldyBEb2N1bWVudExpc3QoKS5nZXREb2N1bWVudChpZCk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm0oJ25hbWUnLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIGZvcm0ucmVuZGVyKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9ybS1saXN0Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdmb3JtLWxpc3QnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIG5ldyBGb3JtQ3JlYXRvcigpLnJlbmRlckZvcm1MaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICIsImltcG9ydCB7IEFwcCB9IGZyb20gJy4vYXBwJztcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcclxuIiwiZXhwb3J0IGVudW0gRmllbGRUeXBlIHtcclxuICAgIElucHV0LFxyXG4gICAgVGV4dEFyZWEsXHJcbiAgICBEYXRlLFxyXG4gICAgRW1haWwsXHJcbiAgICBTZWxlY3RGaWVsZCxcclxuICAgIENoZWNrQm94XHJcbn0iLCJpbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSBcIi4vbG9jU3RvcmFnZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERvY3VtZW50TGlzdCB7XHJcbiAgICBhbGxEb2N1bWVudHM6IEFycmF5PHN0cmluZz47XHJcbiAgICByZW5kZXJSZXN1bHQ6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgaWYoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRG9jdW1lbnRzJykpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbERvY3VtZW50cycsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmdldERvY3VtZW50TGlzdCgpO1xyXG4gICAgICAgICAgICAvL3RoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldERvY3VtZW50TGlzdCgpIHtcclxuICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IG5ldyBMb2NTdG9yYWdlKCkuZ2V0RG9jdW1lbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBhbGxEb2NzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5hbGxEb2N1bWVudHM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgPSAnJztcclxuICAgICAgICB0aGlzLmdldERvY3VtZW50TGlzdCgpO1xyXG4gICAgICAgIGxldCByZW1vdmVCdXR0b25zOiBBcnJheTxFbGVtZW50PiA9IFssXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gJzx0YWJsZSBib3JkZXI9MT48dHI+PHRkPmlkPC90ZD48dGQ+RWR5dHVqPC90ZD48dGQ+VXN1xYQ8L3RkPjwvdHI+JztcclxuICAgICAgICBmb3IodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuYWxsRG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ICs9IGA8dHI+PHRkPjxwIGlkPWRvYy1pZC0ke2l9PiR7dGhpcy5hbGxEb2N1bWVudHNbaV19PC9wPjwvdGQ+PHRkPjxhIGhyZWY9XCIuL2VkaXQtZG9jdW1lbnQuaHRtbD9pZD0ke3RoaXMuYWxsRG9jdW1lbnRzW2ldfVwiPkVkeXR1ajwvYT48L3RkPjx0ZD48aW5wdXQgaWQ9YnRuLXJlbW92ZS1kb2MtJHthbGxEb2NzW2ldfSB0eXBlPWJ1dHRvbiB2YWx1ZT1Vc3XFhD48L3RkPjwvdHI+YFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPC90YWJsZT4nXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2N1bWVudC1saXN0JykuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXJSZXN1bHQ7IC8vIFJlbmRlcmluZyBsaXN0XHJcblxyXG4gICAgICAgIC8vIEFkZGluZyBjbGljayBldmVudHMgdG8gcmVtb3ZlIGJ1dHRvbnNcclxuICAgICAgICBmb3IobGV0IGogPSAwOyBqPCBhbGxEb2NzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgcmVtb3ZlQnV0dG9uc1tqXSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tcmVtb3ZlLWRvYy0ke2FsbERvY3Nbal19YCk7XHJcbiAgICAgICAgICAgIGlmKHJlbW92ZUJ1dHRvbnNbal0pe1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQnV0dG9uc1tqXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IERvY3VtZW50TGlzdCgpLnJlbW92ZURvY3VtZW50KGFsbERvY3Nbal0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREb2N1bWVudChpZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9jOiBhbnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2lkfWApKTtcclxuICAgICAgICByZXR1cm4gZG9jO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZURvY3VtZW50KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtpZH1gKTtcclxuICAgICAgICBsZXQgYWxsRG9jdW1lbnRzVGFiOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGFsbERvY3VtZW50c1RhYi5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBhbGxEb2N1bWVudHNUYWIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBhbGxEb2N1bWVudHNgLCBKU09OLnN0cmluZ2lmeShhbGxEb2N1bWVudHNUYWIpKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGaWVsZCB9IGZyb20gXCIuLi9JbnRlcmZhY2VzL2ZpZWxkXCI7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gXCIuLi9FbnVtZXJhdG9ycy9maWVsZFR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dEZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBvcHRpb25zOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94RmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9maWVsZCc7XHJcbmltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tICcuL2xvY1N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBEb2N1bWVudExpc3QgfSBmcm9tICcuL2RvY3VtZW50TGlzdCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJy4vcm91dGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3Jte1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZmllbGRUYWI6IEFycmF5PEZpZWxkPjtcclxuICAgIHJlc3VsdDogc3RyaW5nID0gJyAnOyAvLyByZW5kZXIgcmVzdWx0XHJcbiAgICBnZXRWYWx1ZVJlc3VsdDogc3RyaW5nID0gJyAnO1xyXG4gICAgSUQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+KSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiID0gZmllbGRUYWI7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgY29uc3RydWN0b3IgKGlucHV0RmllbGQ6IElucHV0RmllbGQsIHRleHRBcmVhRmllbGQ6IFRleHRBcmVhRmllbGQsIGRhdGVGaWVsZDogRGF0ZUZpZWxkLCBlbWFpbEZpZWxkOiBFbWFpbEZpZWxkLCBzZWxlY3RlZEZpZWxkOiBTZWxlY3RlZEZpZWxkLCBjaGVja2JveEZpZWxkOiBDaGVja2JveEZpZWxkKXtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzBdID0gaW5wdXRGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzFdID0gdGV4dEFyZWFGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzJdID0gZGF0ZUZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbM10gPSBlbWFpbEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbNF0gPSBzZWxlY3RlZEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbNV0gPSBjaGVja2JveEZpZWxkO1xyXG4gICAgfVxyXG4gICAgKi9cclxuXHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmZpZWxkVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGB0ZXh0YXJlYVtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBpZigoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLmNoZWNrZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiVGFrXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiTmllXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRUYWJbaV0udmFsdWUgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGlzLmdldFZhbHVlUmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiAke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9PC9wPmBcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLmlubmVySFRNTCA9IHRoaXMuZ2V0VmFsdWVSZXN1bHQ7XHJcbiAgICAgICAgLy8gdGhpcy5nZXRWYWx1ZVJlc3VsdCA9IFwiIFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihkb2N1bWVudElkPzogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBgPGZvcm0gbmFtZT0ke3RoaXMubmFtZX0+YDtcclxuICAgICAgICBsZXQgZmllbGRUYWIgPSB0aGlzLmZpZWxkVGFiO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5maWVsZFRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgSW5wdXQsICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgIFRleHRBcmVhLCAgICAgICAxXHJcbiAgICAgICAgICAgICAgICBEYXRlLCAgICAgICAgICAgMlxyXG4gICAgICAgICAgICAgICAgRW1haWwsICAgICAgICAgIDNcclxuICAgICAgICAgICAgICAgIFNlbGVjdEZpZWxkLCAgICA0XHJcbiAgICAgICAgICAgICAgICBDaGVja0JveCAgICAgICAgNVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJ0ZXh0XCIsIHZhbHVlPVwiJHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfVwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8dGV4dGFyZWEgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiPiR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX08L3RleHRhcmVhPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiZGF0ZVwiLCB2YWx1ZT1cIiR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX1cIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImVtYWlsXCIsIHZhbHVlPVwiJHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfVwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8c2VsZWN0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiA+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5maWVsZFRhYltpXS5vcHRpb25zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0udmFsdWUgPT0gdGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxvcHRpb24gaWQ9XCIke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX1cIiBzZWxlY3RlZD4ke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPG9wdGlvbiBpZD1cIiR7dGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdfVwiPiR7dGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8L3NlbGVjdD48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLnZhbHVlID09IFwiVGFrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiY2hlY2tib3hcImNoZWNrZWQ+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImNoZWNrYm94XCI+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD48aW5wdXQgaWQ9XCJidG4tYmFjay1mb3JtXCIgdmFsdWU9XCJXc3RlY3pcIiB0eXBlPVwiYnV0dG9uXCI+PGlucHV0IGlkPVwiYnRuLXNhdmUtZm9ybVwiIHZhbHVlPVwiWmFwaXN6XCIgdHlwZT1cImJ1dHRvblwiPjwvcD5gO1xyXG4gICAgICAgIHRoaXMucmVzdWx0ICs9IFwiPC9mb3JtPlwiO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpLmlubmVySFRNTCA9IHRoaXMucmVzdWx0O1xyXG5cclxuICAgICAgICBsZXQgYnRuQmFja0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWJhY2stZm9ybScpO1xyXG4gICAgICAgIGxldCBidG5TYXZlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tc2F2ZS1mb3JtJyk7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ25ldy1kb2N1bWVudCcpID4tMSApIHtcclxuICAgICAgICAgICAgYnRuQmFja0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGJ0blNhdmVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybSgnbmFtZScsIGZpZWxkVGFiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnRuQmFja0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9kb2N1bWVudC1saXN0Lmh0bWxcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgYnRuU2F2ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBSb3V0ZXIuZ2V0UGFyYW0oKTtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm0oJ25hbWUnLCBmaWVsZFRhYik7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnNhdmVFZGl0ZWRGb3JtKGRvY3VtZW50SWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKXtcclxuICAgICAgICBsZXQgZG9jID0gbmV3IExvY1N0b3JhZ2UoKTtcclxuICAgICAgICBkb2Muc2F2ZURvY3VtZW50KHRoaXMuZmllbGRUYWIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEb2N1bWVudCBoYXMgYmVlbiBzYXZlZCcpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2luZGV4Lmh0bWxcIjtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlRWRpdGVkRm9ybShkb2N1bWVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke2RvY3VtZW50SWR9YCwgSlNPTi5zdHJpbmdpZnkodGhpcy5maWVsZFRhYikpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2RvY3VtZW50LWxpc3QuaHRtbFwiO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9JbnRlcmZhY2VzL2ZpZWxkJztcclxuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSBcIi4uL0VudW1lcmF0b3JzL2ZpZWxkVHlwZVwiO1xyXG5pbXBvcnQgeyBJbnB1dEZpZWxkLCBUZXh0QXJlYUZpZWxkLCBEYXRlRmllbGQsIEVtYWlsRmllbGQsIFNlbGVjdGVkRmllbGQsIENoZWNrYm94RmllbGQgfSBmcm9tICcuL2ZpZWxkcyc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG5pbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSAnLi9sb2NTdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ3JlYXRvciB7XHJcbiAgICBhbGxGb3JtczogQXJyYXk8c3RyaW5nPjtcclxuICAgIHJlbmRlclJlc3VsdDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgbmV3Rm9ybSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgbGV0IGZpZWxkc1RhYjogQXJyYXk8RmllbGQ+ID0gW107XHJcbiAgICAgICAgICAgIGxldCBmaWVsZFR5cGVUYWI6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IGA8Zm9ybSBuYW1lPWZvcm0tY3JlYXRvcj5cclxuICAgICAgICAgICAgPHA+TmF6d2EgZm9ybXVsYXJ6YTogPGlucHV0IHR5cGU9J3RleHQnIGlkPWZvcm0tY3JlYXRvci1mb3JtbmFtZT48L3A+XHJcbiAgICAgICAgICAgIDxwPkV0eWtpZXRhOiA8aW5wdXQgdHlwZT10ZXh0IG5hbWU9ZmllbGQtbGFiZWw+PC9wPlxyXG4gICAgICAgICAgICA8cD5UeXAgcG9sYTogPHNlbGVjdCBpZD1mb3JtLWNyZWF0b3Itc2VsZWN0IG5hbWU9ZmllbGQtdHlwZT48L3A+XHJcbiAgICAgICAgICAgIDxvcHRpb24+UG9sZSBqZWRub2xpbmlqa293ZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uPlBvbGUgdGVrc3Rvd2U8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbj5EYXRhPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24+RS1tYWlsPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gaWQ9c2VsZWN0ZWQtZmllbGQtY3JlYXRvcj5MaXN0YSByb3p3aWphbmE8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbj5DaGVja2JveDwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgPHA+TmF6d2E6IDxpbnB1dCB0eXBlPXRleHQgbmFtZT1maWVsZC1uYW1lPjwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1mb3JtLWNyZWF0b3Itb3B0aW9ucy1xdWFudGl0eT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPWZvcm0tY3JlYXRvci1vcHRpb25zLW9wdGlvbnM+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1mb3JtLWNyZWF0b3Itb3B0aW9ucy1lcnJvciBzdHlsZT1cImNvbG9yOiByZWRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8cCBpZD1mb3JtLWNyZWF0b3ItZGVmYXVsdC12YWx1ZT5Eb215xZtsbmEgd2FydG/Fm8SHOiA8aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9dGV4dD48L3A+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPWJ1dHRvbiBpZD1idG4tZm9ybS1jcmVhdG9yLXN1Ym1pdCB2YWx1ZT1Eb2Rhaj5cclxuICAgICAgICAgICAgPC9mb3JtPmA7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tY3JlYXRvci1jcmVhdG9yJykuaW5uZXJIVE1MID0gcmVzdWx0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGZvcm1RdWFudGl0eU9wdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHlgKTtcclxuICAgICAgICAgICAgbGV0IGZvcm1PcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci1vcHRpb25zLW9wdGlvbnNgKTtcclxuICAgICAgICAgICAgbGV0IGZvcm1PcHRpb25zRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtZXJyb3JgKTtcclxuICAgICAgICAgICAgbGV0IGlucHV0RGVmYXVsdFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tY3JlYXRvci1kZWZhdWx0LXZhbHVlJyk7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RGb3JtQ3JlYXRvcjogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLXNlbGVjdGApO1xyXG4gICAgICAgICAgICBzZWxlY3RGb3JtQ3JlYXRvci5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VgLCAoZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPXRleHQ+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUXVhbnRpdHlPcHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUuaW5uZXJIVE1MID0gYERvbXnFm2xuYSB3YXJ0b8WbxIc6IDx0ZXh0YXJlYSBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWU+PC90ZXh0YXJlYT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPWRhdGU+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUXVhbnRpdHlPcHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUuaW5uZXJIVE1MID0gYERvbXnFm2xuYSB3YXJ0b8WbxIc6IDxpbnB1dCBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWUgdHlwZT1lbWFpbD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnTGljemJhIG9wY2ppOiA8aW5wdXQgdHlwZT1udW1iZXIgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHktaW5wdXQ+JztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRRdWFudGl0eU9wdHM6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHktaW5wdXRgKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFF1YW50aXR5T3B0cy5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VgLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcXVhbnRpdHkgPSBpbnB1dFF1YW50aXR5T3B0cy52YWx1ZSBhcyB1bmtub3duIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnT3BjamU6IDxicj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihxdWFudGl0eSA+IDEwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IudGV4dENvbnRlbnQgPSBgTW/FvG5hIHd5YnJhxIcgbWFrc3ltYWxuaWUgMTAwIG9wY2ppIWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYE9wY2phIG5yICR7aSsxfTogPGlucHV0IHR5cGU9dGV4dCBuYW1lPW9wdGlvbiR7aX0+PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPXRleHQgZGlzYWJsZWQgdmFsdWU9XCJaYWJsb2tvd2FuYSBmdW5rY2phXCI+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA1KXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPWNoZWNrYm94PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9uc0Vycm9yLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBsZXQgYnRuRm9ybUNyZWF0b3JBZGRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tZm9ybS1jcmVhdG9yLXN1Ym1pdGApO1xyXG4gICAgICAgICAgICBidG5Gb3JtQ3JlYXRvckFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZExhYmVsOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1maWVsZC1sYWJlbF0nKSkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBmaWVsZFR5cGU6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3RbbmFtZT1maWVsZC10eXBlXScpKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZE5hbWU6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPWZpZWxkLW5hbWVdJykpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRGVmYXVsdFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZV0nKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGREZWZhdWx0VmFsdWVUQSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWVdJykpO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT10ZXh0IHZhbHVlPVwiJHtmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZX1cIj48L3A+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzVGFiLnB1c2gobmV3IElucHV0RmllbGQoZmllbGROYW1lLCBmaWVsZExhYmVsLCBGaWVsZFR5cGUuSW5wdXQsIGZpZWxkRGVmYXVsdFZhbHVlLnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGVUYWIucHVzaChgPHA+JHtmaWVsZExhYmVsfTogPHRleHRhcmVhIG5hbWU9JHtmaWVsZE5hbWV9PiR7ZmllbGREZWZhdWx0VmFsdWVUQS52YWx1ZX08L3RleHRhcmVhPjwvcD5gKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgVGV4dEFyZWFGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5UZXh0QXJlYSwgZmllbGREZWZhdWx0VmFsdWVUQS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1kYXRlIHZhbHVlPVwiJHtmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZX1cIj48L3A+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzVGFiLnB1c2gobmV3IERhdGVGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5EYXRlLCBmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1lbWFpbCB2YWx1ZT1cIiR7ZmllbGREZWZhdWx0VmFsdWUudmFsdWV9XCI+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkc1RhYi5wdXNoKG5ldyBFbWFpbEZpZWxkKGZpZWxkTmFtZSwgZmllbGRMYWJlbCwgRmllbGRUeXBlLkVtYWlsLCBmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGA8cD4ke2ZpZWxkTGFiZWx9OiA8c2VsZWN0IG5hbWU9XCIke2ZpZWxkTmFtZX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRRdWFudGl0eU9wdHM6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHktaW5wdXRgKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgKGlucHV0UXVhbnRpdHlPcHRzLnZhbHVlIGFzIHVua25vd24gYXMgbnVtYmVyKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgPG9wdGlvbj4keyg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPW9wdGlvbiR7aX1dYCkpLnZhbHVlfTwvb3B0aW9uPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKCg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPW9wdGlvbiR7aX1dYCkpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgPC9zZWxlY3Q+PC9wPmBcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGVUYWIucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkc1RhYi5wdXNoKG5ldyBTZWxlY3RlZEZpZWxkKGZpZWxkTmFtZSwgZmllbGRMYWJlbCwgRmllbGRUeXBlLkVtYWlsLCBmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZSwgb3B0aW9ucykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmllbGREZWZhdWx0VmFsdWUuY2hlY2tlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8cD4ke2ZpZWxkTGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7ZmllbGROYW1lfVwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgQ2hlY2tib3hGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5FbWFpbCwgXCJUYWtcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1cImNoZWNrYm94XCI+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgQ2hlY2tib3hGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5FbWFpbCwgXCJOaWVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGZpZWxkVHlwZVRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gZmllbGRUeXBlVGFiW2ldO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGA8aW5wdXQgdHlwZT1idXR0b24gaWQ9J2J0bi1mb3JtY3JlYXRvci1zYXZlLWZvcm0nIHZhbHVlPSdaYXBpc3ogZm9ybXVsYXJ6Jz5gO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itdmlld2ApLmlubmVySFRNTCA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuRm9ybUNyZWF0b3JTYXZlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tZm9ybWNyZWF0b3Itc2F2ZS1mb3JtYCk7XHJcbiAgICAgICAgICAgICAgICAgYnRuRm9ybUNyZWF0b3JTYXZlRm9ybS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbaWQ9Zm9ybS1jcmVhdG9yLWZvcm1uYW1lXWApKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtKG5hbWUsIGZpZWxkc1RhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgIG5ldyBGb3JtQ3JlYXRvcigpLnNhdmVGb3JtKGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUZvcm0oZm9ybTogRm9ybSl7XHJcbiAgICAgICAgbmV3IExvY1N0b3JhZ2UoKS5zYXZlRm9ybShmb3JtLmZpZWxkVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb3JtKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBmb3JtOiBhbnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2lkfWApKTtcclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb3JtTGlzdCgpe1xyXG4gICAgICAgIGxldCBhbGxGb3JtczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuYWxsRm9ybXM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgPSAnJztcclxuICAgICAgICB0aGlzLmFsbEZvcm1zID0gbmV3IExvY1N0b3JhZ2UoKS5nZXRGb3JtcygpO1xyXG4gICAgICAgIGxldCByZW1vdmVCdXR0b25zOiBBcnJheTxFbGVtZW50PiA9IFssXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gJzx0YWJsZSBib3JkZXI9MT48dHI+PHRkPklEPC90ZD48dGQ+TmF6d2E8L3RkPjx0ZD5XeXBlxYJuaWo8L3RkPjwvdHI+JztcclxuICAgICAgICBmb3IodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuYWxsRm9ybXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gYDx0cj48dGQ+PHAgaWQ9Zm9ybS1pZC0ke2l9PiR7dGhpcy5hbGxGb3Jtc1tpXX08L3A+PC90ZD48dGQ+TmF6d2E8L3RkPjx0ZD48YSBocmVmPVwiLi9uZXctZG9jdW1lbnQuaHRtbD9pZD0ke3RoaXMuYWxsRm9ybXNbaV19XCI+V3lwZcWCbmlqPC9hPjwvdGQ+PC90cj5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ICs9ICc8L3RhYmxlPidcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tbGlzdCcpLmlubmVySFRNTCA9IHRoaXMucmVuZGVyUmVzdWx0OyAvLyBSZW5kZXJpbmcgbGlzdFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGF0YVN0b3JhZ2UgfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9kYXRhU3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSBcIi4vZm9ybVwiO1xyXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gXCIuLi9JbnRlcmZhY2VzL2ZpZWxkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jU3RvcmFnZSBpbXBsZW1lbnRzIERhdGFTdG9yYWdlIHtcclxuICAgIGFsbERvY3VtZW50czogQXJyYXk8c3RyaW5nPiA9IFtdOyAgICAvLyBDb250YWlucyBhbGwgc2F2ZWQgZG9jdW1lbnRzIChkb2N1bWVudCBJRCBpbiBzdHJpbmcgYXJyYXkpXHJcbiAgICBhbGxGb3JtczogQXJyYXk8c3RyaW5nPiA9IFtdOyAvLyBDb250YWlucyBhbGwgZm9ybXNcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGlmKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbERvY3VtZW50cycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxEb2N1bWVudHMnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKS5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxGb3JtcycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxGb3JtcycsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbEZvcm1zYCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRm9ybXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hbGxGb3JtcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbEZvcm1zYCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZURvY3VtZW50KGZpZWxkc1ZhbHVlOiBhbnkpe1xyXG4gICAgICAgIGlmKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbERvY3VtZW50cycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxEb2N1bWVudHMnLCAnJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZERvY3VtZW50OiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWREb2N1bWVudCA9IHRpbWVzdGFtcC50b1N0cmluZygpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGlkRG9jdW1lbnQsIEpTT04uc3RyaW5naWZ5KGZpZWxkc1ZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMucHVzaChpZERvY3VtZW50KTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRG9jdW1lbnRzYCwgSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxEb2N1bWVudHMpKTtcclxuICAgICAgICByZXR1cm4gaWREb2N1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRG9jdW1lbnQoaWREb2N1bWVudDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9jVmFsdWVzOiBBcnJheTxvYmplY3Q+O1xyXG4gICAgICAgIGRvY1ZhbHVlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oaWREb2N1bWVudCkpO1xyXG4gICAgICAgIHJldHVybiBkb2NWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERvY3VtZW50cygpe1xyXG4gICAgICAgIGxldCBpZERvY1RhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApKTtcclxuICAgICAgICByZXR1cm4gaWREb2NUYWI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZURvY3VtZW50KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtpZH1gKTtcclxuICAgICAgICBsZXQgYWxsRG9jdW1lbnRzVGFiOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGFsbERvY3VtZW50c1RhYi5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBhbGxEb2N1bWVudHNUYWIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBhbGxEb2N1bWVudHNgLCBKU09OLnN0cmluZ2lmeShhbGxEb2N1bWVudHNUYWIpKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVGb3JtKGZpZWxkc1RhYjogYW55KXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxGb3JtcycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxGb3JtcycsICcnKTtcclxuICAgICAgICAgICAgdGhpcy5hbGxGb3JtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWRGb3JtOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWRGb3JtID0gdGltZXN0YW1wLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaWRGb3JtLCBKU09OLnN0cmluZ2lmeShmaWVsZHNUYWIpKTtcclxuICAgICAgICB0aGlzLmFsbEZvcm1zLnB1c2goaWRGb3JtKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRm9ybXNgLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFsbEZvcm1zKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkRm9ybTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRm9ybShpZEZvcm06IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGZvcm1GaWVsZHM6IEFycmF5PG9iamVjdD47XHJcbiAgICAgICAgZm9ybUZpZWxkcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oaWRGb3JtKSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1GaWVsZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEZvcm1zKCl7XHJcbiAgICAgICAgbGV0IGlkRm9ybVRhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbEZvcm1zYCkpO1xyXG4gICAgICAgIHJldHVybiBpZEZvcm1UYWI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZUZvcm0oaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke2lkfWApO1xyXG4gICAgICAgIGxldCBhbGxGb3Jtc1RhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbEZvcm1zYCkpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGFsbEZvcm1zVGFiLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGFsbEZvcm1zVGFiLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRm9ybXNgLCBKU09OLnN0cmluZ2lmeShhbGxGb3Jtc1RhYikpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBSb3V0ZXIge1xyXG5cclxuICAgIHN0YXRpYyBnZXRQYXJhbSgpIHtcclxuICAgICAgICBjb25zdCBxdWVyeTogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XHJcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7IFxyXG4gICAgICAgIGNvbnN0IGlkID0gdXJsUGFyYW1zLmdldCgnaWQnKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcblxyXG59Il19
