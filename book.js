const log = console.log;

export class Book {


    constructor(data) {
        console.log(data);
        this.id = data.id;
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.authors = data.authors;
        this.image = data.image;
        this.user = undefined;
        this.view = document.createElement('div');
        this.view.classList.add('book');
        this.view.insertAdjacentHTML("afterbegin", `<img src=${this.image}>  <p>${this.id}</p> <p >${this.title}</p> <p>${this.subtitle}</p> <p>${this.authors}</p> <p id="isGiven">Есть в наличии</p>`);
    }


    giveBook(user) {

        this.user = user;
        let isgvn = document.querySelector('#isGiven');
        isgvn.innerHTML = `<p>Выдано: ${this.user}</p>`;

    }

    returnBook(user) {
        this.user = undefined;
        let isgvn = document.querySelector('#isGiven');
        isgvn.innerHTML = `<p>Есть в наличии</p>`;
    }




}

