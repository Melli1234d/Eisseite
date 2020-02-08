const fs = require('fs');

const fileName = './messages.json';

function getAllMessages(){
    if(fs.existsSync(fileName)) {
        const messagesString = fs.readFileSync(fileName, {encoding: 'utf8'});
        const messages = JSON.parse(messagesString);
        return messages;
    }

    return [];
}

function saveAllMessages(messages){
    const  messagesString = JSON.stringify(messages, null, 2); // 2 add indentation to the json file,
    // which improves readability
    fs.writeFileSync(fileName, messagesString, {encoding:'utf8'});
}

function findMaxId(messages){
    let maxId = 1;
    for (let message of messages){
        if(message.id > maxId){
            maxId = message.id;
        }
    }
    return maxId;
}

module.exports = { getAllMessages, saveAllMessages, findMaxId }