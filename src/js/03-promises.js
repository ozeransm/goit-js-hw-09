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
  for(let i=1;i<=parseInt(refs.inputAmount.value);i++){
     console.log(createPromise(i,i*parseInt(refs.inputStep.value)+parseInt(refs.inputDelay.value))
    .then(({position, delay})=>{console.log(`✅ Fulfilled promise ${position} in ${delay}ms`); Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);})
    .catch(({position, delay})=>{console.log(`❌ Rejected promise ${position} in ${delay}ms`); Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);}));
  }
}