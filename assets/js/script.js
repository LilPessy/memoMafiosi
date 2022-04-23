let cards = document.querySelectorAll('.card');
let errors = 0;
let score=0;
let modal = document.querySelector('.modal');
let pointModal = document.querySelector('.pointModal');

for(let i = 0; i < cards.length; i++){
    if((!cards[i].classList.contains('paired')) || (selectedCards.length == 2)){
        
        cards[i].addEventListener('click', function(e){
            errors++;
            console.log(errors);
            let card = e.currentTarget;
            card.classList.toggle('selected');
            let selectedCards = document.querySelectorAll('.card.selected');

            if(selectedCards.length===2){
                if(selectedCards[0].dataset.name === selectedCards[1].dataset.name){
                    selectedCards[0].classList.add('paired');
                    selectedCards[1].classList.add('paired');
                    selectedCards[0].classList.remove('selected');
                    selectedCards[1].classList.remove('selected');
                    givePoint();
                }
                for(let i = 0; i < selectedCards.length; i++){
                    setTimeout(function(){
                        selectedCards[i].classList.remove('selected');
                    }, 1000);
                }
                
            }
        });
    }
}

let names = ["lil", "lil", "cix", "cix", "genb", "genb", "gabbo", "gabbo", "nto", "nto"];

let cardContent = []; 

for(let i=0; i<names.length; i++){
    let name = names[Math.floor(Math.random()*names.length)];
    let j = names.indexOf(name);
    names.splice(j,1);
    i--;
    cardContent.push(name);
}

console.log(cardContent);

let faces = document.querySelectorAll('.faccia');

for(let i=0; i<cardContent.length; i++){
    cards[i].dataset.name = cardContent[i];
    faces[i].style.backgroundImage = "url('assets/img/"+cardContent[i]+".jpg')";
}

function givePoint(){
    if(errors>4){
        score+=100;
        pointModal.classList.remove('hidden');
        pointModal.innerHTML=("+100");
    }else if(errors===2){
        score+=500;
        console.log("+500");
    }else{
        score+=250;
        console.log("+250");
    }
    errors=0;
    let scoreElement = document.querySelector('.points');
    scoreElement.innerHTML = score;
}
