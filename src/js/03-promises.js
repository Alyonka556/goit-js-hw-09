import Notiflix from 'notiflix';

const form = document.querySelector('.form');



function onSubmitForm(event) {
  event.preventDefault();
  
  const amount = event.target.elements.amount.value;
  const step = Number(event.target.elements.step.value);
  let delay = Number(event.target.elements.delay.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Report.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    delay += step;
  };
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


form.addEventListener('submit', onSubmitForm);