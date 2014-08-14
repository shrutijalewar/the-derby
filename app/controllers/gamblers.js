'use strict';
var Gambler =require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index',{gamblers:gamblers});
  });
};
exports.sellAsset = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.removeAsset(req.params.name);
    gambler.save(function(){
      res.send({id:req.params.id, name:req.params.name, cash:gambler.cash, isMarried:gambler.assets.length});
    });
  });
};
