var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'IFE.FrontEnd' });
  });
  app.get('/SU', function (req, res) {
    res.render('index', { title: 'SU' });
  });
  app.get('/Fido', function (req, res) {
  	res.sendfile('Fido.html')
  });
  // app.get('/Cat', function (req, res) {
  // });
  // app.get('/WeiYu', function (req, res) {
  // });
	app.get('/chuan', function (req, res) {
	  	res.sendfile('chuan.html');
  });
 
};
 
