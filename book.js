
const url = "https://www.dbooks.org/api/";

export class Book {

    log = console.log;
    constructor(data){
        this.id = data[id];
        this.title = data[title];
        this.subtitle = data[subtitle];
        this.authors = data[authors];
        this.image = data[image];
        this.view = document.createElement('div');
        this.view.insertAdjacentHTML(afterbegin, `<p>${this.id}</p>, <p>${this.title}</p>, <p>${this.subtitle}</p>, <p>${this.authors}</p>, <img src=${this.image}>`);

    }


    giveBook(user){

    }


}

 async function Getbook(){

    let response = await fetch(url);
    if(response.ok){
        let json = await response.json();
    }


    

 }