let cards = document.querySelectorAll('.card');

for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', function(e){
        let card = e.currentTarget;
        card.classList.toggle('selected');
        let selectedCards = document.querySelectorAll('.card.selected');
        console.log(selectedCards);

        if(selectedCards.length>=2){
            for(let i = 0; i < selectedCards.length; i++){
                setTimeout(function(){
                    selectedCards[i].classList.remove('selected');
                }, 1000);
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
    if(cardContent[i] === "nto"){
        faces[i].style.backgroundImage = "url('assets/img/nto.jpg')";
    }
}

