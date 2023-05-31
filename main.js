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

 function showVisitors() {
   const rightSideContainer = document.querySelector('.right-side');
   rightSideContainer.innerHTML = '';
 
   const visitorsListContainer = document.createElement('div');
   visitorsListContainer.id = 'visitorsList';
   rightSideContainer.appendChild(visitorsListContainer);
 
   const visitorsData = [
     {
       fullName: 'Лукашевич Анна Васильевна',
       address: 'г. Алматы, ул. Айманова, д. 140',
       phone: '+7 705 1904599',
       image: 'img/фото1.jpg'
     },
    
     {
       fullName: 'Иванов Павел Леонидович',
       address: 'г. Fkvfns, ул. Ленина, д. 100',
       phone: '+7 777 1589647',
       image: 'img/images.jpg'
     },
 
     {
       fullName: 'Скворцов Иван Иванович',
       address: 'г. Алматы, ул. Жамбыла, д. 87',
       phone: '+7 700 8964785',
       image: 'img/muzhchina_kapyushon_1774.jpg'
     },
     
   ];
 
   visitorsData.forEach(data => {
     const visitor = new Visitor(data);
     visitorsListContainer.appendChild(visitor.view);
   });
 }
 
function activateVisitors() {
  const tabs = document.querySelectorAll('.tabs li');
  tabs.forEach(tab => {
      if (tab.id === 'readers') {
          tab.classList.add('active');
      } else {
          tab.classList.remove('active');
      }
  });
  showVisitors();
}

function toggleReaders() {
  const readersTab = document.getElementById('readers');
  const readersPage = document.getElementById('readersPage');
  
  if (readersPage.classList.contains('unactive')) {
      readersPage.classList.remove('unactive');
      readersTab.classList.add('active');
      showVisitors();
  } else {
      readersPage.classList.add('unactive');
      readersTab.classList.remove('active');
  }
}

const readersTab = document.getElementById('readers');
readersTab.addEventListener('click', toggleReaders);


