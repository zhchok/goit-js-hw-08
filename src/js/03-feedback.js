const _ = require('lodash');

const inputMail = document.querySelector('[name="email"]');
const inputMessage = document.querySelector('[name="message"]');
const form = document.querySelector('.feedback-form');
const FEEDBACK_FORM_STATE = 'feedback-form-state';
const submitButton = document.querySelector('[type="submit"]');

addEventListener('DOMContentLoaded', checkLocalStorage);
form.addEventListener('input', _.throttle(addDataToStorageFromForm, 500));
form.addEventListener('submit', submitForm);

function addItemInLocalStorage(key, value) {
  const payload = JSON.stringify(value);
  localStorage.setItem(key, payload);
}

function getItemFromLocalStorage(key) {
  try {
    const payload = localStorage.getItem(key);
    return JSON.parse(payload);
  } catch (error) {
    console.error('Error');
  }
}

function addDataToStorageFromForm(e) {
  e.preventDefault();
  const data = {
    email: inputMail.value,
    message: inputMessage.value,
  };
  addItemInLocalStorage(FEEDBACK_FORM_STATE, data);
}

function checkLocalStorage() {
  const data = getItemFromLocalStorage(FEEDBACK_FORM_STATE);
  if (data) {
    inputMail.value = data.email;
    inputMessage.value = data.message;
  }
}

function submitForm(e) {
  e.preventDefault();
  const data = {
    email: inputMail.value,
    message: inputMessage.value,
  };
  form.reset();
  localStorage.clear();
  console.log(data);
}


