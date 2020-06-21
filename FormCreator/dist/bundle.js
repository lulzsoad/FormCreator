(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var fieldType_1 = require("./scripts/Enumerators/fieldType");
var fields_1 = require("./scripts/classes/fields");
var form_1 = require("./scripts/classes/form");
var documentList_1 = require("./scripts/classes/documentList");
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
    }
    return App;
}());
exports.App = App;
},{"./scripts/Enumerators/fieldType":3,"./scripts/classes/documentList":4,"./scripts/classes/fields":5,"./scripts/classes/form":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var app = new app_1.App();
var hello = "hello annie";
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
            this.render();
        }
    }
    DocumentList.prototype.getDocumentList = function () {
        this.allDocuments = new locStorage_1.LocStorage().getDocuments();
    };
    DocumentList.prototype.render = function () {
        this.renderResult = '';
        this.getDocumentList();
        this.renderResult += '<table border=1><tr><td>id</td></tr>';
        for (var i = 0; i < this.allDocuments.length; i++) {
            this.renderResult += "<tr><td>" + this.allDocuments[i] + "</td></tr>";
        }
        this.renderResult += '</table>';
        document.getElementById('document-list').innerHTML = this.renderResult;
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
    Form.prototype.render = function () {
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
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"text\", value=\"\"></p>";
                    break;
                case 1:
                    this.result += "<p>" + this.fieldTab[i].label + ": <textarea name=\"" + this.fieldTab[i].name + "\"></textarea></p>";
                    break;
                case 2:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"date\", value=\"\"></p>";
                    break;
                case 3:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"email\", value=\"\"></p>";
                    break;
                case 4:
                    this.result += "<p>" + this.fieldTab[i].label + ": <select name=\"" + this.fieldTab[i].name + "\" id=\"\">";
                    for (var j = 0; j < this.fieldTab[i].options.length; j++) {
                        this.result += "<option id=\"" + this.fieldTab[i].options[j] + "\">" + this.fieldTab[i].options[j] + "</option>";
                    }
                    this.result += "</select></p>";
                    break;
                case 5:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"checkbox\", value=\"\"></p>";
                    break;
            }
        }
        this.result += "<p><input id=\"btn-back-form\" value=\"Wstecz\" type=\"button\"><input id=\"btn-save-form\" value=\"Zapisz\" type=\"button\"></p>";
        this.result += "</form>";
        document.getElementById('form').innerHTML = this.result;
        var btnBackForm = document.querySelector('#btn-back-form');
        var btnSaveForm = document.querySelector('#btn-save-form');
        btnBackForm.addEventListener("click", function () {
            window.location.href = "./index.html";
        });
        btnSaveForm.addEventListener("click", function () {
            var form = new Form("form", fieldTab);
            form.getValue();
            form.save();
        });
    };
    Form.prototype.save = function () {
        var doc = new locStorage_1.LocStorage();
        doc.saveDocument(this.fieldTab);
        console.log('Document has been saved');
        window.location.href = "./index.html";
    };
    return Form;
}());
exports.Form = Form;
},{"./locStorage":7}],7:[function(require,module,exports){
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
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlLnRzIiwic3JjL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcy50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvbG9jU3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0VBLDZEQUE0RDtBQUM1RCxtREFBMEg7QUFDMUgsK0NBQThDO0FBRTlDLCtEQUE4RDtBQUc5RDtJQUVJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFakMsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRSxDQUFDLENBQUMsRUFBRztTQUUzRjtRQUNELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQUc7WUFDaEcsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDdEMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pCO1FBQ0Qsb0JBQW9CO1FBQ3BCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRSxDQUFDLENBQUMsRUFBRztZQUMvRixJ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LFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSxJQUFJLFFBQVEsR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0F2Q0EsQUF1Q0MsSUFBQTtBQXZDWSxnQ0FBVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSBcIi4vc2NyaXB0cy9JbnRlcmZhY2VzL2ZpZWxkXCI7XHJcbmltcG9ydCB7IERhdGFTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9JbnRlcmZhY2VzL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gXCIuL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlXCI7XHJcbmltcG9ydCB7IElucHV0RmllbGQsIFRleHRBcmVhRmllbGQsIERhdGVGaWVsZCwgRW1haWxGaWVsZCwgU2VsZWN0ZWRGaWVsZCwgQ2hlY2tib3hGaWVsZCB9IGZyb20gXCIuL3NjcmlwdHMvY2xhc3Nlcy9maWVsZHNcIjtcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuL3NjcmlwdHMvY2xhc3Nlcy9mb3JtXCI7XHJcbmltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvbG9jU3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBEb2N1bWVudExpc3QgfSBmcm9tICcuL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdmFyIHAgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblxyXG4gICAgICAgIC8vIGluZGV4Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdpbmRleCcpID4tMSApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZG9jdW1lbnQtbGlzdC5odG1sXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignZG9jdW1lbnQtbGlzdCcpID4tMSApIHtcclxuICAgICAgICAgICAgbGV0IGRvY3VtZW50TGlzdCA9IG5ldyBEb2N1bWVudExpc3QoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnRMaXN0LnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBuZXctZG9jdW1lbnQuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ25ldy1kb2N1bWVudCcpID4tMSApIHtcclxuICAgICAgICAgICAgbGV0IG5hbWU6IEZpZWxkID0gbmV3IElucHV0RmllbGQoJ25hbWUnLCAnSW1pxJknLCBGaWVsZFR5cGUuSW5wdXQsIFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgbGFzdE5hbWU6IEZpZWxkID0gbmV3IElucHV0RmllbGQoJ2xhc3ROYW1lJywgJ05hendpc2tvJywgRmllbGRUeXBlLklucHV0LCBcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGVtYWlsOiBGaWVsZCA9IG5ldyBFbWFpbEZpZWxkKCdlbWFpbCcsICdFLW1haWwnLCBGaWVsZFR5cGUuRW1haWwsIFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uczogQXJyYXk8c3RyaW5nPiA9IFsnSW5mb3JtYXR5a2EnLCAnRWtvbm9tZXRyaWEnLCAnUGxhc3R5a2EnXTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkT2ZTdHVkeTogRmllbGQgPSBuZXcgU2VsZWN0ZWRGaWVsZCgnZmllbGRPZlN0dWR5JywgJ0tpZXJ1bmVrIHN0dWRpw7N3JywgRmllbGRUeXBlLlNlbGVjdEZpZWxkLCBvcHRpb25zWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgbGV0IGVMZWFybmluZ1ByZWZlcmF0aW9uOiBGaWVsZCA9IG5ldyBDaGVja2JveEZpZWxkKCdlTGVhcm4nLCAnQ3p5IHByZWZlcnVqZXN6IGUtbGVhcm5pbmc/JywgRmllbGRUeXBlLkNoZWNrQm94LCAnJyk7XHJcbiAgICAgICAgICAgIGxldCBub3RlczogRmllbGQgPSBuZXcgVGV4dEFyZWFGaWVsZCgnbm90ZXMnLCAnVXdhZ2knLCBGaWVsZFR5cGUuVGV4dEFyZWEsICcnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+ID0gW25hbWUsIGxhc3ROYW1lLCBlbWFpbCwgZmllbGRPZlN0dWR5LCBlTGVhcm5pbmdQcmVmZXJhdGlvbiwgbm90ZXNdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybShcImZvcm0xXCIsIGZpZWxkVGFiKTtcclxuICAgICAgICAgICAgZm9ybS5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAnO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xyXG52YXIgaGVsbG8gPSBcImhlbGxvIGFubmllXCI7XHJcbiIsImV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XHJcbiAgICBJbnB1dCxcclxuICAgIFRleHRBcmVhLFxyXG4gICAgRGF0ZSxcclxuICAgIEVtYWlsLFxyXG4gICAgU2VsZWN0RmllbGQsXHJcbiAgICBDaGVja0JveFxyXG59IiwiaW1wb3J0IHsgTG9jU3RvcmFnZSB9IGZyb20gXCIuL2xvY1N0b3JhZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudExpc3Qge1xyXG4gICAgYWxsRG9jdW1lbnRzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcmVuZGVyUmVzdWx0OiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGlmKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbERvY3VtZW50cycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxEb2N1bWVudHMnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKS5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nZXREb2N1bWVudExpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RG9jdW1lbnRMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gbmV3IExvY1N0b3JhZ2UoKS5nZXREb2N1bWVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgPSAnJztcclxuICAgICAgICB0aGlzLmdldERvY3VtZW50TGlzdCgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ICs9ICc8dGFibGUgYm9yZGVyPTE+PHRyPjx0ZD5pZDwvdGQ+PC90cj4nO1xyXG4gICAgICAgIGZvcih2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5hbGxEb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gYDx0cj48dGQ+JHt0aGlzLmFsbERvY3VtZW50c1tpXX08L3RkPjwvdHI+YFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPC90YWJsZT4nXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2N1bWVudC1saXN0JykuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXJSZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGaWVsZCB9IGZyb20gXCIuLi9JbnRlcmZhY2VzL2ZpZWxkXCI7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gXCIuLi9FbnVtZXJhdG9ycy9maWVsZFR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dEZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBvcHRpb25zOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94RmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9maWVsZCc7XHJcbmltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tICcuL2xvY1N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBEb2N1bWVudExpc3QgfSBmcm9tICcuL2RvY3VtZW50TGlzdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybXtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGZpZWxkVGFiOiBBcnJheTxGaWVsZD47XHJcbiAgICByZXN1bHQ6IHN0cmluZyA9ICcgJzsgLy8gcmVuZGVyIHJlc3VsdFxyXG4gICAgZ2V0VmFsdWVSZXN1bHQ6IHN0cmluZyA9ICcgJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+KSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiID0gZmllbGRUYWI7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgY29uc3RydWN0b3IgKGlucHV0RmllbGQ6IElucHV0RmllbGQsIHRleHRBcmVhRmllbGQ6IFRleHRBcmVhRmllbGQsIGRhdGVGaWVsZDogRGF0ZUZpZWxkLCBlbWFpbEZpZWxkOiBFbWFpbEZpZWxkLCBzZWxlY3RlZEZpZWxkOiBTZWxlY3RlZEZpZWxkLCBjaGVja2JveEZpZWxkOiBDaGVja2JveEZpZWxkKXtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzBdID0gaW5wdXRGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzFdID0gdGV4dEFyZWFGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiWzJdID0gZGF0ZUZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbM10gPSBlbWFpbEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbNF0gPSBzZWxlY3RlZEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbNV0gPSBjaGVja2JveEZpZWxkO1xyXG4gICAgfVxyXG4gICAgKi9cclxuXHJcbiAgICBnZXRWYWx1ZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmZpZWxkVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGB0ZXh0YXJlYVtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBpZigoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLmNoZWNrZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiVGFrXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiTmllXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRUYWJbaV0udmFsdWUgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGlzLmdldFZhbHVlUmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiAke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9PC9wPmBcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLmlubmVySFRNTCA9IHRoaXMuZ2V0VmFsdWVSZXN1bHQ7XHJcbiAgICAgICAgLy8gdGhpcy5nZXRWYWx1ZVJlc3VsdCA9IFwiIFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHRoaXMucmVzdWx0ICs9IGA8Zm9ybSBuYW1lPSR7dGhpcy5uYW1lfT5gO1xyXG4gICAgICAgIGxldCBmaWVsZFRhYiA9IHRoaXMuZmllbGRUYWI7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmZpZWxkVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICBJbnB1dCwgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgVGV4dEFyZWEsICAgICAgIDFcclxuICAgICAgICAgICAgICAgIERhdGUsICAgICAgICAgICAyXHJcbiAgICAgICAgICAgICAgICBFbWFpbCwgICAgICAgICAgM1xyXG4gICAgICAgICAgICAgICAgU2VsZWN0RmllbGQsICAgIDRcclxuICAgICAgICAgICAgICAgIENoZWNrQm94ICAgICAgICA1XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cInRleHRcIiwgdmFsdWU9XCJcIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPHRleHRhcmVhIG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIj48L3RleHRhcmVhPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiZGF0ZVwiLCB2YWx1ZT1cIlwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiZW1haWxcIiwgdmFsdWU9XCJcIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPHNlbGVjdCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIgaWQ9XCJcIj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxvcHRpb24gaWQ9XCIke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX1cIj4ke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPC9zZWxlY3Q+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJjaGVja2JveFwiLCB2YWx1ZT1cIlwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+PGlucHV0IGlkPVwiYnRuLWJhY2stZm9ybVwiIHZhbHVlPVwiV3N0ZWN6XCIgdHlwZT1cImJ1dHRvblwiPjxpbnB1dCBpZD1cImJ0bi1zYXZlLWZvcm1cIiB2YWx1ZT1cIlphcGlzelwiIHR5cGU9XCJidXR0b25cIj48L3A+YDtcclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBcIjwvZm9ybT5cIjtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0nKS5pbm5lckhUTUwgPSB0aGlzLnJlc3VsdDtcclxuXHJcbiAgICAgICAgbGV0IGJ0bkJhY2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1iYWNrLWZvcm0nKTtcclxuICAgICAgICBsZXQgYnRuU2F2ZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXNhdmUtZm9ybScpO1xyXG5cclxuICAgICAgICBidG5CYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vaW5kZXguaHRtbFwiO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidG5TYXZlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybShcImZvcm1cIiwgZmllbGRUYWIpO1xyXG4gICAgICAgICAgICBmb3JtLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIGZvcm0uc2F2ZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCl7XHJcbiAgICAgICAgbGV0IGRvYyA9IG5ldyBMb2NTdG9yYWdlKCk7XHJcbiAgICAgICAgZG9jLnNhdmVEb2N1bWVudCh0aGlzLmZpZWxkVGFiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRG9jdW1lbnQgaGFzIGJlZW4gc2F2ZWQnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRhU3RvcmFnZSB9IGZyb20gXCIuLi9JbnRlcmZhY2VzL2RhdGFTdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jU3RvcmFnZSBpbXBsZW1lbnRzIERhdGFTdG9yYWdlIHtcclxuICAgIGFsbERvY3VtZW50czogQXJyYXk8c3RyaW5nPiA9IFtdOyAgICAvLyBDb250YWlucyBhbGwgc2F2ZWQgZG9jdW1lbnRzIChkb2N1bWVudCBJRCBpbiBzdHJpbmcgYXJyYXkpXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZURvY3VtZW50KGZpZWxkc1ZhbHVlOiBhbnkpe1xyXG4gICAgICAgIGlmKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbERvY3VtZW50cycpKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxEb2N1bWVudHMnLCAnJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZERvY3VtZW50OiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWREb2N1bWVudCA9IHRpbWVzdGFtcC50b1N0cmluZygpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGlkRG9jdW1lbnQsIEpTT04uc3RyaW5naWZ5KGZpZWxkc1ZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMucHVzaChpZERvY3VtZW50KTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRG9jdW1lbnRzYCwgSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxEb2N1bWVudHMpKTtcclxuICAgICAgICByZXR1cm4gaWREb2N1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRG9jdW1lbnQoaWREb2N1bWVudDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9jVmFsdWVzOiBBcnJheTxvYmplY3Q+O1xyXG4gICAgICAgIGRvY1ZhbHVlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oaWREb2N1bWVudCkpO1xyXG4gICAgICAgIHJldHVybiBkb2NWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERvY3VtZW50cygpe1xyXG4gICAgICAgIGxldCBpZERvY1RhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApKTtcclxuICAgICAgICByZXR1cm4gaWREb2NUYWI7XHJcbiAgICB9XHJcbn0iXX0=
