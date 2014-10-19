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

  it('should change the .index member, (at least) once per 100 calls', function () {
    var
      ln = 100,
      lastIndex = cipher.index,
      passed = 0;

    while (ln--) {
      cipher.randomize();
      if (lastIndex !== cipher.randomize().index) {
        passed = 1;
        break;
      }
    }

    passed.should.be.ok;
  });

  it('should change .key member contents', function () {
    var oldKey = JSON.stringify(cipher.key);

    cipher.randomize();
    oldKey.should.not.equal(JSON.stringify(cipher.key));
  });

  it('should be invoked when initializing an instance with no arguments', function () {
    var spy = sinon.spy(Morus.prototype, 'randomize');

    new Morus();
    spy.should.have.been.calledOnce;
  });

});
