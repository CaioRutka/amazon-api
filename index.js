const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// RuNwovBiCXpB7try
mongoose.connect('mongodb+srv://caiorutka:5Fp7MrkgKFMUvbqT@amazontraderfx.jq5ki5g.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(require('./src/routes'));

app.listen(process.env.PORT || 1337, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
