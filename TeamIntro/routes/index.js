var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'IFE.FrontEnd' });
  });
  app.get('/su', function (req, res) {
    res.render('index');
  });
  app.get('/Fido', function (req, res) {
  	res.sendfile('Fido.html')
  });
  app.get('/NightCat', function (req, res) {
    res.sendfile('public/NightCat/index.html')
  });
  // app.get('/WeiYu', function (req, res) {
  // });
	app.get('/chuan', function (req, res) {
	  	res.sendfile('chuan.html');
  });

};

