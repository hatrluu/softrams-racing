const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');
const { check, validationResult } = require('express-validator');
const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

// Get all members
app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Get member by id
app.get('/api/members/:id', (req, res) => {
  request(`http://localhost:3000/members/${req.params.id}`, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Teams dropdown
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body)=>{
    if (response.statusCode <= 500) {
      res.send(body);
    }
  })
});

// Add new member
app.post('/api/add-member',[
  check('firstName').isString(),
  check('lastName').isString(),
  check('jobTitle').isString(),
  check('team').isString(),
  check('status').custom((value)=>{
    if(value === 'Active' || value === 'Inactive' ){
      return true
    } else {
      return false
    }
  })
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors:errors.array()})
  }
  var options = {
    uri: 'http://localhost:3000/members',
    json: true,
    body: req.body
  }
  request.post(options)
  res.end();
});

// Edit member 
app.put('/api/edit-member/:id',[
  check('firstName').isString(),
  check('lastName').isString(),
  check('jobTitle').isString(),
  check('team').isString(),
  check('status').custom((value)=>{
    if(value === 'Active' || value === 'Inactive' ){
      return true
    } else {
      return false
    }
  })], (req, res) => {
  var id = req.params.id;
  var options = {
    uri: `http://localhost:3000/members/${id}`,
    json: true,
    body: req.body
  }
  request.put(options)
  res.end();
});

// Delete member
app.delete('/api/delete-member/:id', (req, res) => {
  var id = req.params.id;
  var options = {
    uri: `http://localhost:3000/members/${id}`,
  }
  request.delete(options)
  res.end();
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
