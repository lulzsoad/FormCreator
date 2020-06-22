export class Router {

    static getParam() {
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query); 
        const id = urlParams.get('id');
        return id;
    }

}