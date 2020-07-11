export class Router {

    static getParam(): string {
        const query: string = window.location.search.substr(1);
        const urlParams: URLSearchParams = new URLSearchParams(query); 
        const id: string = urlParams.get('id');
        return id;
    }

}