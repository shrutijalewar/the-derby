/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'the-derby';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var g = new Gambler();
      expect(g).to.be.instanceof(Gambler);
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        expect(gamblers[0].assets).to.have.length(2);
        expect(gamblers[0].name).to.equal('Bob Jones');
        expect(gamblers[0].cash).to.equal(1283.45);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a gambler by its Id', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        expect(gambler.name).to.equal('Bob Jones');
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.assets[0].name).to.equal('ring');
        done();
      });
    });
  });
});
describe('#save', function(){
  it('should save a gambler to the database', function(done){
    Gambler.findById('000000000000000000000001', function(gambler){
      gambler.cash = 2000;
      gambler.save(function(){
        expect(gambler.cash).to.equal(2000);
        expect(gambler.assets).to.have.length(2);
        done();
      });
    });
  });
});

describe('#removeAsset', function(){
  it('should remove an asset from the gambler object', function(done){
    Gambler.findById('000000000000000000000001', function(gambler){
      console.log(gambler.assets);
      gambler.removeAsset('ring');
      expect(gambler.cash).to.equal(3200);
      expect(gambler.assets).to.have.length(1);
      done();
    });
  });
});
