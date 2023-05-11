const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let idSetInterval=null;
stopBtn.setAttribute("disabled","");

startBtn.addEventListener('click',startHandle);
stopBtn.addEventListener('click',stopHandle);

function startHandle(){
    idSetInterval = setInterval(()=>{
        document.body.style.backgroundColor=getRandomHexColor();
    },1000);
    startBtn.setAttribute("disabled","");
    stopBtn.removeAttribute("disabled");
}

function stopHandle(){
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled","");
    clearInterval(idSetInterval);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}