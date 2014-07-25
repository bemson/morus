describe( 'Morus', function () {

  it('should be a class', function () {
    Morus.should.be.a('function');
    (new Morus()).should.be.an.instanceOf(Morus);
  });

  it('should accept zero arguments', function () {
    (new Morus()).should.be.ok;
  });

  it('should expect up to two arguments', function () {
    Morus.should.have.lengthOf(2);
  });

  describe('.shift', function () {

    var cipher;

    beforeEach(function () {
      cipher = new Morus();
    });

    it('should be an integer', function () {
      cipher.shift.should.be.a('number');
      cipher.shift.should.equal(Math.floor(cipher.shift));
    });

    it('should use the floored value of the first argument', function () {
      cipher = new Morus(4.4);
      cipher.shift.should.equal(4);

      cipher = new Morus(10.6);
      cipher.shift.should.equal(10);
    });

    it('should convert first argument to a number', function () {
      cipher = new Morus('a');
      cipher.shift.should.be.a('number');
      cipher.shift.should.equal(0);

      cipher = new Morus({});
      cipher.shift.should.be.a('number');
      cipher.shift.should.equal(0);
    });

    it('should be negative or positive', function () {
      cipher.shift = -30;
      cipher.decode(cipher.encode('hello')).should.equal('hello');
    });

  });

  describe('.map', function () {

    var cipher;

    beforeEach(function () {
      cipher = new Morus();
    });

    it('should be an object', function () {
      cipher.map.should.be.an('object');
    });

    it('should reference the second argument, when an object', function () {
      var obj = {};
      cipher = new Morus(0, obj);
      cipher.map.should.equal(obj);
    });

    it('should ignore the second argument, when not an object', function () {
      [1, 0, true, false, null, undefined, '', 'a'].forEach(function (val) {
        cipher = new Morus(0, val);
        cipher.map.should.not.equal(val);
      });
    });

  });

});
