// var files = [
//     '../assets/cassetts/cassette1.svg',
//     '../assets/cassetts/cassette2.svg',
//     '../assets/cassetts/cassette3.svg',
//     '../assets/cassetts/cassette4.svg',
//     '../assets/cassetts/cassette5.svg',
//     '../assets/cassetts/cassette6.svg',
//     '../assets/cassetts/cassette7.svg',
//     '../assets/cassetts/cassette8.svg',
//     '../assets/cassetts/cassette9.svg',
//     '../assets/cassetts/cassette10.svg',
//     '../assets/cassetts/cassette11.svg',
//     '../assets/cassetts/cassette12.svg'
// ];

var isPlaying = true;

async function loadCassette(skill) {
    
    var box = document.createElement('div');
    box.className = 'cassette-box';
    document.getElementById('shelf').appendChild(box);

    var response = await fetch (skill.cassette);
    var svgText = await response.text();
    box.innerHTML = svgText;

    var art = document.createElement('div');
    art.className = 'cassette-art';
    art.appendChild(makeArt(skill.art));
    box.appendChild(art);

    var tag = document.createElement('div');
    tag.className = 'cassette-name';
    tag.textContent = skill.name;
    box.appendChild(tag);

    var tip = document.createElement('div');
    tip.className = 'cassette-blurb';
    tip.textContent = skill.blurb;
    box.appendChild(tip);

    var leftReel = box.querySelector('.reel-left');
    var rightReel = box.querySelector('.reel-right');
    var leftTape = box.querySelector('.tape-left');
    var rightTape = box.querySelector('.tape-right');

    // cassette positions
    var leftAngle = 0;
    var rightAngle = 0;
    var tapeMoved = 0;
    var tapeDirection = 1; // 1 = clockwise -1 = anticlockwise
    var lastTime=null; // time between frames

    function animate(now){

        if(lastTime === null){
            lastTime = now;
        }

        var seconds = (now - lastTime)/1000;
        lastTime = now;

        if(seconds > 0.05){
            seconds = 0.05;
        }

        if(isPlaying){

            // turn the reels
            leftAngle = leftAngle - 100 * seconds;
            rightAngle = rightAngle - 140 * seconds;
        }

        leftReel.style.transform = 'rotate(' + leftAngle + 'deg)';
        rightReel.style.transform = 'rotate(' + rightAngle + 'deg)';
        leftTape.style.transform = 'scale(' + (1 - tapeMoved * 0.214) + ')';
        rightTape.style.transform = 'scale(' + (1 + tapeMoved * 0.272) + ')';

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// for (var i = 0; i < files.length; i++){
//     loadCassette(files[i]);
// }

// document.getElementById('cassette-play').onclick = function(){
//     isPlaying = !isPlaying; //flips button
// } // button not needed anymore as ahifting to auto start after init testing


//healper for cassette art
function makeArt(src){
    var ext = src.split('.').pop().toLowerCase();
    if (ext==='html'){
        var f = document.createElement('iframe');
        f.src = src;
        f.sandbox = '';
        f.loading = 'lazy';
        return f;
    }
    var img = document.createElement('img');
    img.src = src;
    img.alt = '';
    return img;
}

async function init() {
    var skills = await (await fetch('../data/skills.json')).json();
    skills.forEach(loadCassette);
}
init();