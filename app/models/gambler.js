'use strict';
var _ = require('lodash'),
  Mongo = require('mongodb');

function Gambler(){
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

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
module.exports = Gambler;


function changePrototype(obj){
  return _.create(Gambler.prototype, obj);
}
