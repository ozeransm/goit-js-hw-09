import Notiflix from 'notiflix';
const refs = {
  formInput: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
};
refs.formInput.addEventListener('click',handleBtn);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
  setTimeout(()=>{
  if (shouldResolve) {
    // Fulfill
    resolve({position, delay});
  } else {
    // Reject
    reject({position, delay});
  }
}, delay);
});
}

function handleBtn(evt){
  evt.preventDefault();
  if (!(evt.target.nodeName === 'BUTTON')){
    return;
  }
  let delay = parseInt(refs.inputDelay.value);
  if((parseInt(refs.inputAmount.value)>=0)&&(parseInt(refs.inputStep.value)>0)&&(parseInt(refs.inputDelay.value)>0)){
  for(let i=1;i<=parseInt(refs.inputAmount.value);i++){
    // i*parseInt(refs.inputStep.value)+parseInt(refs.inputDelay.value)
     console.log(createPromise(i,delay)
    .then(({position, delay})=>{Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);})
    .catch(({position, delay})=>{Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);}));
  delay += parseInt(refs.inputStep.value);
  }
} else{console.log('значення полів мають бути більше нуля')}
}