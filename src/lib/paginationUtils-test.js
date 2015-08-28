import {
  getElementArray,
  shownElements,
  hasLessPages,
  hasMorePages,
  PaginationNumber,
  PaginationIncrease,
  PaginationDecrease
} from './paginationUtils'

function getState(current, count) {
  let state = {
    current: current,
    perPage: 10,
    visible: 5,
    count: count
  }
  return state
}

describe('Pagination:', () => {

  it('should [1*, 2, 3, 4, 5, >]', () => {
      let state = getState(1, 50);
      var res = getElementArray(state);

      res.length.should.equal(6)

      _.range(0,4).forEach(i => {
        let cond = res[i] instanceof PaginationNumber;
        cond.should.equal(true)
        res[i]._value.should.equal(i + 1);
      })

      res[5].should.be.an.instanceof(PaginationIncrease);
  });

  it('should [1*, 2, 3, 4, >]', () => {
      let state = getState(1, 33);
      var res = getElementArray(state);

      res.length.should.equal(5)

      _.range(0,3).forEach(i => {
        let cond = res[i] instanceof PaginationNumber;
        cond.should.equal(true)
        res[i]._value.should.equal(i + 1);
      })

      res[4].should.be.an.instanceof(PaginationIncrease);
  })

  it('should [<, 1, 2, 3, *4]', () => {
      let state = getState(4, 33);
      var res = getElementArray(state);

      res.length.should.equal(5)

      res[0].should.be.an.instanceof(PaginationDecrease);

      _.range(1,4).forEach(i => {
        let cond = res[i] instanceof PaginationNumber;
        cond.should.equal(true)
        res[i]._value.should.equal(i);
      })

  })
})

describe('Pagination functions', () => {

  it('shownElements should return elements shown until now', () => {
    let state = getState(2, 40);
    expect(shownElements(state)).to.equal(20);

    state = getState(1, 40);
    expect(shownElements(state)).to.equal(10);

    state = getState(1, 7);
    expect(shownElements(state)).to.equal(7);

  })

  it('hasLessPages should return if there are less pages (<)', () => {
    let state = getState(2, 40);
    expect(hasLessPages(state)).to.equal(true);

    state = getState(1, 40);
    expect(hasLessPages(state)).to.equal(false);

    state = getState(4, 40);
    expect(hasLessPages(state)).to.equal(true);

    state = getState(1, 7);
    expect(hasLessPages(state)).to.equal(false);
  })

  it('hasMorePages should return if there are more pages (>)', () => {
    let state = getState(2, 40);
    expect(hasMorePages(state)).to.equal(true);

    state = getState(1, 40);
    expect(hasMorePages(state)).to.equal(true);

    state = getState(4, 40);
    expect(hasMorePages(state)).to.equal(false);

    state = getState(1, 7);
    expect(hasMorePages(state)).to.equal(false);
  })
})
