import {Book} from "./book.js";
//import * as Visitor from "./visitor.js";
const log = console.log;
const url = "https://www.dbooks.org/api/recent";

async function getBook(){
    log("getting book");
    let response = await fetch(url);
    log(response);
    if(response.ok){
        let json = await response.json();
        log(json);
        return json;
    }
 }

 let bk = [];
 let response = await getBook()

 for(let book=0; book<response.total; book++){

    bk.push(new Book(response.books[book]));

 }




