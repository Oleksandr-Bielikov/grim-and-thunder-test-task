import { showPopup } from "./popup.js";
const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const textAreaMessage = document.querySelector('#message');

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.classList.add('error');
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.textContent = message;
}

function clearError(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.textContent = '';
}

const submitForm = (event) => {
  event.preventDefault();

  let isValid = true;

  clearError(inputName);
  clearError(inputEmail);
  clearError(textAreaMessage);

  if (inputName.value.trim() === '') {
    showError(inputName, 'Будь ласка, вкажіть ваше ім\'я.');
    isValid = false;
  } else if (inputName.value.length < 2) {
    showError(inputName, 'Ім\'я повинно містити не менше 2 символів.');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (inputEmail.value.trim() === '') {
    showError(inputEmail, 'Будь ласка, вкажіть ваш email.');
    isValid = false;
  } else if (!emailRegex.test(inputEmail.value)) {
    showError(inputEmail, 'Будь ласка, вкажіть коректний email.');
    isValid = false;
  }

  if (textAreaMessage.value.trim() === '') {
    showError(textAreaMessage, 'Будь ласка, напишіть повідомлення.');
    isValid = false;
  } else if (textAreaMessage.value.length < 10) {
    showError(textAreaMessage, 'Повідомлення має містити не менше 10 символів.');
    isValid = false;
  }

  if (isValid) {
    localStorage.setItem('message', JSON.stringify({
      name: inputName.value,
      email: inputEmail.value,
      message: textAreaMessage.value
    }));
    inputName.value = '';
    inputEmail.value = '';
    textAreaMessage.value = '';
    console.log('Form submitted');
    showPopup('Кнопка відправляє дані форми, і записує їх в Local Storage', event.submitter);
    
    async function getData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data: ', data);
      } catch (error) {
        console.error("Error fetching data:", error);       
      }
    };
    getData();
  };
  alert('Form submitted');
};

form.addEventListener('submit', submitForm);

document.querySelectorAll('.concerts button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    showPopup('Кнопка переходу на сторінку замовлення квитків', button);
  });
});