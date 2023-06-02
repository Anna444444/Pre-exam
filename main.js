import { Book } from "./book.js";
import { Visitor } from "./visitor.js";
import { Booklist } from "./booklist.js";
const log = console.log;
const url = "https://www.dbooks.org/api/recent";
const find_url = "https://www.dbooks.org/api/search/";
const bookInp = document.querySelector('#book');
const search = document.querySelector('#search');




async function findBook(book_name) {
  log("finding book");
  let response = await fetch(find_url + '' + book_name);
  log(response);

  if (response.ok) {
    let json = await response.json();
    log(json);
    return json;
  }
}

async function getBook() {
  log("getting book");
  let response = await fetch(url);
  log(response);
  if (response.ok) {
    let json = await response.json();
    log(json);
    return json;
  }
}


let bk = [];
let response = await getBook();


for (let book = 0; book < response.total; book++) {

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
  reader.id = generateRandomId(); // Генерация случайного id
  reader.registrationDate = new Date().toLocaleDateString(); // Установка текущей даты регистрации
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

    const readerId = document.createElement('p');
    readerId.textContent = 'ID: ' + reader.id;
    readerItem.appendChild(readerId);

    const readerRegistrationDate = document.createElement('p');
    readerRegistrationDate.textContent = 'Дата регистрации: ' + reader.registrationDate;
    readerItem.appendChild(readerRegistrationDate);

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

function getBookByName() {

  let book = document.querySelector('#book');

  let book_name = book.value;
  

  return findBook(book_name);

}





async function generateFindedBooks() {

  let findedBooks = [];

  let ourBks = await getBookByName();



  for (let book = 0; book < ourBks.total; book++) {

    findedBooks.push(new Book(ourBks.books[book]));
  
  }

  let newBk = document.querySelector('#newBooksPage');
  newBk.innerHTML = '';
  let given = document.querySelector('.givenBooksPage');
  let readers = document.querySelector('#readersPage');
  given.classList.add('unactive');
  newBk.classList.remove('unactive');
  readers.classList.add('unactive');

  findedBooks.forEach(book => {
    newBk.append(book.view);
  });


}











search.addEventListener('click', generateFindedBooks);

function generateRandomId() {
  const characters = '0123456789';
  const length = 6;
  let randomId = '';

  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomId;
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
const modalContainer = document.getElementById('modalContainer');

addReaderButton.addEventListener('click', () => {
  showModal();
});

function showModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', hideModal);

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Добавление нового читателя';

  const readerImage = document.createElement('img');
  readerImage.id = 'readerImage';
  readerImage.src = '';
  readerImage.alt = 'Reader photo';
  modalContent.appendChild(readerImage);

  const imageInput = document.createElement('input');
  imageInput.id = 'imageInput';
  imageInput.type = 'file';
  imageInput.accept = 'image/*';

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'ФИО: ';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';

  const addressLabel = document.createElement('label');
  addressLabel.textContent = 'Адрес: ';
  const addressInput = document.createElement('input');
  addressInput.type = 'text';

  const phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Телефон: ';
  const phoneInput = document.createElement('input');
  phoneInput.type = 'text';

  const addButton = document.createElement('button');
  addButton.textContent = 'Ок';
  addButton.classList.add('addButton');

  addButton.addEventListener('click', () => {
    const fullName = nameInput.value;
    const address = addressInput.value;
    const phone = phoneInput.value;
    const image = readerImage.src;

    if (fullName && address && phone && image) {
      const reader = new Visitor({ fullName, address, phone, image });
      readers.push(reader);
      renderReaders();
      hideModal();
    }
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Отмена';
  cancelButton.classList.add('cancelButton');
  cancelButton.addEventListener('click', hideModal);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(readerImage);
  modalContent.appendChild(imageInput);
  modalContent.appendChild(nameLabel);
  modalContent.appendChild(nameInput);
  modalContent.appendChild(addressLabel);
  modalContent.appendChild(addressInput);
  modalContent.appendChild(phoneLabel);
  modalContent.appendChild(phoneInput);
  modalContent.appendChild(addButton);
  modalContent.appendChild(cancelButton);

  modal.appendChild(modalContent);
  modalContainer.appendChild(modal);

  imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        readerImage.src = e.target.result; 
        readerImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}//


function hideModal() {
  modalContainer.innerHTML = '';
}

let data = {
  fullName: 'Лукашевич Анна Васильевна',
  address: 'г. Алматы, ул. Айманова, д. 140',
  phone: '+7 705 1904599',
  image: 'img/фото1.jpg'
};

let reader = new Visitor(data);
document.getElementById('users').appendChild(reader.view);


// let a = new GiveModel('resourses/ex.png');
// a.show();

