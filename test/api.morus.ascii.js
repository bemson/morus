describe( 'Morus::ASCII', function () {

  it('should be a string', function () {
    Morus.should.haveOwnProperty('ASCII');
    Morus.ASCII.should.be.a('string');
  });

  it('should contain all printable characters', function () {
    var uniques = Morus.ASCII;
    uniques.should.have.lengthOf(95);
    // this regex removes duplicates characters
    uniques = uniques.replace(/(.)(?=.*?\1)/g, '');
    uniques.should.have.lengthOf(95);
    uniques.should.not.match(/[^ -~]/);
  });

});
