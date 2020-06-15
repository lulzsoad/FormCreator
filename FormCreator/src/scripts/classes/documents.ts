import { LocStorage } from "../classes/locStorage";

class DocumentList {
    allDocuments: Array<string>;

    getDocumentList() {
        this.allDocuments = new LocStorage().getDocuments();
    }
}