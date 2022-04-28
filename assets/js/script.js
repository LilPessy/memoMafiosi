if (typeof Object.prototype.equals !== 'function') {
    Object.prototype.equals = function(x) {
        for (p in this) {
            switch (typeof(this[p])) {
            case 'object':
                if (!this[p].equals(x[p])) {
                    return false;
                }
                break;
            case 'function':
                if (typeof(x[p]) == 'undefined' || (p != 'equals' && this[p].toString() != x[p].toString())) {
                    return false;
                }
                break;
            default:
                if (this[p] != x[p]) {
                    return false;
                }
            }
        }

        for (p in x) {
            if (typeof(this[p]) == 'undefined') {
                return false;
            }
        }

        return true;
    }
}        

let names = [
    {
        id: 1,
        name: "lil",
        path: "assets/img/lil.jpg"
    },

    {
        id: 2,
        name: "cix",
        path: "assets/img/cix.jpg"
    },

    {
        id: 3,
        name: "genb",
        path: "assets/img/genb.jpg"
    },

    {
        id: 4,
        name: "gabbo",
        path: "assets/img/gabbo.jpg"
    },

    {
        id: 5,
        name: "nto",
        path: "assets/img/nto.jpg"
    }
];

let cardContent = []; 


while (cardContent.length < 10) { 
    let name = names[Math.floor(Math.random() * names.length)];
    let count = 0;
    for(let i=0; i<cardContent.length; i++){
        if(cardContent[i].equals(name)){
            count++;
        }
    }
    if (count < 2) { 
        cardContent.push(name);
    }
}

let container = document.querySelector('.container');

for (let i = 0; i < cardContent.length; i++) { 
    let card = document.createElement("div");
    card.classList.add("card");
    let back = document.createElement("div");
    back.classList.add("dorso");
    card.appendChild(back);
    let front = document.createElement("div");
    front.classList.add("faccia");
    card.appendChild(front);
    container.appendChild(card);
}

let cards = document.querySelectorAll('.card');
let faces = document.querySelectorAll('.faccia');

for(let i=0; i<cardContent.length; i++){
    cards[i].dataset.name = cardContent[i].name;
    faces[i].style.backgroundImage = "url("+cardContent[i].path+")";
}




let errors = 0;
let score=0;
let modal = document.querySelector('.modal');
let pointModal = document.querySelector('.pointModal');
let flipSound = new Audio('assets/sound/flip.mp3');
let pointSound = new Audio('assets/sound/point.mp3');
let winSound = new Audio('assets/sound/win.mp3');
let end = false;
let pairedCards = document.querySelectorAll('.paired');

for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', function (e) {
        let selectedCards = document.querySelectorAll('.card.selected');
        if (selectedCards.length < 2 && !cards[i].classList.contains('paired') && !cards[i].classList.contains('selected')) {
            errors++;
            flipSound.play();
            let card = e.currentTarget;
            card.classList.toggle('selected');
            selectedCards = document.querySelectorAll('.card.selected');
        

            if (selectedCards.length >= 2) {
                if (selectedCards[0].dataset.name === selectedCards[1].dataset.name) {
                    selectedCards[0].classList.add('paired');
                    selectedCards[1].classList.add('paired');
                    pointSound.play();
                    givePoint();
                    pairedCards = document.querySelectorAll('.paired');
                    if (pairedCards.length === 10) {
                        end = true;
                        win();
                    }
                }
                
                for (let i = 0; i < selectedCards.length; i++) {
                    setTimeout(function () {
                        if (!selectedCards[i].classList.contains('paired')) {
                            flipSound.play();
                        }
                        selectedCards[i].classList.remove('selected');
                    }, 1000);
                }
                
            }
        }
    });
}

function givePoint(){
    if(errors>4){
        score+=100;
        pointModal.innerHTML=("+100");
        pointModal.classList.remove('hidden');
        pointModal.classList.add('fadeIn');
        setTimeout(function(){
            pointModal.classList.remove('fadeIn');
        }, 500);
        setTimeout(function(){
            pointModal.classList.add('fadeOut');
            setTimeout(function(){
                pointModal.classList.remove('fadeOut');
                pointModal.classList.add('hidden');
            }, 500);
        }, 2000);
        
    }else if(errors===2){
        score+=500;
        pointModal.innerHTML=("+500");
        pointModal.classList.remove('hidden');
        pointModal.classList.add('fadeIn');
        setTimeout(function(){
            pointModal.classList.remove('fadeIn');
        }, 500);
        setTimeout(function(){
            pointModal.classList.add('fadeOut');
            setTimeout(function(){
                pointModal.classList.remove('fadeOut');
                pointModal.classList.add('hidden');
            }, 500);
        }, 2000);
    }else{
        score+=250;
        pointModal.innerHTML=("+250");
        pointModal.classList.remove('hidden');
        pointModal.classList.add('fadeIn');
        setTimeout(function(){
            pointModal.classList.remove('fadeIn');
        }, 500);
        setTimeout(function(){
            pointModal.classList.add('fadeOut');
            setTimeout(function(){
                pointModal.classList.remove('fadeOut');
                pointModal.classList.add('hidden');
            }, 500);
        }, 2000);
    }
    errors=0;
    let scoreElement = document.querySelector('.points');
    scoreElement.innerHTML = score;
}

function win(){
    winSound.play();
    
    let node = document.createElement("h4");
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.appendChild(document.createTextNode("Play Again"));
    let modalContent = document.querySelector('.modalContent');
    
    
    if (localStorage.getItem("score") == null) {
        localStorage.setItem("score", score);
        modalContent.appendChild(btn);
    } else {
        if (score > localStorage.getItem("score")) {
            localStorage.setItem("score", score);
            let textnode = document.createTextNode("New record!");
            node.appendChild(textnode);
            modalContent.appendChild(node);
            modalContent.appendChild(btn);
        } else {
            let textnode = document.createTextNode("Your best " + localStorage.getItem("score"));
            node.appendChild(textnode);
            modalContent.appendChild(node);
            modalContent.appendChild(btn);
        }
    }

    modal.classList.remove('hidden');
    modal.classList.add('fadeIn');
    let scoreModal = document.querySelector('.score');
    scoreModal.innerHTML = score;

    let timeModal = document.querySelector('.time');
    timeModal.innerHTML = hour + ":" + min + ":" + sec;
    
    let reload = document.querySelector('.btn');

    reload.addEventListener('click', function () {
        location.reload();
    });
}

let seconds = document.querySelector('.seconds');
let minutes = document.querySelector('.minutes');
let hours = document.querySelector('.hours');

let sec = 0;
let min = 0;
let hour = 0;
    
setInterval(function(){
    if(!end){
        sec++;
        if (sec < 10) {
            seconds.innerHTML = "0" + sec;
        } else {
            seconds.innerHTML = sec;
        }
        if(sec===60){
            sec=0;
            min++;
            if (min < 10) {
                minutes.innerHTML = "0" + min;
            } else { 
                minutes.innerHTML = min;
            }    
        }
        if(min===60){
            min=0;
            hour++;
            if (hour < 10) {
                hours.innerHTML = "0" + hour;
            } else { 
                hours.innerHTML = hour;
            }
        }
    }
}, 1000);
    

    
