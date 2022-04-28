let cards = document.querySelectorAll('.card');
let errors = 0;
let score=0;
let modal = document.querySelector('.modal');
let pointModal = document.querySelector('.pointModal');
let flipSound = new Audio('assets/sound/flip.mp3');
let pointSound = new Audio('assets/sound/point.mp3');
let winSound = new Audio('assets/sound/win.mp3');
let end = false;
let pairedCards = document.querySelectorAll('.paired');

//&&(!cards[i].classList.contains('selected'))
for(let i = 0; i < cards.length; i++){
    
        cards[i].addEventListener('click', function(e){
            let selectedCards = document.querySelectorAll('.card.selected');
            console.log(selectedCards.length);
            if(!cards[i].classList.contains('selected') && (!cards[i].classList.contains('paired'))){
            errors++;
            flipSound.play();
            console.log(errors);
            let card = e.currentTarget;
            card.classList.toggle('selected');
            selectedCards = document.querySelectorAll('.card.selected');
            
            if(selectedCards.length>=2){
                if(selectedCards[0].dataset.name === selectedCards[1].dataset.name){
                    selectedCards[0].classList.add('paired');
                    selectedCards[1].classList.add('paired');
                    selectedCards[0].classList.remove('selected');
                    selectedCards[1].classList.remove('selected');
                    selectedCards.splice(0,2)
                    pointSound.play();
                    givePoint();
                    pairedCards = document.querySelectorAll('.paired');
                    if(pairedCards.length===10){
                        end = true;
                        win();
                        /*modal.classList.remove('hidden');
                        modal.innerHTML = "You won! Your score is: "+score;*/
                    }
                }
                
                for(let i = 0; i < selectedCards.length; i++){
                    setTimeout(function(){
                        flipSound.play();
                        selectedCards[i].classList.remove('selected');
                    }, 1000);
                }
                
            }
        }
        });
    
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
    modal.classList.remove('hidden');
    modal.classList.add('fadeIn');
    let scoreModal = document.querySelector('.score');
    scoreModal.innerHTML = score;

    let timeModal = document.querySelector('.time');
    timeModal.innerHTML = hour+":"+min+":"+sec;
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
                seconds.innerHTML = sec;
                if(sec===60){
                    sec=0;
                    min++;
                    minutes.innerHTML = min;
                }
                if(min===60){
                    min=0;
                    hour++;
                    hours.innerHTML = hour;
                }
            }
        }, 1000);
    
        
    
