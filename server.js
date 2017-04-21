/*
Copyright 2017 Nils Whitmont

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';

// INIT NODE MODULES
const botBuilder = require('botbuilder'); // Bot Framework SDK for Node.js - https://docs.botframework.com/en-us/node/builder/overview/
const botServer = require('restify').createServer(); // Restify Server for Node.js - http://restify.com/#server-api
const moment = require('moment'); // handy node.js date/time formatter - https://momentjs.com/

// LOCAL VARS
const LOCALHOST_DEV_PORT = 3978;
const CHAT_CONNECTOR_OPTIONS = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};

/*
    BOT SERVER CONFIG
*/

// start restify server and listen on PORT
botServer.listen(process.env.port || process.env.PORT || LOCALHOST_DEV_PORT, function startServer() {
    console.log(`${botServer.name} listening at: ${botServer.url}`);
});

// configure a root status handler so we know our bot server is online
botServer.get('/', function (request, response, next) {
    let statusInfo = {
        name: 'botframework-azure-on-linux-starter',
        status: 'online',
        time: moment().format('MMM Do YYYY, hh:mm:ss')
    }
    response.send(200, statusInfo);
    next();
});


/*
    CONFIGURE THE CHAT CONNECTOR & INITIALIZE THE BOT
*/

// initialize the chat connector
const chatConnector = new botBuilder.ChatConnector(CHAT_CONNECTOR_OPTIONS);
// bind the chat connector to the bot's API endpoint
botServer.post('/api/messages', chatConnector.listen());
// initialize the bot using the Universal Bot configuration
const bot = new botBuilder.UniversalBot(chatConnector);


/*
    CONFIGURE BOT DIALOG HANDLERS
*/

// default dialog handler
bot.dialog('/', [
    function displayWelcomeMessage (session) {
        session.send('Greetings! I am a demo bot.');

        botBuilder.Prompts.choice(session, 'Choose a demo message:', ['Basic text', 'What time is it?', 'Image attachment', 'Card example']);
    },
    function startDemo (session, result) {
        let userChoice = result.response.entity;
        switch(userChoice) {
            case 'Basic text':
                session.beginDialog('displayTextMessage');
                break;
            case 'What time is it?':
                session.beginDialog('displayCurrentDateTime');
                break;
            case 'Image attachment':
                session.beginDialog('displayImageAttachment');
                break;
            case 'Card example':
                session.beginDialog('displayCardExample')
                break;
            default:
                console.log('this should never get called. oops!');
                break;
        }

    }
]);

// demo - a basic text message
bot.dialog('displayTextMessage', function displayTextMessage (session) {
    session.endDialog('This is a basic text message.');
});

// demo - what time is it?
bot.dialog('displayCurrentDateTime', function displayCurrentDateTime (session) {
    let currentTime = moment().format('MMM Do YYYY, h:mm:ss a');
    session.endDialog(`The time is: ${currentTime}`);
});

// demo - image attachment
bot.dialog('displayImageAttachment', function displayImageAttachment (session) {
    session.send('Here is an example message containing an image attachment:');
    // configure the image attachment
    let messageWithImage = new botBuilder.Message(session)
        .text('"Sir, the possibility of successfully navigating an asteroid field is approximately 3,720 to 1."')
        .attachments([
            {
                contentType: 'image/png',
                contentUrl:'https://upload.wikimedia.org/wikipedia/en/5/5c/C-3PO_droid.png'
            }
        ]);
    // send the image and end the dialog
    session.endDialog(messageWithImage);
});

// demo - a Hero Card example
bot.dialog('displayCardExample', function displayHeroCard (session) {
    // configure the hero card
    let heroCard = new botBuilder.Message(session)
        .attachments([
            new botBuilder.HeroCard(session)
                .title('Visit The Space Needle')
                .subtitle('The Space Needle is a 605 foot tall observation tower in Seattle, Washington, built for the 1962 World\'s Fair')
                .text('Click on the image to trigger the CardAction.openUrl() event.')
                .images([
                    botBuilder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
                ])
                .tap(botBuilder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle"))
            ]);
    // send the hero card & end this dialog
    session.endDialog(heroCard);
});

// END OF LINE
