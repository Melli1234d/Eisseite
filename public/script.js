/**
 * http://usejsdoc.org/
 */


const messageForm = document.querySelector('#messageForm');

messageForm.addEventListener('submit', event => {

    const messageText = document.querySelector('#messageText');
    const messageAuthor = document.querySelector('#messageAuthor');

    const text = messageText.value;
    const author = messageAuthor.value;

    const error = document.querySelector('#validationError');

    if(!text || !author){
        event.preventDefault();// stop form submission to server
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});