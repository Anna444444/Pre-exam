export class Visitor {
  constructor(data) {
    this.id = Date.now();
    this.fullName = data.fullName;
    this.address = data.address;
    this.phone = data.phone;
    this.image = data.image;
    this.day =new Date().getDate();
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.registrationDate = this.day +"."+this.month +"."+this.year;
    this.booksOnHand = [];
    this.view = this.createView();
  }

  returnBook(book) {
    const index = this.booksOnHand.indexOf(book);
    if (index !== -1) {
      this.booksOnHand.splice(index, 1);
    }
  } 

  createView() {
    const listItem = document.createElement('li');
    listItem.classList.add('reader-item');
    listItem.innerHTML = `
      <div>
        <img src="${this.image}" alt="Фото">
        <h3 class="reader">${this.fullName}</h3>
        <p>Адрес: ${this.address}</p>
        <p>Телефон: ${this.phone}</p>
        <p>Дата регистрации: ${this.registrationDate}</p>
      </div>
      <ul class="books-on-hand">
        ${this.booksOnHand.map(book => `<li>${book.title} (${book.returnDate})</li>`).join('')}
      </ul>
    `;
    return listItem;
  }

  setNewPhoto(url) {
    this.image = url;
    this.updateView();
  }

  changeAddress(newAddress) {
    this.address = newAddress;
    this.updateView();
  }

  changePhone(newPhone) {
    this.phone = newPhone;
    this.updateView();
  }

  addBook(book) {
    this.booksOnHand.push(book);
    this.updateView();
  }

  removeBook(book) {
    const index = this.booksOnHand.indexOf(book);
    if (index !== -1) {
      this.booksOnHand.splice(index, 1);
      this.updateView();
    }
  }

  updateView() {
    this.view.innerHTML = `
      <div>
        <img src="${this.image}" alt="Фото">
        <h3 class="reader">${this.fullName}</h3>
        <p>Адрес: ${this.address}</p>
        <p>Телефон: ${this.phone}</p>
        <p>Дата регистрации: ${this.registrationDate.toLocaleDateString()}</p>
      </div>
      <ul class="books-on-hand">
        ${this.booksOnHand.map(book => `<li>${book}</li>`).join('')}
      </ul>
    `;
  }
}

function renderReaders() {
  const usersList = document.getElementById('users');
  usersList.innerHTML = '';

  readers.forEach(reader => {
    const readerItem = document.createElement('li');
    readerItem.textContent = reader.fullName;
    usersList.appendChild(readerItem);
  });
}


let data = {
  fullName: 'Лукашевич Анна Васильевна',
  address: 'г. Алматы, ул. Айманова, д. 140',
  phone: '+7 705 1904599',
  image: 'img/фото1.jpg'
};


let reader = new Visitor(data);
document.getElementById('users').appendChild(reader.view);