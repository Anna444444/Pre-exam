export class GiveModel{
    constructor(src){
        this.date = (Number(new Date().getDate())+14)+"."+ (Number(new Date().getMonth())+1);
        this.src =src;
    }
    show(){
        let h2 =document.createElement('h2');
        h2.textContent = 'Выдать книгу';
        let img = document.createElement('img');
        img.src = this.src;

        //поле для выбора читателя

        let p =document.createElement('p');
        p.textContent = "До:"+this.date;

        let okBtn =document.createElement('button');
        let closeBtn = document.createElement('button');
        okBtn.textContent ='Ok';
        okBtn.classList.add('giveOkBtn');
        closeBtn.textContent = 'Отмена';
        closeBtn.classList.add('giveCloseBtn');

        let select =document.createElement('select');

        

        let div = document.createElement('div');
        div.classList.add('giveModelWin');
        
        div.append(h2);
        div.append(img);
        div.append(p);
        div.append(okBtn);
        div.append(closeBtn);

        document.body.append(div);

        closeBtn.onclick =()=>{
            document.body.removeChild(div);
        }

    }
}


