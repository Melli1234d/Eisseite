
const userForm = document.querySelector('#UserForm');

userForm.addEventListener('submit', event => {


    const userName = document.querySelector('#userName');

    const username = userName.value;

    const error = document.querySelector('#validationError');

    if(!username){
        event.preventDefault();// stop form submission to server
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});