export function PaginationNumber(x) {
  this._value = x
}

export function PaginationDecrease() {
  this._value = '<'
}

export function PaginationIncrease() {
  this._value = '>'
}

export function getNumber(val) {
  if (val instanceof PaginationNumber) {
    return val._value
  } else {
    return null
  }
}

function ensureInterface(state) {
  var { current, perPage, count, visible } = state
  if (current && perPage && count != null && visible) {
    return
  } else {
    throw Error('Invalid state interface for Pagination.')
  }
}

export function getCurrentPage(state) {
  ensureInterface(state)
  return state.current
}

export function shownElements(state) {
  ensureInterface(state)
  let shouldBe = state.current * state.perPage
  return state.count < shouldBe ? state.count : shouldBe
}

export function remainingElements(state) {
  ensureInterface(state)
  return state.count - shownElements(state)
}

export function hasLessPages(state) {
  ensureInterface(state)
  return state.current > 1
}

export function hasMorePages(state) {
  ensureInterface(state)

  // return (state.count - shownElements(state)) > 0;
  return state.current < getNumberOfPages(state)
}

export function getNumberOfPages(state) {
  ensureInterface(state)
  var result = Math.floor(state.count / state.perPage)
  var modulo = state.count % state.perPage

  if (modulo > 0) {
    return result + 1
  } else {
    return result
  }
}

export function getShowingPages(state) {
  ensureInterface(state)

  function pageReducer(xs, position) {

    var current = state.current

    if (position < 2) {
      xs.unshift(current - position - 1)
    } else if (position == 2) {
      xs.push(current)
    } else if (position > 2) {
      xs.push(current + position - 2)
    }

    return xs
  }

  var result =  _.range(0, state.visible).reduce(pageReducer, [])

  let num = getNumberOfPages(state)
  let last
  let maxVal

  if (getNumberOfPages(state) < result.length) {

    // prune the array
    function prune(xs) {
      if (xs.length > getNumberOfPages(state)) {

        if (xs[0] < 1) {
          xs.shift()
        }

        if (xs[xs.length - 1] > getNumberOfPages(state)) {
          xs.pop()
        }

        prune(xs)
      } else {
        return xs
      }
    }

    prune(result)

    // Prevent top displacement
    maxVal = 0

  } else {

    // Top edge
    last =  result[result.length - 1]
    maxVal = last > num ? last - num : 0

  }

  // Down edge
  var minVal = result[0] <= 0 ?  Math.abs(result[0]) + 1 : 0

  result = result.map(function(x) {return x + minVal - maxVal })

  return result
}

export function getDefaultPages(state) {
  ensureInterface(state)
  let result = []
  let topEdge = getNumberOfPages(state)
  for (let i = 1; i <= topEdge; i++) {
    result.push(i)
  }

  return result
}

export function getElementArray(state) {
  ensureInterface(state)
  if (state.count == 0) return []

  let array
  if (getNumberOfPages(state) <= state.visible) {
    array = getDefaultPages(state)
  } else {
    array = getShowingPages(state)
  }

  if (hasLessPages(state)) {
    array.unshift('<')
  }

  if (hasMorePages(state)) {
    array.push('>')
  }

  function getPaginationValue(val) {
    switch (val) {
      case '<':
        return new PaginationDecrease
      case '>':
        return new PaginationIncrease
      default:
        return new PaginationNumber(val)
    }
  }

  return array.map(getPaginationValue)
}
