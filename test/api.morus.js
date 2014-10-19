describe( 'Morus', function () {

  it('should be a class', function () {
    Morus.should.be.a('function');
    (new Morus()).should.be.an.instanceOf(Morus);
  });

  it('should accept zero arguments', function () {
    (new Morus()).should.be.ok;
  });

  it('should expect zero arguments', function () {
    Morus.should.have.lengthOf(0);
  });

  describe('.index', function () {

    var cipher;

    beforeEach(function () {
      cipher = new Morus();
    });

    it('should be an integer', function () {
      cipher.index.should.be.a('number');
      cipher.index.should.equal(Math.floor(cipher.index));
    });

    it('should be negative or positive', function () {
      cipher.index = -30;
      cipher.decode(cipher.encode('hello')).should.equal('hello');
    });

  });

  describe('.key', function () {

    var cipher;

    beforeEach(function () {
      cipher = new Morus();
    });

    it('should be an object', function () {
      cipher.key.should.be.an('object');
    });


  });

});
