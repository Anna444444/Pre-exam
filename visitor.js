export class Visitor {
  constructor(data) {
    this.id = Date.now();
    this.fullName = data.fullName;
    this.address = data.address;
    this.phone = data.phone;
    this.image = data.image;
    this.registrationDate = new Date();
    this.booksOnHand = [];
    this.view = this.createView();
  }

  createView() {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div>
        <img src="${this.image}" alt="Фото">
        <h3>${this.fullName}</h3>
        <p>Адрес: ${this.address}</p>
        <p>Телефон: ${this.phone}</p>
        <p>Дата регистрации: ${this.registrationDate.toLocaleDateString()}</p>
      </div>
      <ul class="books-on-hand">
        ${this.booksOnHand.map(book => `<li>${book}</li>`).join('')}
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
        <h3>${this.fullName}</h3>
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

const data = {
  fullName: 'Лукашевич Анна Васильевна',
  address: 'г. Алматы, ул. Айманова, д. 140',
  phone: '+7 705 1904599',
  image: 'img/фото1.jpg'
};

const reader = new Visitor(data);
document.getElementById('readersList').appendChild(reader.view);