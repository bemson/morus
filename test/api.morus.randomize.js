describe( 'Morus#randomize()', function () {

  var cipher;

  beforeEach(function () {
    cipher = new Morus();
  });

  it('should be an instance method', function () {
    Morus.should.respondTo('randomize');
  });

  it('should be monadic', function () {
    cipher.randomize().should.equal(cipher);
  });

  it('should change the .shift member, (at least) once per 100 calls', function () {
    var
      ln = 100,
      lastShift = cipher.shift,
      passed = 0;

    while (ln--) {
      cipher.randomize();
      if (lastShift !== cipher.randomize().shift) {
        passed = 1;
        break;
      }
    }

    passed.should.be.ok;
  });

  it('should change the .map member', function () {
    var oldMap = cipher.map;

    cipher.randomize();
    oldMap.should.not.equal(cipher.map);
  });

  it('should be invoked when initializing an instance with no arguments', function () {
    var spy = sinon.spy(Morus.prototype, 'randomize');
    
    new Morus();
    spy.should.have.been.calledOnce;
  });

});
