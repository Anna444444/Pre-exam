import {Book} from "./book.js";
import { Visitor } from "./visitor.js";
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
 let response = await getBook();

 for(let book=0; book<response.total; book++){

    bk.push(new Book(response.books[book]));

 }

 const visitorsData = [
  {
    fullName: 'Лукашевич Анна Васильевна',
    address: 'г. Алматы, ул. Айманова, д. 140',
    phone: '+7 705 1904599',
    image: 'img/фото1.jpg'
  },
 
  {
    fullName: 'Иванов Павел Леонидович',
    address: 'г. Алматы, ул. Ленина, д. 100',
    phone: '+7 777 1589647 ',
    image: 'img/images.jpg'
  },

  {
    fullName: 'Скворцов Иван Иванович',
    address: 'г. Алматы, ул. Жамбыла, д. 87',
    phone: '+7 700 8964785',
    image: 'img/muzhchina_kapyushon_1774.jpg'
  },
  
];

const readers = [];

visitorsData.forEach(data => {
  const reader = new Visitor(data);
  readers.push(reader);
});

function renderReaders() {
  const usersList = document.getElementById('users');
  usersList.innerHTML = '';

  readers.forEach(reader => {
    const readerItem = document.createElement('li');
    readerItem.classList.add('reader-item');

    const readerImage = document.createElement('img');
    readerImage.src = reader.image;
    readerImage.alt = 'Reader photo';
    readerItem.appendChild(readerImage);

    const readerInfo = document.createElement('div');
    readerInfo.classList.add('reader-info');
    readerItem.appendChild(readerInfo);

    const readerFullName = document.createElement('h3');
    readerFullName.textContent = reader.fullName;
    readerInfo.appendChild(readerFullName);

    const readerAddress = document.createElement('p');
    readerAddress.textContent = 'Адрес: ' + reader.address;
    readerInfo.appendChild(readerAddress);

    const readerPhone = document.createElement('p');
    readerPhone.textContent = 'Телефон: ' + reader.phone;
    readerInfo.appendChild(readerPhone);

    const viewButton = document.createElement('button');
    viewButton.addEventListener('click', () => {
      showReaderModal(reader);
    });
    readerItem.appendChild(viewButton);

    usersList.appendChild(readerItem);
  });
}

let newb = document.querySelector('#newB');

newb.onclick = () => {
  let newBk = document.querySelector('#newBooksPage');
  let given = document.querySelector('.givenBooksPage');
  let readers = document.querySelector('#readersPage');
  given.classList.add('unactive');
  newBk.classList.remove('unactive');
  readers.classList.add('unactive');

  bk.forEach(book => {
    newBk.append(book.view);
  });
};

let readersVisible = false;

function showReaders() {
  const readersPage = document.getElementById('readersPage');
  readersPage.classList.remove('unactive');

  renderReaders();
}

function hideReaders() {
  const readersPage = document.getElementById('readersPage');
  readersPage.classList.add('unactive');
}

function toggleReaders() {
  readersVisible = !readersVisible;

  if (readersVisible) {
    showReaders();
  } else {
    hideReaders();
  }
}

const readersTab = document.getElementById('readers');
readersTab.addEventListener('click', toggleReaders);

document.getElementById('users').addEventListener('click', event => {
  const readerName = event.target.innerText;
  const reader = readers.find(reader => reader.fullName === readerName);
  if (reader) {
    showReaderModal(reader);
  }
});

function showReaderModal(reader) {
}

function hideReaderModal() {
}

function hideAllPages() {
  const newBooksPage = document.getElementById('newBooksPage');
  const readersPage = document.getElementById('readersPage');
  const givenBooksPage = document.querySelector('.givenBooksPage');

  newBooksPage.classList.add('unactive');
  readersPage.classList.add('unactive');
  givenBooksPage.classList.add('unactive');
}

document.getElementById('newB').addEventListener('click', function () {
  hideAllPages();
  document.getElementById('newBooksPage').classList.remove('unactive');
});

document.getElementById('readers').addEventListener('click', function () {
  hideAllPages();
  document.getElementById('readersPage').classList.remove('unactive');
});

document.getElementById('issued').addEventListener('click', function () {
  hideAllPages();
  document.querySelector('.givenBooksPage').classList.remove('unactive');
});

document.addEventListener('DOMContentLoaded', () => {
});

document.getElementById('search').addEventListener('click', function () {
});

const addReaderButton = document.getElementById('addReader');
addReaderButton.addEventListener('click', openModal);

function openModal() {
}

let data = {
  fullName: 'Лукашевич Анна Васильевна',
  address: 'г. Алматы, ул. Айманова, д. 140',
  phone: '+7 705 1904599',
  image: 'img/фото1.jpg'
};

let reader = new Visitor(data);
document.getElementById('users').appendChild(reader.view);