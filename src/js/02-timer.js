
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "../css/common.css";
const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
let idSetInterval = null;
input.value='';
const refs = {
seconds: document.querySelector('[data-seconds]'),
minutes: document.querySelector('[data-minutes]'),
hours: document.querySelector('[data-hours]'),
days: document.querySelector('[data-days]'),
};
startBtn.setAttribute("disabled","");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     
     if(selectedDates[0].getTime() > Date.now()){
      console.log(selectedDates[0]);
      startBtn.removeAttribute("disabled");
     }else {
      startBtn.setAttribute("disabled","");
      Notiflix.Notify.failure("Please choose a date in the future");
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

input.addEventListener('focus',()=>{
    flatpickr('#datetime-picker',options);
    if (idSetInterval){
      clearInterval(idSetInterval);
      idSetInterval = null;
    }
});

startBtn.addEventListener('click',()=>{
    const dateSetInput = new Date(input.value);
    idSetInterval = setInterval(()=>{
    const dateNow = Date.now();
    
    if((dateNow) >= (dateSetInput.getTime())){
      clearInterval(idSetInterval);
      return;
    }
    
    const { days, hours, minutes, seconds } = convertMs(dateSetInput.getTime()-dateNow);
    refs.days.innerText = days.toString().length===1 ? days.toString().padStart(2,'0'):days.toString();
    refs.hours.innerText = hours.toString().padStart(2,'0');
    refs.minutes.innerText = minutes.toString().padStart(2,'0');
    refs.seconds.innerText = seconds.toString().padStart(2,'0');

   },1000);
    
});
