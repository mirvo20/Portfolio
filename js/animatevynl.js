//vynl player vars
var box = document.getElementById("player");
var svgNS = 'http://www.w3.org/2000/svg';
// var play_button = document.getElementById("player_btn") // same reason as the html code




async function load_player() { // have to use async so i can make it start after elemts start loading in
    var response = await fetch('./assets/player-grouped.svg');
    var svgTxt = await response.text();

    box.innerHTML = svgTxt;
    setupPlayer();

    setTimeout(function(){
        box.classList.add('playing');
    }, 200);
}

function rotatePart(groupId, centerX, centerY, tilt, className){

    var part = document.querySelector('#'+groupId) // couldnot find any grouped svgs for free so converted a png to svg and it being very scrambeled ased claude to group it, was planning on no AI useage but i guess that ends here :(

    part.setAttribute(
        'transform', 
        'translate('+ centerX + ' ' + centerY + ') scale(1 '+tilt + ')'
    ) // distort it match the tab;e tilt


var mover = document.createElementNS(svgNS, 'g');
mover.setAttribute('class',className); // empty group that the css can rotate apparantly

var holder = document.createElementNS(svgNS,'g');
holder.setAttribute('transform',
    'scale(1 ' + (1/tilt)+ ') translate('+ (-centerX) + ' ' + (-centerY) + ')' // empty group to unsquash the squashed drawing
);


while(part.firstChild){
    holder.appendChild(part.firstChild); // move the actual/original svg into the holder
}

mover.appendChild(holder);
part.appendChild(mover);
//sequnce of movement: part -> mover -> holder
}

function setupPlayer(){
    rotatePart('record', 289.3, 313, 0.36, 'spin'); // the record/disc
    rotatePart('tonearm',347,   296, 0.8, 'swing'); // the player arm / read head
}


//init the player
function startStop(){
    box.classList.toggle('playing');
}

// play_button.onclick = startStop;

load_player();

// box.onmouseenter = function () { box.classList.add('playing'); };
// box.onmouseleave = function () { box.classList.remove('playing'); };
// box.classList.add('playing');     // play as soon as the page loads, probably the one i will be using
