import { LocStorage } from "./locStorage";

export class DocumentList {
    allDocuments: Array<string>;
    renderResult: string = '';

    constructor(){
        if(!(localStorage.getItem('allDocuments'))){
            localStorage.setItem('allDocuments', '');
        }
        if(localStorage.getItem(`allDocuments`).length < 1){
            this.allDocuments = [];
        }
        else{
            this.getDocumentList();
            this.render();
        }
        
    }

    getDocumentList() {
        this.allDocuments = new LocStorage().getDocuments();
    }

    render() {
        this.renderResult = '';
        this.getDocumentList();
        this.renderResult += '<table border=1><tr><td>id</td></tr>';
        for(var i:number = 0; i < this.allDocuments.length; i++) {
            this.renderResult += `<tr><td>${this.allDocuments[i]}</td></tr>`
        }
        this.renderResult += '</table>'

        document.getElementById('document-list').innerHTML = this.renderResult;
    }
}