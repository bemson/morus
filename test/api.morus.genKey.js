describe( 'Morus::genKey()', function () {

  it('should be a function', function () {
    Morus.genKey.should.be.a('function');
  });

  it('should return an object with 188 keys', function () {
    var key = Morus.genKey();
    key.should.be.an('object');
    Object.keys(key).should.have.lengthOf(190);
  });

  it('should return an object with keys for all printable ascii characters', function () {
    var
      key = Morus.genKey(),
      uniques = Object.keys(key).filter(function (key) {
        return key.length === 1;
      }).join('');

    uniques.should.be.a('string');
    // this regex removes duplicates characters
    uniques = uniques.replace(/(.)(?=.*?\1)/g, '');
    uniques.should.have.lengthOf(95);
    uniques.should.not.match(/[^ -~]/);
  });

  it('should return an object with keys for each printable ascii character code', function () {
    var
      key = Morus.genKey(),
      uniques = Object.keys(key)
        .filter(function (key) {
          return key.length > 1;
        })
        .map(function (key) {
          var num = parseInt(key);
          key.should.be.a('string');
          num.should.be.a('number');
          return num;
        }),
      idx = 32;

    // force numeric sort
    uniques.sort(function (a, b) {
      return a - b;
    });
    uniques.should.have.lengthOf(95);
    uniques.forEach(function (num) {
      num.should.equal(idx++);
    });
  });

});
