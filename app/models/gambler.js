'use strict';
var _ = require('lodash'),
  Mongo = require('mongodb');

function Gambler(o){
  this.name    = o.name;
  this.photo   = o.photo;
  this.spouse  = {name:o.spouse.name, photo:o.spouse.photo};
  this.cash    = parseFloat(o.cash);
  this.assets  = [];
  this.results = {wins:0, losses:0};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.create = function(o, cb){
  var g = new Gambler(o);
  Gambler.collection.save(g, cb);
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, obj){
    var gambler = changePrototype(obj);
    cb(gambler);
  });
};

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

Gambler.prototype.removeAsset = function(name){
  var toSell = _.remove(this.assets, function(asset){ return asset.name === name; });
  this.cash += toSell[0].value;
};

Gambler.prototype.addAsset = function(o){
  var asset = {name:o.name, photo:o.photo, value:parseFloat(o.value)};
  this.assets.push(asset);
};

module.exports = Gambler;


function changePrototype(obj){
  return _.create(Gambler.prototype, obj);
}
