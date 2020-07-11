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
            //this.render();
        }
        
    }

    getDocumentList(): void {
        this.allDocuments = new LocStorage().getDocuments();
    }

    render(): void {
        let allDocs: Array<string> = this.allDocuments;
        this.renderResult = '<h1>Lista dokumentów</h1>';
        this.getDocumentList();
        let removeButtons: Array<Element> = [,];

        this.renderResult += '<table border=1><tr><td>id</td><td>Edytuj</td><td>Usuń</td></tr>';
        for(var i:number = 0; i < this.allDocuments.length; i++) {
            this.renderResult += `<tr><td><p id=doc-id-${i}>${this.allDocuments[i]}</p></td><td><a href="./edit-document.html?id=${this.allDocuments[i]}">Edytuj</a></td><td><input id=btn-remove-doc-${allDocs[i]} type=button value=Usuń></td></tr>`
        }
        this.renderResult += '</table>'

        document.getElementById('document-list').innerHTML = this.renderResult; // Rendering list

        // Adding click events to remove buttons
        for(let j: number = 0; j< allDocs.length; j++){
            removeButtons[j] = document.querySelector(`#btn-remove-doc-${allDocs[j]}`);
            if(removeButtons[j]){
                removeButtons[j].addEventListener('click', function(){
                    new DocumentList().removeDocument(allDocs[j]);
                })
            }
        }
    }

    getDocument(id: string): any{
        let doc: any = JSON.parse(localStorage.getItem(`${id}`));
        return doc;
    }

    removeDocument(id: string): void {
        localStorage.removeItem(`${id}`);
        let allDocumentsTab: Array<string> = JSON.parse(localStorage.getItem(`allDocuments`));
        let index: number = allDocumentsTab.indexOf(id);
        if (index > -1) {
            allDocumentsTab.splice(index, 1);
            }
        localStorage.setItem(`allDocuments`, JSON.stringify(allDocumentsTab));
        window.location.reload();
    }
}