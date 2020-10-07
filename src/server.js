const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


var request = require('request');
require('dotenv/config');

const { sendEmail } = require('./mail');


app.post("/api/sendMail", (req, res) => {
    console.log(req.body)
    sendEmail(req.body.email, req.body.name, req.body.message)
})

app.get('/steam/game/:appid/news', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    let url = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?" + process.env.key + "&appid=" +  httpRequest.params.appid + "&count=5&format=json%27";
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});


app.listen(3333);
console.log('Listening on port 3333');
