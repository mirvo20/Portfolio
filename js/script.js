var home_btn = document.getElementById("btn1");
var contact_btn = document.getElementById("btn2");
var skills_btn = document.getElementById("btn3");
var projects_btn = document.getElementById("btn4");


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

// as the page refreshed the states were being refreshed so i found a fix:

const page = window.location.pathname.split("/").pop();

if (page === "index.html") home();
else if (page === "contact.html") contact();
else if (page === "skills.html") skills();
else if (page === "projects.html") projects();
