var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'IFE.FrontEnd' });
  });
  app.get('/SU', function (req, res) {
  	res.sendfile('su.html');
  });
  // app.get('/Fido', function (req, res) {
  // 	res.render('index', { title: 'Fido' });
  // });
  // app.get('/Cat', function (req, res) {
  // 	res.render('index', { title: 'Cat' });
  // });
  // app.get('/WeiYu', function (req, res) {
  // 	res.render('index', { title: 'WeiYu' });
  // });
  app.get('/chuan', function (req, res) {
  	res.sendfile('chuan.html');
  });
};