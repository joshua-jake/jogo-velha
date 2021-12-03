// dados iniciais , eventos , funções 

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

//events 
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//fuctions 
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = player;
        rederSquare();
        togglePlayer(); 
    }
    
}

function reset() {
    warning = '';
    //arredondando número aleatorio !
    let random = Math.floor(Math.random() * 2);
    player = (random ===0) ? 'x' : '0';
    // if(random ===0) {
    //     player = 'x';
    // }
    // else {
    //     player = '0';
    // }

    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    rederSquare();
    rederInfo();
}
//Verificando se tem elemento preenchido
function rederSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
       
    }

    checkGame();
}

function rederInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning; 
}

function togglePlayer() {
   player = (player === 'x') ? '0' : 'x';
   rederInfo();
}

function checkGame() {
   if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
   } 
   else if(checkWinnerFor('0')) {
       warning = 'O Zero "0" venceu';
       playing = false;
   }
   else if(isFull()) {
    warning = 'Deu empate';
    playing = false;
   }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let j in pos) {
        let pArray = pos[j].split(',');
        let hasWon = pArray.every(option => square[option]=== player); 
        if(hasWon) {
            return true;
        }
        
    }

    return false;
}

function isFull(){
    for(let i in square) {
        if(square[i] === ''){
            return false;
        }
    }
    
    return true;
    
}