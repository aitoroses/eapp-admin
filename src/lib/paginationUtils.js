export function PaginationNumber(x) {
  this._value = x;
}

export function PaginationDecrease() {
  this._value = '<';
}

export function PaginationIncrease() {
  this._value = '>';
}

export function getNumber(val) {
  if (val instanceof PaginationNumber) {
    return val._value;
  } else {
    return null;
  }
}


function ensureInterface(state) {
  var { current, perPage, count, visible } = state;
  if (current && perPage && count!=null && visible) {
    return
  } else {
    throw Error('Invalid state interface for Pagination.')
  }
}

export function getCurrentPage(state) {
  ensureInterface(state)
  return state.current;
}

export function shownElements(state) {
  ensureInterface(state)
  return (state.current + 1) * state.perPage;
}

export function remainingElements(state) {
  ensureInterface(state)
  return state.count - shownElements(state)
}

export function hasLessPages(state) {
  ensureInterface(state)
  return state.current > 1;
}

export function hasMorePages(state) {
  ensureInterface(state)
  return (state.count - shownElements(state)) >= 0;
}

export function getNumberOfPages(state) {
  ensureInterface(state)
    var result = Math.floor(state.count / state.perPage);
    var modulo = state.count % state.perPage

    if (modulo > 0) {
        return result + 1;
    } else {
        return result;
    }
}

export function getShowingPages(state) {
  ensureInterface(state)

  function pageReducer(xs, position) {

    var current = state.current;

    if (position < 2) {
       xs.unshift(current - position - 1);
    } else if (position == 2) {
       xs.push(current);
    } else if (position > 2) {
       xs.push(current + position - 2);
    }

    return xs;
  }


  var result =  _.range(0, state.visible).reduce(pageReducer, []);

  if (getNumberOfPages(state) < result.length) {

    // prune the array
    function prune(xs) {
      if (xs.length > getNumberOfPages(state)) {

        if (xs[0] < 1) {
           xs.shift();
        }

        if (xs[xs.length - 1] > getNumberOfPages(state)) {
          xs.pop();
        }

        prune(xs);
      } else {
        return xs;
      }
    }
    prune(result);
  } else {

    // Down edge
    var minVal = result[0] <= 0 ?  Math.abs(result[0]) + 1 : 0;

    // Top edge
    var num = getNumberOfPages(state);
    var last =  result[result.length - 1];
    var maxVal = last > num ? last - num : 0;

    result = result.map(function(x) {return x + minVal - maxVal })

  }

  return result;
}

export function getElementArray(state) {
  ensureInterface(state)

  if(state.count==0) return [];

  let array = getShowingPages(state);

  if (hasLessPages(state)) {
    array.unshift('<')
  }
  if (hasMorePages(state)) {
    array.push('>')
  }

  function getPaginationValue(val) {
    switch (val) {
      case '<':
        return new PaginationDecrease;
      case '>':
        return new PaginationIncrease;
      default:
        return new PaginationNumber(val);
    }
  }

  return array.map(getPaginationValue);
}
