/*
. classes
# ids
nome do elemento
querySelector => seleciona apenas um elemento (o primeiro que encontrar)
querySelectorAll => seleciona todos os elementos e coloca dentro de um array
*/
const body = document.querySelector('body');
const game = document.querySelector('.game');

const count = document.querySelector('h1');
const reset = document.querySelector('#reset');

const ash = document.querySelector('#ash');

const gengar = document.querySelector('#gengar');
const eevee = document.querySelector('#eevee');
const mudkip = document.querySelector('#mudkip');

let findGengar = false;
let findEevee = false;
let findMudkip = false;

const audio = document.querySelector('audio')
audio.volume = 0.05;

const musicControl = document.querySelector('.music-control')
musicControl.addEventListener('click', (event) =>{
    event.stopPropagation();

    event.target.src = `${event.target.src}`.includes('on.png')
    ? '../icons/off.png'
    : '../icons/on.png';

    `${event.target.src}`.includes('on.png') ? audio.play() : audio.pause();
});

reset.addEventListener('click', () =>{
    window.location.reload();
    reset.style.display = 'none';
});

function clearCharactersAndFinishGame(){
    ash.style.display = 'none';
    gengar.style.display = 'none';
    eevee.style.display = 'none';
    mudkip.style.display = 'none';

    reset.style.display = 'block';
    count.textContent = '';
}

let currentCount = 20;

const interval = setInterval(() => {
    if(currentCount <= 0){
        game.style.backgroundImage = "url('../background/gameover.jpg')";

        clearCharactersAndFinishGame()
        clearInterval(interval);
        return;
    }
    currentCount--;
    count.textContent = currentCount;
}, 1000);

function finishGame(){
    if(findGengar && findEevee && findMudkip){
        
    const timeOut = setTimeout(() => {
            game.style.backgroundImage = "url('../background/win.jpg')";
            
            clearCharactersAndFinishGame();
            clearInterval(interval);
            clearTimeout(timeOut);
            audio.pause();
        }, 800);
    }
}

function getRightPosition(){
    return parseInt(ash.style.right.split('px')) || 2;
}

function getTopPosition(){
    return parseInt(ash.style.top.split('px')) || 2;
}

function verifyLookPokemon(to){

    finishGame();

    const pokemonRightPosition = to === 'KeyA'
    ? `${getRightPosition() - 64}px`
    : `${getRightPosition() + 64}px`

    if(findGengar){
        const newTopPosition = (to = 'KeyW'
        ? `${getTopPosition() + 8}px`
        : `${getTopPosition() - 8}px`);

        gengar.style.right = pokemonRightPosition;
        gengar.style.top = newTopPosition;
    }
    
    if(findEevee){
        const newTopPosition = (to = 'KeyW'
        ? `${getTopPosition() + 36}px`
        : `${getTopPosition() - 36}px`);

        eevee.style.right = pokemonRightPosition;
        eevee.style.top = newTopPosition;
    }

    if(findMudkip){
        const newTopPosition = (to = 'KeyW'
        ? `${getTopPosition() + 72}px`
        : `${getTopPosition() - 72}px`);

        mudkip.style.right = pokemonRightPosition;
        mudkip.style.top = newTopPosition;
    }

    if((getTopPosition() >= 2 && getTopPosition() <= 98) && getRightPosition() >= 130 && getRightPosition() <= 216){
        gengar.style.display = 'block';
        findGengar = true;
        return;
    }
    if((getTopPosition() >= 474 && getTopPosition() <= 594) && getRightPosition() <= 138 && getRightPosition() >= 42){
        mudkip.style.display = 'block';
        findMudkip = true;
        return;
    }
    if((getTopPosition() >= 266 && getTopPosition() <= 394) && getRightPosition() >= 546 && getRightPosition() <= 650){
        eevee.style.display = 'block';
        findEevee = true;
        return;
    }
}

body.addEventListener('keydown', (event) => {
    event.stopPropagation();

    //console.log(event.code);
    switch (event.code) {
        case 'KeyA':
            if(getRightPosition() < 770){
                ash.style.right = `${getRightPosition() + 8}px`
                ash.src = "../personagem/left.png";
            }
            break;

        case 'KeyD':
            if(getRightPosition() > 2){
                ash.style.right = `${getRightPosition() - 8}px`
                ash.src = "../personagem/right.png";
            }
            break;
        
        case 'KeyS':
            if(getTopPosition() < 625){
                ash.style.top = `${getTopPosition() + 8}px`
                ash.src = "../personagem/front.png";
            }
            break;

        case 'KeyW':
            if(getTopPosition() > 2){
                ash.style.top = `${getTopPosition() - 8}px`
                ash.src = "../personagem/back.png";
            }
            
            break;
    
        default:
            break;
    }

    verifyLookPokemon(event.code)

});
