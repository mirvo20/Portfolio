var home_btn = document.getElementById("btn1");
var contact_btn = document.getElementById("btn2");
var skills_btn = document.getElementById("btn3");
var projects_btn = document.getElementById("btn4");

//vynl player vars
var box = document.getElementById("player");
var svgNS = 'http://www.w3.org/2000/svg';
// var play_button = document.getElementById("player_btn") // same reason as the html code

function home(){
    home_btn.classList.add("selected")
    contact_btn.classList.remove("selected")
    skills_btn.classList.remove("selected")
    projects_btn.classList.remove("selected")
}

function contact(){
    home_btn.classList.remove("selected")
    contact_btn.classList.add("selected")
    skills_btn.classList.remove("selected")
    projects_btn.classList.remove("selected")
}

function skills(){
    home_btn.classList.remove("selected")
    contact_btn.classList.remove("selected")
    skills_btn.classList.add("selected")
    projects_btn.classList.remove("selected")
}

function projects(){
    home_btn.classList.remove("selected")
    contact_btn.classList.remove("selected")
    skills_btn.classList.remove("selected")
    projects_btn.classList.add("selected")
}

// as the page refreshed the states were being refreshed so i found a fix online:

const page = window.location.pathname.split("/").pop();

if (page === "index.html") home();
else if (page === "contact.html") contact();
else if (page === "skills.html") skills();
else if (page === "projects.html") projects();


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
