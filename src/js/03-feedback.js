'use strict'; //
// const throttle = require('lodash.throttle'); //
import throttle from 'lodash.throttle';
import { save, load } from './storage';

const STORAGE_KEY = 'feedback-form-state'; //

const formRef = document.querySelector('.feedback-form'); //
initPage();

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', handleSubmit);

function onFormInput({ name, value }) {
  try {
    let saveData = load(STORAGE_KEY);
    saveData = saveData ? saveData : {};
    saveData[name] = value;
    save(STORAGE_KEY, saveData);
  } catch (err) {
    console.error(err);
  }
}

function initPage() {
  const saveData = load(STORAGE_KEY);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.target;

  console.log({ email: email.value, message: message.value });
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
