import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input'),
  messageEl: document.querySelector('textarea'),
};

getFormOutput();

refs.formEl.addEventListener('input', throttle(onSaveInputData, 500));
refs.formEl.addEventListener('submit', onSubmitForm);

/** functions */

function onSubmitForm(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onSaveInputData(evt) {
  const userMessage = evt.target.value;
  const userEmail = evt.target.name;
  formData[userEmail] = userMessage;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getFormOutput(evt) {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    refs.emailEl.value = savedFormData.email;
    refs.messageEl.value = savedFormData.message;
  }
}
