(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var fieldType_1 = require("./scripts/Enumerators/fieldType");
var fields_1 = require("./scripts/classes/fields");
var form_1 = require("./scripts/classes/form");
var locStorage_1 = require("./scripts/classes/locStorage");
var App = /** @class */ (function () {
    function App() {
        var btnSend = document.querySelector('#btn-submit');
        var name1 = new fields_1.InputField('name', 'Imię', fieldType_1.FieldType.Input, "");
        var lastName = new fields_1.InputField('lastName', 'Nazwisko', fieldType_1.FieldType.Input, "");
        var email = new fields_1.EmailField('email', 'E-mail', fieldType_1.FieldType.Email, "");
        var options = ['Informatyka', 'Ekonometria', 'Plastyka'];
        var fieldOfStudy = new fields_1.SelectedField('fieldOfStudy', 'Kierunek studiów', fieldType_1.FieldType.SelectField, options[0], options);
        var eLearningPreferation = new fields_1.CheckboxField('eLearn', 'Czy preferujesz e-learning?', fieldType_1.FieldType.CheckBox, '');
        var notes = new fields_1.TextAreaField('notes', 'Uwagi', fieldType_1.FieldType.TextArea, '');
        var fieldTab = [name1, lastName, email, fieldOfStudy, eLearningPreferation, notes];
        var form = new form_1.Form(fieldTab);
        form.render();
        var doc = new locStorage_1.LocStorage();
        btnSend.addEventListener("click", function () {
            form.getValue();
            doc.saveDocument(fieldTab);
            console.log(localStorage.getItem("allDocuments"));
        });
    }
    return App;
}());
exports.App = App;
},{"./scripts/Enumerators/fieldType":3,"./scripts/classes/fields":4,"./scripts/classes/form":5,"./scripts/classes/locStorage":6}],2:[function(require,module,exports){
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
exports.CheckboxField = exports.SelectedField = exports.EmailField = exports.DateField = exports.TextAreaField = exports.InputField = void 0;
var InputField = /** @class */ (function () {
    function InputField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
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
    return CheckboxField;
}());
exports.CheckboxField = CheckboxField;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
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
            this.getValueResult += "<p>" + this.fieldTab[i].label + ": " + this.fieldTab[i].value + "</p>";
        }
        document.getElementById('result').innerHTML = this.getValueResult;
        this.getValueResult = " ";
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
        document.getElementById('form').innerHTML = this.result;
    };
    return Form;
}());
exports.Form = Form;
},{}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlLnRzIiwic3JjL3NjcmlwdHMvY2xhc3Nlcy9maWVsZHMudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2Zvcm0udHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNFQSw2REFBNEQ7QUFDNUQsbURBQTBIO0FBQzFILCtDQUE4QztBQUM5QywyREFBMEQ7QUFHMUQ7SUFFSTtRQUNJLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFcEQsSUFBSSxLQUFLLEdBQVUsSUFBSSxtQkFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUscUJBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxRQUFRLEdBQVUsSUFBSSxtQkFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUscUJBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxLQUFLLEdBQVUsSUFBSSxtQkFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUscUJBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUUsSUFBSSxPQUFPLEdBQWtCLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RSxJQUFJLFlBQVksR0FBVSxJQUFJLHNCQUFhLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLHFCQUFTLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1SCxJQUFJLG9CQUFvQixHQUFVLElBQUksc0JBQWEsQ0FBQyxRQUFRLEVBQUUsNkJBQTZCLEVBQUUs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QUFDO1NBQzFCO1FBQ0QsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQixVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQ0FBWSxHQUFaLFVBQWEsVUFBa0I7UUFDM0IsSUFBSSxTQUF3QixDQUFDO1FBQzdCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN6RCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSxJQUFJLFFBQVEsR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0F2Q0EsQUF1Q0MsSUFBQTtBQXZDWSxnQ0FBVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSBcIi4vc2NyaXB0cy9JbnRlcmZhY2VzL2ZpZWxkXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiLi9zY3JpcHRzL0ludGVyZmFjZXMvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiLi9zY3JpcHRzL0VudW1lcmF0b3JzL2ZpZWxkVHlwZVwiO1xyXG5pbXBvcnQgeyBJbnB1dEZpZWxkLCBUZXh0QXJlYUZpZWxkLCBEYXRlRmllbGQsIEVtYWlsRmllbGQsIFNlbGVjdGVkRmllbGQsIENoZWNrYm94RmllbGQgfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvZmllbGRzXCI7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvZm9ybVwiO1xyXG5pbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGxldCBidG5TZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1zdWJtaXQnKTtcclxuXHJcbiAgICAgICAgbGV0IG5hbWUxOiBGaWVsZCA9IG5ldyBJbnB1dEZpZWxkKCduYW1lJywgJ0ltacSZJywgRmllbGRUeXBlLklucHV0LCBcIlwiKTtcclxuICAgICAgICBsZXQgbGFzdE5hbWU6IEZpZWxkID0gbmV3IElucHV0RmllbGQoJ2xhc3ROYW1lJywgJ05hendpc2tvJywgRmllbGRUeXBlLklucHV0LCBcIlwiKTtcclxuICAgICAgICBsZXQgZW1haWw6IEZpZWxkID0gbmV3IEVtYWlsRmllbGQoJ2VtYWlsJywgJ0UtbWFpbCcsIEZpZWxkVHlwZS5FbWFpbCwgXCJcIik7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbJ0luZm9ybWF0eWthJywgJ0Vrb25vbWV0cmlhJywgJ1BsYXN0eWthJ107XHJcbiAgICAgICAgbGV0IGZpZWxkT2ZTdHVkeTogRmllbGQgPSBuZXcgU2VsZWN0ZWRGaWVsZCgnZmllbGRPZlN0dWR5JywgJ0tpZXJ1bmVrIHN0dWRpw7N3JywgRmllbGRUeXBlLlNlbGVjdEZpZWxkLCBvcHRpb25zWzBdLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgZUxlYXJuaW5nUHJlZmVyYXRpb246IEZpZWxkID0gbmV3IENoZWNrYm94RmllbGQoJ2VMZWFybicsICdDenkgcHJlZmVydWplc3ogZS1sZWFybmluZz8nLCBGaWVsZFR5cGUuQ2hlY2tCb3gsICcnKTtcclxuICAgICAgICBsZXQgbm90ZXM6IEZpZWxkID0gbmV3IFRleHRBcmVhRmllbGQoJ25vdGVzJywgJ1V3YWdpJywgRmllbGRUeXBlLlRleHRBcmVhLCAnJyk7XHJcblxyXG4gICAgICAgIGxldCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+ID0gW25hbWUxLCBsYXN0TmFtZSwgZW1haWwsIGZpZWxkT2ZTdHVkeSwgZUxlYXJuaW5nUHJlZmVyYXRpb24sIG5vdGVzXTtcclxuXHJcbiAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybShmaWVsZFRhYik7XHJcbiAgICAgICAgZm9ybS5yZW5kZXIoKTtcclxuICAgICAgICBsZXQgZG9jID0gbmV3IExvY1N0b3JhZ2UoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgYnRuU2VuZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZvcm0uZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgZG9jLnNhdmVEb2N1bWVudChmaWVsZFRhYik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgXHJcbiAgICBcclxufVxyXG4gICAgIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAnO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xyXG52YXIgaGVsbG8gPSBcImhlbGxvIGFubmllXCI7XHJcbiIsImV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XHJcbiAgICBJbnB1dCxcclxuICAgIFRleHRBcmVhLFxyXG4gICAgRGF0ZSxcclxuICAgIEVtYWlsLFxyXG4gICAgU2VsZWN0RmllbGQsXHJcbiAgICBDaGVja0JveFxyXG59IiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9maWVsZFwiO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiLi4vRW51bWVyYXRvcnMvZmllbGRUeXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbWFpbEZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBvcHRpb25zOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcmVuZGVyOiAoKSA9PiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZywgb3B0aW9uczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGaWVsZCB9IGZyb20gXCIuLi9JbnRlcmZhY2VzL2ZpZWxkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybXtcclxuICAgIGZpZWxkVGFiOiBBcnJheTxGaWVsZD47XHJcbiAgICByZXN1bHQ6IHN0cmluZyA9ICcgJzsgLy8gcmVuZGVyIHJlc3VsdFxyXG4gICAgZ2V0VmFsdWVSZXN1bHQ6IHN0cmluZyA9ICcgJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoZmllbGRUYWI6IEFycmF5PEZpZWxkPikge1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWIgPSBmaWVsZFRhYjtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBjb25zdHJ1Y3RvciAoaW5wdXRGaWVsZDogSW5wdXRGaWVsZCwgdGV4dEFyZWFGaWVsZDogVGV4dEFyZWFGaWVsZCwgZGF0ZUZpZWxkOiBEYXRlRmllbGQsIGVtYWlsRmllbGQ6IEVtYWlsRmllbGQsIHNlbGVjdGVkRmllbGQ6IFNlbGVjdGVkRmllbGQsIGNoZWNrYm94RmllbGQ6IENoZWNrYm94RmllbGQpe1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbMF0gPSBpbnB1dEZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbMV0gPSB0ZXh0QXJlYUZpZWxkO1xyXG4gICAgICAgIHRoaXMuZmllbGRUYWJbMl0gPSBkYXRlRmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYlszXSA9IGVtYWlsRmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYls0XSA9IHNlbGVjdGVkRmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZFRhYls1XSA9IGNoZWNrYm94RmllbGQ7XHJcbiAgICB9XHJcbiAgICAqL1xyXG5cclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmllbGRUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0VmFsdWU6IHN0cmluZztcclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHRleHRhcmVhW25hbWU9JHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1dYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlbGVjdFtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgIGlmKCg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSR7dGhpcy5maWVsZFRhYltpXS5uYW1lfV1gKSkuY2hlY2tlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gXCJUYWtcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gXCJOaWVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWVsZFRhYltpXS52YWx1ZSA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmdldFZhbHVlUmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiAke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9PC9wPmBcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLmlubmVySFRNTCA9IHRoaXMuZ2V0VmFsdWVSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5nZXRWYWx1ZVJlc3VsdCA9IFwiIFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmZpZWxkVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICBJbnB1dCwgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgVGV4dEFyZWEsICAgICAgIDFcclxuICAgICAgICAgICAgICAgIERhdGUsICAgICAgICAgICAyXHJcbiAgICAgICAgICAgICAgICBFbWFpbCwgICAgICAgICAgM1xyXG4gICAgICAgICAgICAgICAgU2VsZWN0RmllbGQsICAgIDRcclxuICAgICAgICAgICAgICAgIENoZWNrQm94ICAgICAgICA1XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5maWVsZFRhYltpXS5maWVsZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cInRleHRcIiwgdmFsdWU9XCJcIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPHRleHRhcmVhIG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIj48L3RleHRhcmVhPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiZGF0ZVwiLCB2YWx1ZT1cIlwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8aW5wdXQgbmFtZT1cIiR7dGhpcy5maWVsZFRhYltpXS5uYW1lfVwiLCB0eXBlPVwiZW1haWxcIiwgdmFsdWU9XCJcIj48L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTogPHNlbGVjdCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIgaWQ9XCJcIj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxvcHRpb24gaWQ9XCIke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX1cIj4ke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPC9zZWxlY3Q+PC9wPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxwPiR7dGhpcy5maWVsZFRhYltpXS5sYWJlbH06IDxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJjaGVja2JveFwiLCB2YWx1ZT1cIlwiPjwvcD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpLmlubmVySFRNTCA9IHRoaXMucmVzdWx0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuLi9JbnRlcmZhY2VzL3N0b3JhZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZSB7XHJcbiAgICBhbGxEb2N1bWVudHM6IEFycmF5PHN0cmluZz4gPSBbXTsgICAgLy8gQ29udGFpbnMgYWxsIHNhdmVkIGRvY3VtZW50cyAoZG9jdW1lbnQgSUQgaW4gc3RyaW5nIGFycmF5KVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgaWYoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRG9jdW1lbnRzJykpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbERvY3VtZW50cycsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVEb2N1bWVudChmaWVsZHNWYWx1ZTogYW55KXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWREb2N1bWVudDogc3RyaW5nO1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlkRG9jdW1lbnQgPSB0aW1lc3RhbXAudG9TdHJpbmcoKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpZERvY3VtZW50LCBKU09OLnN0cmluZ2lmeShmaWVsZHNWYWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzLnB1c2goaWREb2N1bWVudCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbERvY3VtZW50c2AsIEpTT04uc3RyaW5naWZ5KHRoaXMuYWxsRG9jdW1lbnRzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkRG9jdW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERvY3VtZW50KGlkRG9jdW1lbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRvY1ZhbHVlczogQXJyYXk8b2JqZWN0PjtcclxuICAgICAgICBkb2NWYWx1ZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkRG9jdW1lbnQpKTtcclxuICAgICAgICByZXR1cm4gZG9jVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREb2N1bWVudHMoKXtcclxuICAgICAgICBsZXQgaWREb2NUYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxEb2N1bWVudHNgKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkRG9jVGFiO1xyXG4gICAgfVxyXG59Il19
