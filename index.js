const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const fs= require('fs');
const handlebars = require('express-handlebars');

const {getAllMessages, saveAllMessages, findMaxId } = require('./messages.js');

app.engine(
    "handlebars",
    handlebars({
        extname: "handlebars",
        defaultLayout: "main",
        layoutsDir: "views/layout/"
    }));





app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/static/', express.static('static'));// alle Statischen elemente der app in das Verzeichniss Static.
app.use('/bilder/', express.static('bilder')); //Verzeichniss für die bilder


app.get('/',function(request,response){
    response.render('home');
});

app.get('/new',function (request, response) {

    response.render('messages',{"user":user.toString()});
});

app.get('/',function (request, response) {
    response.render('home');
});


app.post('/', function (request, response) {  //wird aufgerufen wenn ein neuer Post gemacht wird
    if(typeof(request.body.userName)=== 'undefined' ){//kein richtiger request abgesendet
        response.status(404).send("Fehlerhafter Anfrage");
        console.log("Habe eine Fehlerhafte Anfrage bekommen.");
        response.render('home');
    }
    if(request.body.Lieblingseis==='undefined'){
        response.status(404).send("Fehlerhafter Anfrage");
        console.log("Habe eine Fehlerhafte Anfrage bekommen.");
        response.render('home');
    }
    else{
        user=request.body.userName;
        var test={"user":user};
        console.log(test);
        response.render('messages', {"user":user, messages:getAllMessages()} );
    }
});
app.post('/new', function (request, response) {  //wird aufgerufen wenn ein neuer Post gemacht wird
    if(typeof(request.body.author)=== 'undefined' ||typeof(request.body.text)=== 'undefined'){//kein richtiger request abgesendet
        response.status(404).send("Fehlerhafter Anfrage: Author="+request.body.messageAuthor+" , Text="+request.body.messageText);
        console.log("Habe eine Fehlerhafte Anfrage bekommen.");
        response.render('home');
    }
    else{
        const messages = getAllMessages();
        console.log(messages);
        const maxId = findMaxId(messages);

        messages.push({
            author: request.body.author,
            text: request.body.text,
            date: new Date(),
            id: maxId + 1
        });

        saveAllMessages(messages);


        response.render('messages',{"user":user,messages:getAllMessages()});//hier an dieser stelle muss ein zweiter parameter her der die messages mit überträgt
    }


});



app.post('/delete', (request, response) => {
    let messages = getAllMessages();

    const id = request.body.id;

    messages = messages.filter(message => message.id != id);

    saveAllMessages(messages);

    response.redirect('/');
    response.render('messages',{"user":user,messages:getAllMessages()});
});

app.use(express.static('public'));


app.listen(3000,function () {
    console.log('Example app listening on port 3000!');
});


