let hrs = document.getElementById("clock_hrs");
let min = document.getElementById("clock_min");
let sec = document.getElementById("clock_sec");

//Get Time and show
setInterval(() => {
    let currentDateTime = new Date();
    hrs.innerHTML = (currentDateTime.getHours() < 10 ? '0':'')+ currentDateTime.getHours();
    min.innerHTML = (currentDateTime.getMinutes() < 10 ? '0':'')+ currentDateTime.getMinutes();
    sec.innerHTML = (currentDateTime.getSeconds() < 10 ? '0':'')+ currentDateTime.getSeconds();
}, 1000);

//
var clientHeight = document.getElementById("clock").clientHeight;
console.log(clientHeight);
 document.documentElement.style.setProperty("--top", (clientHeight-65)+"px");