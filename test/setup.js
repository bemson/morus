var
  Morus = require('../src/morus'),
  sinon = require('sinon'),
  chai = require('chai'),
  sinonChai = require('sinon-chai')
;

chai.use(sinonChai);
chai.should();

global.Morus = Morus;
global.sinon = sinon;
global.expect = chai.expect;