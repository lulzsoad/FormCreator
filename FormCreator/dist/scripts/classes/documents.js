"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var locStorage_1 = require("../classes/locStorage");
var DocumentList = /** @class */ (function () {
    function DocumentList() {
    }
    DocumentList.prototype.getDocumentList = function () {
        this.allDocuments = new locStorage_1.LocStorage().getDocuments();
    };
    return DocumentList;
}());
