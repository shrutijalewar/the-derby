'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    gamblers          = require('../controllers/gamblers');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/gamblers', gamblers.index);
  app.delete('/gamblers/:id/assets/:name', gamblers.sellAsset);

  console.log('Routes Loaded');

};

