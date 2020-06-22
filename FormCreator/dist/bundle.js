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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlLnRzIiwic3JjL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcy50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvbG9jU3RvcmFnZS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDRUEsNkRBQTREO0FBQzVELG1EQUEwSDtBQUMxSCwrQ0FBOEM7QUFFOUMsK0RBQThEO0FBQzlELG1EQUFrRDtBQUdsRDtJQUVJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFakMsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRSxDQUFDLENBQUMsRUFBRztTQUUzRjtRQUNELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQUc7WUFDaEcsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDdEMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pCO1FBQ0Qsb0JBQW9CO1FBQ3BCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9B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VUFBa0I7UUFDM0IsSUFBSSxTQUF3QixDQUFDO1FBQzdCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN6RCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSxJQUFJLFFBQVEsR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0F2Q0EsQUF1Q0MsSUFBQTtBQXZDWSxnQ0FBVTs7Ozs7QUNGdkI7SUFBQTtJQVNBLENBQUM7SUFQVSxlQUFRLEdBQWY7UUFDSSxJQUFNLEtBQUssR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSx3QkFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSBcIi4vc2NyaXB0cy9JbnRlcmZhY2VzL2ZpZWxkXCI7XHJcbmltcG9ydCB7IERhdGFTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9JbnRlcmZhY2VzL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gXCIuL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlXCI7XHJcbmltcG9ydCB7IElucHV0RmllbGQsIFRleHRBcmVhRmllbGQsIERhdGVGaWVsZCwgRW1haWxGaWVsZCwgU2VsZWN0ZWRGaWVsZCwgQ2hlY2tib3hGaWVsZCB9IGZyb20gXCIuL3NjcmlwdHMvY2xhc3Nlcy9maWVsZHNcIjtcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuL3NjcmlwdHMvY2xhc3Nlcy9mb3JtXCI7XHJcbmltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvbG9jU3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBEb2N1bWVudExpc3QgfSBmcm9tICcuL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuL3NjcmlwdHMvY2xhc3Nlcy9yb3V0ZXInO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdmFyIHAgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblxyXG4gICAgICAgIC8vIGluZGV4Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdpbmRleCcpID4tMSApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZG9jdW1lbnQtbGlzdC5odG1sXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignZG9jdW1lbnQtbGlzdCcpID4tMSApIHtcclxuICAgICAgICAgICAgbGV0IGRvY3VtZW50TGlzdCA9IG5ldyBEb2N1bWVudExpc3QoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnRMaXN0LnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBuZXctZG9jdW1lbnQuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ25ldy1kb2N1bWVudCcpID4tMSApIHtcclxuICAgICAgICAgICAgbGV0IG5hbWU6IEZpZWxkID0gbmV3IElucHV0RmllbGQoJ25hbWUnLCAnSW1pxJknLCBGaWVsZFR5cGUuSW5wdXQsIFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgbGFzdE5hbWU6IEZpZWxkID0gbmV3IElucHV0RmllbGQoJ2xhc3ROYW1lJywgJ05hendpc2tvJywgRmllbGRUeXBlLklucHV0LCBcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGVtYWlsOiBGaWVsZCA9IG5ldyBFbWFpbEZpZWxkKCdlbWFpbCcsICdFLW1haWwnLCBGaWVsZFR5cGUuRW1haWwsIFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uczogQXJyYXk8c3RyaW5nPiA9IFsnSW5mb3JtYXR5a2EnLCAnRWtvbm9tZXRyaWEnLCAnUGxhc3R5a2EnXTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkT2ZTdHVkeTogRmllbGQgPSBuZXcgU2VsZWN0ZWRGaWVsZCgnZmllbGRPZlN0dWR5JywgJ0tpZXJ1bmVrIHN0dWRpw7N3JywgRmllbGRUeXBlLlNlbGVjdEZpZWxkLCBvcHRpb25zWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgbGV0IGVMZWFybmluZ1ByZWZlcmF0aW9uOiBGaWVsZCA9IG5ldyBDaGVja2JveEZpZWxkKCdlTGVhcm4nLCAnQ3p5IHByZWZlcnVqZXN6IGUtbGVhcm5pbmc/JywgRmllbGRUeXBlLkNoZWNrQm94LCAnJyk7XHJcbiAgICAgICAgICAgIGxldCBub3RlczogRmllbGQgPSBuZXcgVGV4dEFyZWFGaWVsZCgnbm90ZXMnLCAnVXdhZ2knLCBGaWVsZFR5cGUuVGV4dEFyZWEsICcnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+ID0gW25hbWUsIGxhc3ROYW1lLCBlbWFpbCwgZmllbGRPZlN0dWR5LCBlTGVhcm5pbmdQcmVmZXJhdGlvbiwgbm90ZXNdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybShcImZvcm0xXCIsIGZpZWxkVGFiKTtcclxuICAgICAgICAgICAgZm9ybS5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWRpdC1kb2N1bWVudC5odG1sXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignZWRpdC1kb2N1bWVudCcpID4tMSApIHtcclxuICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBSb3V0ZXIuZ2V0UGFyYW0oKTtcclxuICAgICAgICAgICAgbGV0IGRvY3VtZW50ID0gbmV3IERvY3VtZW50TGlzdCgpLmdldERvY3VtZW50KGlkKTtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybSgnZm9ybScsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgZm9ybS5yZW5kZXIoaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAiLCJpbXBvcnQgeyBBcHAgfSBmcm9tICcuL2FwcCc7XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XHJcbiIsImV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XHJcbiAgICBJbnB1dCxcclxuICAgIFRleHRBcmVhLFxyXG4gICAgRGF0ZSxcclxuICAgIEVtYWlsLFxyXG4gICAgU2VsZWN0RmllbGQsXHJcbiAgICBDaGVja0JveFxyXG59IiwiaW1wb3J0IHsgTG9jU3RvcmFnZSB9IGZyb20gXCIuL2xvY1N0b3JhZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudExpc3Qge1xyXG4gICAgYWxsRG9jdW1lbnRzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcmVuZGVyUmVzdWx0OiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGlmKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbERvY3VtZW50cycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxEb2N1bWVudHMnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKS5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nZXREb2N1bWVudExpc3QoKTtcclxuICAgICAgICAgICAgLy90aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXREb2N1bWVudExpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBuZXcgTG9jU3RvcmFnZSgpLmdldERvY3VtZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgYWxsRG9jczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuYWxsRG9jdW1lbnRzO1xyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5nZXREb2N1bWVudExpc3QoKTtcclxuICAgICAgICBsZXQgcmVtb3ZlQnV0dG9uczogQXJyYXk8RWxlbWVudD4gPSBbLF07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ICs9ICc8dGFibGUgYm9yZGVyPTE+PHRyPjx0ZD5pZDwvdGQ+PHRkPkVkeXR1ajwvdGQ+PHRkPlVzdcWEPC90ZD48L3RyPic7XHJcbiAgICAgICAgZm9yKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGlzLmFsbERvY3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSBgPHRyPjx0ZD48cCBpZD1kb2MtaWQtJHtpfT4ke3RoaXMuYWxsRG9jdW1lbnRzW2ldfTwvcD48L3RkPjx0ZD48YSBocmVmPVwiLi9lZGl0LWRvY3VtZW50Lmh0bWw/aWQ9JHt0aGlzLmFsbERvY3VtZW50c1tpXX1cIj5FZHl0dWo8L2E+PC90ZD48dGQ+PGlucHV0IGlkPWJ0bi1yZW1vdmUtZG9jLSR7YWxsRG9jc1tpXX0gdHlwZT1idXR0b24gdmFsdWU9VXN1xYQ+PC90ZD48L3RyPmBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gJzwvdGFibGU+J1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9jdW1lbnQtbGlzdCcpLmlubmVySFRNTCA9IHRoaXMucmVuZGVyUmVzdWx0OyAvLyBSZW5kZXJpbmcgbGlzdFxyXG5cclxuICAgICAgICAvLyBBZGRpbmcgY2xpY2sgZXZlbnRzIHRvIHJlbW92ZSBidXR0b25zXHJcbiAgICAgICAgZm9yKGxldCBqID0gMDsgajwgYWxsRG9jcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbnNbal0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLXJlbW92ZS1kb2MtJHthbGxEb2NzW2pdfWApO1xyXG4gICAgICAgICAgICBpZihyZW1vdmVCdXR0b25zW2pdKXtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUJ1dHRvbnNbal0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBEb2N1bWVudExpc3QoKS5yZW1vdmVEb2N1bWVudChhbGxEb2NzW2pdKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RG9jdW1lbnQoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRvYzogYW55ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtpZH1gKSk7XHJcbiAgICAgICAgcmV0dXJuIGRvYztcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVEb2N1bWVudChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7aWR9YCk7XHJcbiAgICAgICAgbGV0IGFsbERvY3VtZW50c1RhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBhbGxEb2N1bWVudHNUYWIuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgYWxsRG9jdW1lbnRzVGFiLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRG9jdW1lbnRzYCwgSlNPTi5zdHJpbmdpZnkoYWxsRG9jdW1lbnRzVGFiKSk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9maWVsZFwiO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiLi4vRW51bWVyYXRvcnMvZmllbGRUeXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZUZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbWFpbEZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RlZEZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgb3B0aW9uczogQXJyYXk8c3RyaW5nPjtcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nLCBvcHRpb25zOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveEZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL0ludGVyZmFjZXMvZmllbGQnO1xyXG5pbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSAnLi9sb2NTdG9yYWdlJztcclxuaW1wb3J0IHsgRG9jdW1lbnRMaXN0IH0gZnJvbSAnLi9kb2N1bWVudExpc3QnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybXtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGZpZWxkVGFiOiBBcnJheTxGaWVsZD47XHJcbiAgICByZXN1bHQ6IHN0cmluZyA9ICcgJzsgLy8gcmVuZGVyIHJlc3VsdFxyXG4gICAgZ2V0VmFsdWVSZXN1bHQ6IHN0cmluZyA9ICcgJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+KSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiID0gZmllbGRUYWI7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgY29uc3RydWN0b3IgKGlucHV0RmllbGQ6IElucHV0RmllbGQsIHRleHRBcmVhRmllbGQ6IFRleHRBcmVhRmllbGQsIGRhdGVGaWVsZDogRGF0ZUZpZWxkLCBlbWFpbEZpZWxkOiBFbWFpbEZpZWxkLCBzZWxlY3RlZEZpZWxkOiBTZWxlY3RlZEZpZWxkLCBjaGVja2JveEZpZWxkOiBDaGVja2JveEZpZWxkKXtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzBdID0gaW5wdXRGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzFdID0gdGV4dEFyZWFGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzJdID0gZGF0ZUZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbM10gPSBlbWFpbEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbNF0gPSBzZWxlY3RlZEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbNV0gPSBjaGVja2JveEZpZWxkO1xyXG4gICAgfVxyXG4gICAgKi9cclxuXHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmZpZWxkVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGB0ZXh0YXJlYVtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBpZigoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLmNoZWNrZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiVGFrXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiTmllXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRUYWJbaV0udmFsdWUgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGlzLmdldFZhbHVlUmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiAke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9PC9wPmBcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLmlubmVySFRNTCA9IHRoaXMuZ2V0VmFsdWVSZXN1bHQ7XHJcbiAgICAgICAgLy8gdGhpcy5nZXRWYWx1ZVJlc3VsdCA9IFwiIFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihkb2N1bWVudElkPzogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBgPGZvcm0gbmFtZT0ke3RoaXMubmFtZX0+YDtcclxuICAgICAgICBsZXQgZmllbGRUYWIgPSB0aGlzLmZpZWxkVGFiO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5maWVsZFRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgSW5wdXQsICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgIFRleHRBcmVhLCAgICAgICAxXHJcbiAgICAgICAgICAgICAgICBEYXRlLCAgICAgICAgICAgMlxyXG4gICAgICAgICAgICAgICAgRW1haWwsICAgICAgICAgIDNcclxuICAgICAgICAgICAgICAgIFNlbGVjdEZpZWxkLCAgICA0XHJcbiAgICAgICAgICAgICAgICBDaGVja0JveCAgICAgICAgNVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJ0ZXh0XCIsIHZhbHVlPVwiJHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfVwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8dGV4dGFyZWEgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiPiR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX08L3RleHRhcmVhPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiZGF0ZVwiLCB2YWx1ZT1cIiR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX1cIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImVtYWlsXCIsIHZhbHVlPVwiJHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfVwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8c2VsZWN0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiA+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5maWVsZFRhYltpXS5vcHRpb25zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0udmFsdWUgPT0gdGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxvcHRpb24gaWQ9XCIke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX1cIiBzZWxlY3RlZD4ke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPG9wdGlvbiBpZD1cIiR7dGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdfVwiPiR7dGhpcy5maWVsZFRhYltpXS5vcHRpb25zW2pdfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8L3NlbGVjdD48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLnZhbHVlID09IFwiVGFrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiY2hlY2tib3hcImNoZWNrZWQ+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImNoZWNrYm94XCI+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD48aW5wdXQgaWQ9XCJidG4tYmFjay1mb3JtXCIgdmFsdWU9XCJXc3RlY3pcIiB0eXBlPVwiYnV0dG9uXCI+PGlucHV0IGlkPVwiYnRuLXNhdmUtZm9ybVwiIHZhbHVlPVwiWmFwaXN6XCIgdHlwZT1cImJ1dHRvblwiPjwvcD5gO1xyXG4gICAgICAgIHRoaXMucmVzdWx0ICs9IFwiPC9mb3JtPlwiO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpLmlubmVySFRNTCA9IHRoaXMucmVzdWx0O1xyXG5cclxuICAgICAgICBsZXQgYnRuQmFja0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWJhY2stZm9ybScpO1xyXG4gICAgICAgIGxldCBidG5TYXZlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tc2F2ZS1mb3JtJyk7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ25ldy1kb2N1bWVudCcpID4tMSApIHtcclxuICAgICAgICAgICAgYnRuQmFja0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGJ0blNhdmVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybShcImZvcm1cIiwgZmllbGRUYWIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBidG5CYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2RvY3VtZW50LWxpc3QuaHRtbFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICBidG5TYXZlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IFJvdXRlci5nZXRQYXJhbSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybShcImZvcm1cIiwgZmllbGRUYWIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zYXZlRWRpdGVkRm9ybShkb2N1bWVudElkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCl7XHJcbiAgICAgICAgbGV0IGRvYyA9IG5ldyBMb2NTdG9yYWdlKCk7XHJcbiAgICAgICAgZG9jLnNhdmVEb2N1bWVudCh0aGlzLmZpZWxkVGFiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRG9jdW1lbnQgaGFzIGJlZW4gc2F2ZWQnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUVkaXRlZEZvcm0oZG9jdW1lbnRJZDogc3RyaW5nKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtkb2N1bWVudElkfWAsIEpTT04uc3RyaW5naWZ5KHRoaXMuZmllbGRUYWIpKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9kb2N1bWVudC1saXN0Lmh0bWxcIjtcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGFTdG9yYWdlIH0gZnJvbSBcIi4uL0ludGVyZmFjZXMvZGF0YVN0b3JhZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NTdG9yYWdlIGltcGxlbWVudHMgRGF0YVN0b3JhZ2Uge1xyXG4gICAgYWxsRG9jdW1lbnRzOiBBcnJheTxzdHJpbmc+ID0gW107ICAgIC8vIENvbnRhaW5zIGFsbCBzYXZlZCBkb2N1bWVudHMgKGRvY3VtZW50IElEIGluIHN0cmluZyBhcnJheSlcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGlmKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbERvY3VtZW50cycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxEb2N1bWVudHMnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKS5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlRG9jdW1lbnQoZmllbGRzVmFsdWU6IGFueSl7XHJcbiAgICAgICAgaWYoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRG9jdW1lbnRzJykpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbERvY3VtZW50cycsICcnKTtcclxuICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkRG9jdW1lbnQ6IHN0cmluZztcclxuICAgICAgICBsZXQgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZERvY3VtZW50ID0gdGltZXN0YW1wLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaWREb2N1bWVudCwgSlNPTi5zdHJpbmdpZnkoZmllbGRzVmFsdWUpKTtcclxuICAgICAgICB0aGlzLmFsbERvY3VtZW50cy5wdXNoKGlkRG9jdW1lbnQpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBhbGxEb2N1bWVudHNgLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFsbERvY3VtZW50cykpO1xyXG4gICAgICAgIHJldHVybiBpZERvY3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREb2N1bWVudChpZERvY3VtZW50OiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkb2NWYWx1ZXM6IEFycmF5PG9iamVjdD47XHJcbiAgICAgICAgZG9jVmFsdWVzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpZERvY3VtZW50KSk7XHJcbiAgICAgICAgcmV0dXJuIGRvY1ZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RG9jdW1lbnRzKCl7XHJcbiAgICAgICAgbGV0IGlkRG9jVGFiOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIHJldHVybiBpZERvY1RhYjtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBSb3V0ZXIge1xyXG5cclxuICAgIHN0YXRpYyBnZXRQYXJhbSgpIHtcclxuICAgICAgICBjb25zdCBxdWVyeTogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XHJcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7IFxyXG4gICAgICAgIGNvbnN0IGlkID0gdXJsUGFyYW1zLmdldCgnaWQnKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcblxyXG59Il19
