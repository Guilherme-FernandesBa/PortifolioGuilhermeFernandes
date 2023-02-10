const header = document.querySelector("header");

const first_skill= document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const foto = document.getElementById("eu");

const ml_selection = document.querySelector(".milestone");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portifolio"); 
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const next_btn = document.querySelector(".next-btn");
const prev_btn = document.querySelector(".prev-btn");  

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const github = document.getElementById("github");



window.addEventListener("scroll", () => {
    activeLink();
    if(!skillsPlayed) skillCounter()
    if(!mlPlayer) mlCounter();
})

/*------------- Sticky Navbar --------------*/
function stickyNavbar(){
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}
stickyNavbar()
window.addEventListener("scroll", stickyNavbar);

/*------------- Scroll reveal --------------*/
let sr = ScrollReveal({
    duration: 2000,
    distance: "60px",
})

sr.reveal(".showcase-info", {delay:500});
sr.reveal(".showcase-image", {origin:"top", delay:600});

/*------------- Skill animation reveal --------------*/
function hasReached(el){
    let topPosition= el.getBoundingClientRect().top
    if(window.innerHeight >= (topPosition + el.offsetHeight)){  
        return true

    }else{
        return false; }
}
function updateCount(num, maxNum){
    let correctNum = +num.innerText;
    if(correctNum < maxNum){
        num.innerText = correctNum +1;
        setTimeout(() =>{
            updateCount(num, maxNum)}, 15);
    }

}

let skillsPlayed = false;

function skillCounter(){
    if(!hasReached(first_skill)) return

    skillsPlayed = true;
    sk_counters.forEach((counter, i)=>{
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target/100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(()=>{
            updateCount(counter, target);
        }, 400)

    })

    progress_bars.forEach(p=>p.style.animation = "progress 2s ease-in-out forwards")
    

}
let link = ["/assets/Real.png" , "/assets/Eu.png"]
setInterval(function(){
    let random = Math.floor(Math.random() *2);
    foto.src = link[random]
}, 2000)



/*------------- Services Counter Animation --------------*/

let mlPlayer = false

function mlCounter(){
    if(!hasReached(ml_selection)) return

    mlPlayer= true;
    ml_counters.forEach((ctr)=>{
        let target = +ctr.dataset.target;

        setTimeout(()=>{
            updateCount(ctr, target);
        }, 600)
    })
    
}


/*------------- Portifolio Filter Animation --------------*/

let mixer = mixitup(".portifolio-gallery", {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500
    }
});

/*------------- Modal Pop UP Animation --------------*/

zoom_icons.forEach((inc, i) => inc.addEventListener("click", () =>{
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex)   

}))

modal_overlay.addEventListener("click", () =>{
    prt_section.classList.remove("open")
    document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () =>{
    if(currentIndex === 0){
        currentIndex = zoom_icons.length -1
    }else{
        currentIndex--

    }
    changeImage(currentIndex)  
})

next_btn.addEventListener("click", () =>{
    if(currentIndex === zoom_icons.length -1){
        currentIndex = 0
    }else{
        currentIndex++

    }
    changeImage(currentIndex)  
})




function changeImage(index){
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

/*------------- Change active link on scroll --------------*/
function activeLink(){
    let sections = document.querySelectorAll("section[id]")
    let passedSections = Array.from(sections).map((sct, i) =>{
        return {y: sct.getBoundingClientRect().top - header.offsetHeight,
        id :i,

        
        };
    }).filter(sct =>sct.y<=0);

    let currentSectionId = passedSections.at(-1).id

    links.forEach(l=> l.classList.remove("active"));
    links[currentSectionId].classList.add("active");    
}

activeLink()

/*------------- Dark Mode --------------*/
let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme)
function  changeTheme(isdark){
    let link =["/assets/Github.png", "/assets/gitdark.png"]
    if(isdark){
        document.body.classList.add( "dark")
        toggle_btn.classList.replace("uil-moon", "uil-sun")
        localStorage.setItem("dark",1)
        github.src = link[1]
    }else{
        document.body.classList.remove( "dark")
        toggle_btn.classList.replace("uil-sun", "uil-moon")
        localStorage.setItem("dark",0)
        github.src = link[0]
    }
}


toggle_btn.addEventListener("click", ()=>{
    changeTheme(!document.body.classList.contains("dark"));
})


/*------------- TypeWriting Mode --------------*/
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

var i = 0;
var txt = 'Desenvolvedor Junior'; /* The text */
var speed = 150; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter()