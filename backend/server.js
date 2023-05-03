require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./api');
var session = require('express-session');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// app.use(passport.initialize());
// app.use(passport.session());


app.use(session({
    genid: function (req) {
        return uuidv4();
      },
    secret: 'gotta catch them all',
    resave: false,
    saveUninitialized: false,
    cookie: {  maxAge: 60 * 60 * 1000, secure: true }
  }));

app.use('/api', apiRouter);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

app.post('/login', (req, res) => {
  req.session.username = req.body.username;
  res.send(`Hello ${req.session.username}. Your session ID is   
  ${req.sessionID} and your session expires in  
  ${req.session.cookie.maxAge} milliseconds.`);
});


app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
});