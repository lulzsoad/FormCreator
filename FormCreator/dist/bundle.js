(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var fieldType_1 = require("./scripts/Enumerators/fieldType");
var fields_1 = require("./scripts/classes/fields");
var form_1 = require("./scripts/classes/form");
var documentList_1 = require("./scripts/classes/documentList");
var router_1 = require("./scripts/classes/router");
var App = /** @class */ (function () {
    function App() {
        var p = window.location.pathname;
        // index.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('index') > -1) {
            var result = '';
            var fieldTypeTab_1 = [];
            result += "<form name=form-creator>\n            <p>Etykieta: <input type=text name=field-label></p>\n            <p>Typ pola: <select id=form-creator-select name=field-type></p>\n            <option>Pole jednolinijkowe</option>\n            <option>Pole tekstowe</option>\n            <option>Data</option>\n            <option>E-mail</option>\n            <option id=selected-field-creator>Lista rozwijana</option>\n            <option>Checkbox</option>\n            </select>\n            <p>Nazwa: <input type=text name=field-name></p>\n                <div id=form-creator-options>\n                    <div id=form-creator-options-quantity></div>\n                    <div id=form-creator-options-options></div>\n                    <div id=form-creator-options-error style=\"color: red\"></div>\n                </div>\n            <p id=form-creator-default-value>Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=text></p>\n            <input type=button id=btn-form-creator-submit value=Dodaj>\n            </form>";
            document.getElementById('form-creator-creator').innerHTML = result;
            var formQuantityOpts_1 = document.querySelector("#form-creator-options-quantity");
            var formOptions_1 = document.querySelector("#form-creator-options-options");
            var formOptionsError_1 = document.querySelector("#form-creator-options-error");
            var inputDefaultValue_1 = document.querySelector('#form-creator-default-value');
            var selectFormCreator = document.querySelector("#form-creator-select");
            selectFormCreator.addEventListener("change", function (event) {
                if (selectFormCreator.selectedIndex == 0) {
                    inputDefaultValue_1.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=text>";
                    formQuantityOpts_1.innerHTML = '';
                    formOptions_1.innerHTML = "";
                    formOptionsError_1.innerHTML = "";
                }
                else if (selectFormCreator.selectedIndex == 1) {
                    inputDefaultValue_1.innerHTML = "Domy\u015Blna warto\u015B\u0107: <textarea name=field-default-value></textarea>";
                    formQuantityOpts_1.innerHTML = '';
                    formOptions_1.innerHTML = "";
                    formOptionsError_1.innerHTML = "";
                }
                else if (selectFormCreator.selectedIndex == 2) {
                    inputDefaultValue_1.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=date>";
                    formQuantityOpts_1.innerHTML = '';
                    formOptions_1.innerHTML = "";
                    formOptionsError_1.innerHTML = "";
                }
                else if (selectFormCreator.selectedIndex == 3) {
                    inputDefaultValue_1.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=email>";
                    formQuantityOpts_1.innerHTML = '';
                    formOptions_1.innerHTML = "";
                    formOptionsError_1.innerHTML = "";
                }
                else if (selectFormCreator.selectedIndex == 4) {
                    formQuantityOpts_1.innerHTML = 'Liczba opcji: <input type=number id=form-creator-options-quantity-input>';
                    var inputQuantityOpts_1 = document.querySelector("#form-creator-options-quantity-input");
                    inputQuantityOpts_1.addEventListener("change", function () {
                        var quantity = inputQuantityOpts_1.value;
                        var result = 'Opcje: <br>';
                        if (quantity > 100)
                            formOptionsError_1.textContent = "Mo\u017Cna wybra\u0107 maksymalnie 100 opcji!";
                        else {
                            for (var i = 0; i < quantity; i++) {
                                result += "Opcja nr " + (i + 1) + ": <input type=text name=option" + i + "><br>";
                            }
                            formOptions_1.innerHTML = result;
                        }
                    });
                    inputDefaultValue_1.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=text disabled value=\"Zablokowana funkcja\">";
                }
                else if (selectFormCreator.selectedIndex == 5) {
                    inputDefaultValue_1.innerHTML = "Domy\u015Blna warto\u015B\u0107: <input name=field-default-value type=checkbox>";
                    formQuantityOpts_1.innerHTML = '';
                    formOptions_1.innerHTML = "";
                    formOptionsError_1.innerHTML = "";
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
                    fieldTypeTab_1.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=text value=\"" + fieldDefaultValue.value + "\"></p>");
                }
                if (selectFormCreator.selectedIndex == 1) {
                    fieldTypeTab_1.push("<p>" + fieldLabel + ": <textarea name=" + fieldName + ">" + fieldDefaultValueTA.value + "</textarea></p>");
                }
                if (selectFormCreator.selectedIndex == 2) {
                    fieldTypeTab_1.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=date value=\"" + fieldDefaultValue.value + "\"></p>");
                }
                if (selectFormCreator.selectedIndex == 3) {
                    fieldTypeTab_1.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=email value=\"" + fieldDefaultValue.value + "\"></p>");
                }
                if (selectFormCreator.selectedIndex == 4) {
                    var result_1 = "<p>" + fieldLabel + ": <select name=\"" + fieldName + "\">";
                    var inputQuantityOpts = document.querySelector("#form-creator-options-quantity-input");
                    for (var i = 0; i < inputQuantityOpts.value; i++) {
                        result_1 += "<option>" + document.querySelector("input[name=option" + i + "]").value + "</option>";
                    }
                    result_1 += "</select></p>";
                    fieldTypeTab_1.push(result_1);
                }
                if (selectFormCreator.selectedIndex == 5) {
                    if (fieldDefaultValue.checked == true)
                        fieldTypeTab_1.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=\"checkbox\" checked></p>");
                    else
                        fieldTypeTab_1.push("<p>" + fieldLabel + ": <input name=\"" + fieldName + "\" type=\"checkbox\"></p>");
                }
                for (var i = 0; i < fieldTypeTab_1.length; i++) {
                    result += fieldTypeTab_1[i];
                }
                document.querySelector("#form-creator-view").innerHTML = result;
            });
        }
        //document-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('document-list') > -1) {
            var documentList = new documentList_1.DocumentList();
            documentList.render();
        }
        // new-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') > -1) {
            var name_1 = new fields_1.InputField('name', 'Imię', fieldType_1.FieldType.Input, "");
            var lastName = new fields_1.InputField('lastName', 'Nazwisko', fieldType_1.FieldType.Input, "");
            var email = new fields_1.EmailField('email', 'E-mail', fieldType_1.FieldType.Email, "");
            var options = ['Informatyka', 'Ekonometria', 'Plastyka'];
            var fieldOfStudy = new fields_1.SelectedField('fieldOfStudy', 'Kierunek studiów', fieldType_1.FieldType.SelectField, options[0], options);
            var eLearningPreferation = new fields_1.CheckboxField('eLearn', 'Czy preferujesz e-learning?', fieldType_1.FieldType.CheckBox, '');
            var notes = new fields_1.TextAreaField('notes', 'Uwagi', fieldType_1.FieldType.TextArea, '');
            var fieldTab = [name_1, lastName, email, fieldOfStudy, eLearningPreferation, notes];
            var form = new form_1.Form("form1", fieldTab);
            form.render();
        }
        // edit-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('edit-document') > -1) {
            var id = router_1.Router.getParam();
            var document_1 = new documentList_1.DocumentList().getDocument(id);
            var form = new form_1.Form('form', document_1);
            form.render(id);
        }
    }
    return App;
}());
exports.App = App;
},{"./scripts/Enumerators/fieldType":3,"./scripts/classes/documentList":4,"./scripts/classes/fields":5,"./scripts/classes/form":6,"./scripts/classes/router":8}],2:[function(require,module,exports){
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
},{"./locStorage":7}],5:[function(require,module,exports){
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
                var form = new Form("form", fieldTab);
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
                var form = new Form("form", fieldTab);
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
},{"./locStorage":7,"./router":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocStorage = void 0;
var LocStorage = /** @class */ (function () {
    function LocStorage() {
        this.allDocuments = []; // Contains all saved documents (document ID in string array)
        if (!(localStorage.getItem('allDocuments'))) {
            localStorage.setItem('allDocuments', '');
        }
        if (localStorage.getItem("allDocuments").length < 1) {
            this.allDocuments = [];
        }
        else {
            this.allDocuments = JSON.parse(localStorage.getItem("allDocuments"));
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
    return LocStorage;
}());
exports.LocStorage = LocStorage;
},{}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlLnRzIiwic3JjL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcy50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvbG9jU3RvcmFnZS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDRUEsNkRBQTREO0FBQzVELG1EQUEwSDtBQUMxSCwrQ0FBOEM7QUFFOUMsK0RBQThEO0FBQzlELG1EQUFrRDtBQUdsRDtJQUVJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFakMsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRSxDQUFDLENBQUMsRUFBRztZQUN4RixJQUFJLE1BQU0sR0FBVyxFQUFFLENBQUM7WUFDeEIsSUFBSSxjQUFZLEdBQWtCLEVBQUUsQ0FBQztZQUNyQyxNQUFNLElBQUksMmdDQWtCRixDQUFDO1lBR1QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFFbkUsSUFBSSxrQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxhQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzFFLElBQUksa0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FB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QUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSx3QkFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9zY3JpcHRzL0ludGVyZmFjZXMvZmllbGQnO1xyXG5pbXBvcnQgeyBEYXRhU3RvcmFnZSB9IGZyb20gXCIuL3NjcmlwdHMvSW50ZXJmYWNlcy9kYXRhU3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiLi9zY3JpcHRzL0VudW1lcmF0b3JzL2ZpZWxkVHlwZVwiO1xyXG5pbXBvcnQgeyBJbnB1dEZpZWxkLCBUZXh0QXJlYUZpZWxkLCBEYXRlRmllbGQsIEVtYWlsRmllbGQsIFNlbGVjdGVkRmllbGQsIENoZWNrYm94RmllbGQgfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvZmllbGRzXCI7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvZm9ybVwiO1xyXG5pbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgRG9jdW1lbnRMaXN0IH0gZnJvbSAnLi9zY3JpcHRzL2NsYXNzZXMvZG9jdW1lbnRMaXN0JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NsYXNzZXMvcm91dGVyJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHZhciBwID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5cclxuICAgICAgICAvLyBpbmRleC5odG1sXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignaW5kZXgnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgZmllbGRUeXBlVGFiOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBgPGZvcm0gbmFtZT1mb3JtLWNyZWF0b3I+XHJcbiAgICAgICAgICAgIDxwPkV0eWtpZXRhOiA8aW5wdXQgdHlwZT10ZXh0IG5hbWU9ZmllbGQtbGFiZWw+PC9wPlxyXG4gICAgICAgICAgICA8cD5UeXAgcG9sYTogPHNlbGVjdCBpZD1mb3JtLWNyZWF0b3Itc2VsZWN0IG5hbWU9ZmllbGQtdHlwZT48L3A+XHJcbiAgICAgICAgICAgIDxvcHRpb24+UG9sZSBqZWRub2xpbmlqa293ZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uPlBvbGUgdGVrc3Rvd2U8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbj5EYXRhPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24+RS1tYWlsPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gaWQ9c2VsZWN0ZWQtZmllbGQtY3JlYXRvcj5MaXN0YSByb3p3aWphbmE8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbj5DaGVja2JveDwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgPHA+TmF6d2E6IDxpbnB1dCB0eXBlPXRleHQgbmFtZT1maWVsZC1uYW1lPjwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1mb3JtLWNyZWF0b3Itb3B0aW9ucy1xdWFudGl0eT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPWZvcm0tY3JlYXRvci1vcHRpb25zLW9wdGlvbnM+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1mb3JtLWNyZWF0b3Itb3B0aW9ucy1lcnJvciBzdHlsZT1cImNvbG9yOiByZWRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8cCBpZD1mb3JtLWNyZWF0b3ItZGVmYXVsdC12YWx1ZT5Eb215xZtsbmEgd2FydG/Fm8SHOiA8aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9dGV4dD48L3A+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPWJ1dHRvbiBpZD1idG4tZm9ybS1jcmVhdG9yLXN1Ym1pdCB2YWx1ZT1Eb2Rhaj5cclxuICAgICAgICAgICAgPC9mb3JtPmA7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tY3JlYXRvci1jcmVhdG9yJykuaW5uZXJIVE1MID0gcmVzdWx0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGZvcm1RdWFudGl0eU9wdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHlgKTtcclxuICAgICAgICAgICAgbGV0IGZvcm1PcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci1vcHRpb25zLW9wdGlvbnNgKTtcclxuICAgICAgICAgICAgbGV0IGZvcm1PcHRpb25zRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtZXJyb3JgKTtcclxuICAgICAgICAgICAgbGV0IGlucHV0RGVmYXVsdFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tY3JlYXRvci1kZWZhdWx0LXZhbHVlJyk7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RGb3JtQ3JlYXRvcjogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLXNlbGVjdGApO1xyXG4gICAgICAgICAgICBzZWxlY3RGb3JtQ3JlYXRvci5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VgLCAoZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPXRleHQ+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUXVhbnRpdHlPcHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUuaW5uZXJIVE1MID0gYERvbXnFm2xuYSB3YXJ0b8WbxIc6IDx0ZXh0YXJlYSBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWU+PC90ZXh0YXJlYT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPWRhdGU+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUXVhbnRpdHlPcHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUuaW5uZXJIVE1MID0gYERvbXnFm2xuYSB3YXJ0b8WbxIc6IDxpbnB1dCBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWUgdHlwZT1lbWFpbD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnTGljemJhIG9wY2ppOiA8aW5wdXQgdHlwZT1udW1iZXIgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHktaW5wdXQ+JztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRRdWFudGl0eU9wdHM6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHktaW5wdXRgKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFF1YW50aXR5T3B0cy5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VgLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcXVhbnRpdHkgPSBpbnB1dFF1YW50aXR5T3B0cy52YWx1ZSBhcyB1bmtub3duIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnT3BjamU6IDxicj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihxdWFudGl0eSA+IDEwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IudGV4dENvbnRlbnQgPSBgTW/FvG5hIHd5YnJhxIcgbWFrc3ltYWxuaWUgMTAwIG9wY2ppIWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYE9wY2phIG5yICR7aSsxfTogPGlucHV0IHR5cGU9dGV4dCBuYW1lPW9wdGlvbiR7aX0+PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPXRleHQgZGlzYWJsZWQgdmFsdWU9XCJaYWJsb2tvd2FuYSBmdW5rY2phXCI+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA1KXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgRG9tecWbbG5hIHdhcnRvxZvEhzogPGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPWNoZWNrYm94PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9uc0Vycm9yLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBsZXQgYnRuRm9ybUNyZWF0b3JBZGRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tZm9ybS1jcmVhdG9yLXN1Ym1pdGApO1xyXG4gICAgICAgICAgICBidG5Gb3JtQ3JlYXRvckFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZExhYmVsOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1maWVsZC1sYWJlbF0nKSkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBmaWVsZFR5cGU6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3RbbmFtZT1maWVsZC10eXBlXScpKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZE5hbWU6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPWZpZWxkLW5hbWVdJykpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRGVmYXVsdFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZV0nKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGREZWZhdWx0VmFsdWVUQSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWVdJykpO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT10ZXh0IHZhbHVlPVwiJHtmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZX1cIj48L3A+YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGVUYWIucHVzaChgPHA+JHtmaWVsZExhYmVsfTogPHRleHRhcmVhIG5hbWU9JHtmaWVsZE5hbWV9PiR7ZmllbGREZWZhdWx0VmFsdWVUQS52YWx1ZX08L3RleHRhcmVhPjwvcD5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8cD4ke2ZpZWxkTGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7ZmllbGROYW1lfVwiIHR5cGU9ZGF0ZSB2YWx1ZT1cIiR7ZmllbGREZWZhdWx0VmFsdWUudmFsdWV9XCI+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1lbWFpbCB2YWx1ZT1cIiR7ZmllbGREZWZhdWx0VmFsdWUudmFsdWV9XCI+PC9wPmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGA8cD4ke2ZpZWxkTGFiZWx9OiA8c2VsZWN0IG5hbWU9XCIke2ZpZWxkTmFtZX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0UXVhbnRpdHlPcHRzOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci1vcHRpb25zLXF1YW50aXR5LWlucHV0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IChpbnB1dFF1YW50aXR5T3B0cy52YWx1ZSBhcyB1bmtub3duIGFzIG51bWJlcik7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYDxvcHRpb24+JHsoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1vcHRpb24ke2l9XWApKS52YWx1ZX08L29wdGlvbj5gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYDwvc2VsZWN0PjwvcD5gXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZpZWxkRGVmYXVsdFZhbHVlLmNoZWNrZWQgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDxwPiR7ZmllbGRMYWJlbH06IDxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD48L3A+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGVUYWIucHVzaChgPHA+JHtmaWVsZExhYmVsfTogPGlucHV0IG5hbWU9XCIke2ZpZWxkTmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIj48L3A+YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGZpZWxkVHlwZVRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gZmllbGRUeXBlVGFiW2ldO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS1jcmVhdG9yLXZpZXdgKS5pbm5lckhUTUwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2RvY3VtZW50LWxpc3QuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2RvY3VtZW50LWxpc3QnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGxldCBkb2N1bWVudExpc3QgPSBuZXcgRG9jdW1lbnRMaXN0KCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50TGlzdC5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbmV3LWRvY3VtZW50Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCduZXctZG9jdW1lbnQnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lOiBGaWVsZCA9IG5ldyBJbnB1dEZpZWxkKCduYW1lJywgJ0ltacSZJywgRmllbGRUeXBlLklucHV0LCBcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGxhc3ROYW1lOiBGaWVsZCA9IG5ldyBJbnB1dEZpZWxkKCdsYXN0TmFtZScsICdOYXp3aXNrbycsIEZpZWxkVHlwZS5JbnB1dCwgXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBlbWFpbDogRmllbGQgPSBuZXcgRW1haWxGaWVsZCgnZW1haWwnLCAnRS1tYWlsJywgRmllbGRUeXBlLkVtYWlsLCBcIlwiKTtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbJ0luZm9ybWF0eWthJywgJ0Vrb25vbWV0cmlhJywgJ1BsYXN0eWthJ107XHJcbiAgICAgICAgICAgIGxldCBmaWVsZE9mU3R1ZHk6IEZpZWxkID0gbmV3IFNlbGVjdGVkRmllbGQoJ2ZpZWxkT2ZTdHVkeScsICdLaWVydW5layBzdHVkacOzdycsIEZpZWxkVHlwZS5TZWxlY3RGaWVsZCwgb3B0aW9uc1swXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGxldCBlTGVhcm5pbmdQcmVmZXJhdGlvbjogRmllbGQgPSBuZXcgQ2hlY2tib3hGaWVsZCgnZUxlYXJuJywgJ0N6eSBwcmVmZXJ1amVzeiBlLWxlYXJuaW5nPycsIEZpZWxkVHlwZS5DaGVja0JveCwgJycpO1xyXG4gICAgICAgICAgICBsZXQgbm90ZXM6IEZpZWxkID0gbmV3IFRleHRBcmVhRmllbGQoJ25vdGVzJywgJ1V3YWdpJywgRmllbGRUeXBlLlRleHRBcmVhLCAnJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmllbGRUYWI6IEFycmF5PEZpZWxkPiA9IFtuYW1lLCBsYXN0TmFtZSwgZW1haWwsIGZpZWxkT2ZTdHVkeSwgZUxlYXJuaW5nUHJlZmVyYXRpb24sIG5vdGVzXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm0oXCJmb3JtMVwiLCBmaWVsZFRhYik7XHJcbiAgICAgICAgICAgIGZvcm0ucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVkaXQtZG9jdW1lbnQuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2VkaXQtZG9jdW1lbnQnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nID0gUm91dGVyLmdldFBhcmFtKCk7XHJcbiAgICAgICAgICAgIGxldCBkb2N1bWVudCA9IG5ldyBEb2N1bWVudExpc3QoKS5nZXREb2N1bWVudChpZCk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm0oJ2Zvcm0nLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIGZvcm0ucmVuZGVyKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAnO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xyXG4iLCJleHBvcnQgZW51bSBGaWVsZFR5cGUge1xyXG4gICAgSW5wdXQsXHJcbiAgICBUZXh0QXJlYSxcclxuICAgIERhdGUsXHJcbiAgICBFbWFpbCxcclxuICAgIFNlbGVjdEZpZWxkLFxyXG4gICAgQ2hlY2tCb3hcclxufSIsImltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tIFwiLi9sb2NTdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRMaXN0IHtcclxuICAgIGFsbERvY3VtZW50czogQXJyYXk8c3RyaW5nPjtcclxuICAgIHJlbmRlclJlc3VsdDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9jdW1lbnRMaXN0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RG9jdW1lbnRMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gbmV3IExvY1N0b3JhZ2UoKS5nZXREb2N1bWVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGFsbERvY3M6IEFycmF5PHN0cmluZz4gPSB0aGlzLmFsbERvY3VtZW50cztcclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCA9ICcnO1xyXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnRMaXN0KCk7XHJcbiAgICAgICAgbGV0IHJlbW92ZUJ1dHRvbnM6IEFycmF5PEVsZW1lbnQ+ID0gWyxdO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPHRhYmxlIGJvcmRlcj0xPjx0cj48dGQ+aWQ8L3RkPjx0ZD5FZHl0dWo8L3RkPjx0ZD5Vc3XFhDwvdGQ+PC90cj4nO1xyXG4gICAgICAgIGZvcih2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5hbGxEb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gYDx0cj48dGQ+PHAgaWQ9ZG9jLWlkLSR7aX0+JHt0aGlzLmFsbERvY3VtZW50c1tpXX08L3A+PC90ZD48dGQ+PGEgaHJlZj1cIi4vZWRpdC1kb2N1bWVudC5odG1sP2lkPSR7dGhpcy5hbGxEb2N1bWVudHNbaV19XCI+RWR5dHVqPC9hPjwvdGQ+PHRkPjxpbnB1dCBpZD1idG4tcmVtb3ZlLWRvYy0ke2FsbERvY3NbaV19IHR5cGU9YnV0dG9uIHZhbHVlPVVzdcWEPjwvdGQ+PC90cj5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ICs9ICc8L3RhYmxlPidcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvY3VtZW50LWxpc3QnKS5pbm5lckhUTUwgPSB0aGlzLnJlbmRlclJlc3VsdDsgLy8gUmVuZGVyaW5nIGxpc3RcclxuXHJcbiAgICAgICAgLy8gQWRkaW5nIGNsaWNrIGV2ZW50cyB0byByZW1vdmUgYnV0dG9uc1xyXG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGo8IGFsbERvY3MubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICByZW1vdmVCdXR0b25zW2pdID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi1yZW1vdmUtZG9jLSR7YWxsRG9jc1tqXX1gKTtcclxuICAgICAgICAgICAgaWYocmVtb3ZlQnV0dG9uc1tqXSl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVCdXR0b25zW2pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRG9jdW1lbnRMaXN0KCkucmVtb3ZlRG9jdW1lbnQoYWxsRG9jc1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldERvY3VtZW50KGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkb2M6IGFueSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7aWR9YCkpO1xyXG4gICAgICAgIHJldHVybiBkb2M7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRG9jdW1lbnQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke2lkfWApO1xyXG4gICAgICAgIGxldCBhbGxEb2N1bWVudHNUYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKSk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gYWxsRG9jdW1lbnRzVGFiLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGFsbERvY3VtZW50c1RhYi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbERvY3VtZW50c2AsIEpTT04uc3RyaW5naWZ5KGFsbERvY3VtZW50c1RhYikpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSBcIi4uL0ludGVyZmFjZXMvZmllbGRcIjtcclxuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSBcIi4uL0VudW1lcmF0b3JzL2ZpZWxkVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0RmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRBcmVhRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0ZWRGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIG9wdGlvbnM6IEFycmF5PHN0cmluZz47XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZywgb3B0aW9uczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9JbnRlcmZhY2VzL2ZpZWxkJztcclxuaW1wb3J0IHsgTG9jU3RvcmFnZSB9IGZyb20gJy4vbG9jU3RvcmFnZSc7XHJcbmltcG9ydCB7IERvY3VtZW50TGlzdCB9IGZyb20gJy4vZG9jdW1lbnRMaXN0JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm17XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBmaWVsZFRhYjogQXJyYXk8RmllbGQ+O1xyXG4gICAgcmVzdWx0OiBzdHJpbmcgPSAnICc7IC8vIHJlbmRlciByZXN1bHRcclxuICAgIGdldFZhbHVlUmVzdWx0OiBzdHJpbmcgPSAnICc7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgZmllbGRUYWI6IEFycmF5PEZpZWxkPikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYiA9IGZpZWxkVGFiO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIGNvbnN0cnVjdG9yIChpbnB1dEZpZWxkOiBJbnB1dEZpZWxkLCB0ZXh0QXJlYUZpZWxkOiBUZXh0QXJlYUZpZWxkLCBkYXRlRmllbGQ6IERhdGVGaWVsZCwgZW1haWxGaWVsZDogRW1haWxGaWVsZCwgc2VsZWN0ZWRGaWVsZDogU2VsZWN0ZWRGaWVsZCwgY2hlY2tib3hGaWVsZDogQ2hlY2tib3hGaWVsZCl7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYlswXSA9IGlucHV0RmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYlsxXSA9IHRleHRBcmVhRmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYlsyXSA9IGRhdGVGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzNdID0gZW1haWxGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzRdID0gc2VsZWN0ZWRGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzVdID0gY2hlY2tib3hGaWVsZDtcclxuICAgIH1cclxuICAgICovXHJcblxyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5maWVsZFRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdGV4dGFyZWFbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2VsZWN0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgaWYoKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSBcIlRha1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSBcIk5pZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpZWxkVGFiW2ldLnZhbHVlID0gaW5wdXRWYWx1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5nZXRWYWx1ZVJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogJHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfTwvcD5gXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKS5pbm5lckhUTUwgPSB0aGlzLmdldFZhbHVlUmVzdWx0O1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0VmFsdWVSZXN1bHQgPSBcIiBcIjtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoZG9jdW1lbnRJZD86IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxmb3JtIG5hbWU9JHt0aGlzLm5hbWV9PmA7XHJcbiAgICAgICAgbGV0IGZpZWxkVGFiID0gdGhpcy5maWVsZFRhYjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmllbGRUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIElucHV0LCAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICBUZXh0QXJlYSwgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgRGF0ZSwgICAgICAgICAgIDJcclxuICAgICAgICAgICAgICAgIEVtYWlsLCAgICAgICAgICAzXHJcbiAgICAgICAgICAgICAgICBTZWxlY3RGaWVsZCwgICAgNFxyXG4gICAgICAgICAgICAgICAgQ2hlY2tCb3ggICAgICAgIDVcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwidGV4dFwiLCB2YWx1ZT1cIiR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX1cIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPHRleHRhcmVhIG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIj4ke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9PC90ZXh0YXJlYT48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImRhdGVcIiwgdmFsdWU9XCIke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9XCI+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJlbWFpbFwiLCB2YWx1ZT1cIiR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX1cIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPHNlbGVjdCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIgPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZmllbGRUYWJbaV0ub3B0aW9ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLnZhbHVlID09IHRoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8b3B0aW9uIGlkPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnNbal19XCIgc2VsZWN0ZWQ+JHt0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnNbal19PC9vcHRpb24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxvcHRpb24gaWQ9XCIke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX1cIj4ke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPC9zZWxlY3Q+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS52YWx1ZSA9PSBcIlRha1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImNoZWNrYm94XCJjaGVja2VkPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJjaGVja2JveFwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+PGlucHV0IGlkPVwiYnRuLWJhY2stZm9ybVwiIHZhbHVlPVwiV3N0ZWN6XCIgdHlwZT1cImJ1dHRvblwiPjxpbnB1dCBpZD1cImJ0bi1zYXZlLWZvcm1cIiB2YWx1ZT1cIlphcGlzelwiIHR5cGU9XCJidXR0b25cIj48L3A+YDtcclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBcIjwvZm9ybT5cIjtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0nKS5pbm5lckhUTUwgPSB0aGlzLnJlc3VsdDtcclxuXHJcbiAgICAgICAgbGV0IGJ0bkJhY2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1iYWNrLWZvcm0nKTtcclxuICAgICAgICBsZXQgYnRuU2F2ZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXNhdmUtZm9ybScpO1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCduZXctZG9jdW1lbnQnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGJ0bkJhY2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vaW5kZXguaHRtbFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICBidG5TYXZlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm0oXCJmb3JtXCIsIGZpZWxkVGFiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnRuQmFja0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9kb2N1bWVudC1saXN0Lmh0bWxcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgYnRuU2F2ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBSb3V0ZXIuZ2V0UGFyYW0oKTtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm0oXCJmb3JtXCIsIGZpZWxkVGFiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uc2F2ZUVkaXRlZEZvcm0oZG9jdW1lbnRJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZSgpe1xyXG4gICAgICAgIGxldCBkb2MgPSBuZXcgTG9jU3RvcmFnZSgpO1xyXG4gICAgICAgIGRvYy5zYXZlRG9jdW1lbnQodGhpcy5maWVsZFRhYik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RvY3VtZW50IGhhcyBiZWVuIHNhdmVkJyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vaW5kZXguaHRtbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVFZGl0ZWRGb3JtKGRvY3VtZW50SWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7ZG9jdW1lbnRJZH1gLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZpZWxkVGFiKSk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vZG9jdW1lbnQtbGlzdC5odG1sXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRhU3RvcmFnZSB9IGZyb20gXCIuLi9JbnRlcmZhY2VzL2RhdGFTdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jU3RvcmFnZSBpbXBsZW1lbnRzIERhdGFTdG9yYWdlIHtcclxuICAgIGFsbERvY3VtZW50czogQXJyYXk8c3RyaW5nPiA9IFtdOyAgICAvLyBDb250YWlucyBhbGwgc2F2ZWQgZG9jdW1lbnRzIChkb2N1bWVudCBJRCBpbiBzdHJpbmcgYXJyYXkpXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZURvY3VtZW50KGZpZWxkc1ZhbHVlOiBhbnkpe1xyXG4gICAgICAgIGlmKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbERvY3VtZW50cycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxEb2N1bWVudHMnLCAnJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZERvY3VtZW50OiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWREb2N1bWVudCA9IHRpbWVzdGFtcC50b1N0cmluZygpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGlkRG9jdW1lbnQsIEpTT04uc3RyaW5naWZ5KGZpZWxkc1ZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMucHVzaChpZERvY3VtZW50KTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRG9jdW1lbnRzYCwgSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxEb2N1bWVudHMpKTtcclxuICAgICAgICByZXR1cm4gaWREb2N1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRG9jdW1lbnQoaWREb2N1bWVudDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9jVmFsdWVzOiBBcnJheTxvYmplY3Q+O1xyXG4gICAgICAgIGRvY1ZhbHVlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oaWREb2N1bWVudCkpO1xyXG4gICAgICAgIHJldHVybiBkb2NWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERvY3VtZW50cygpe1xyXG4gICAgICAgIGxldCBpZERvY1RhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApKTtcclxuICAgICAgICByZXR1cm4gaWREb2NUYWI7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUm91dGVyIHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0UGFyYW0oKSB7XHJcbiAgICAgICAgY29uc3QgcXVlcnk6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xyXG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnkpOyBcclxuICAgICAgICBjb25zdCBpZCA9IHVybFBhcmFtcy5nZXQoJ2lkJyk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
