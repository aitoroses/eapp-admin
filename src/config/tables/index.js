import items from './CONF_ITEM'
import disclaimers from './NP5_CONF_DISCLAIMER'
import countries from './NP5_COUNTRY'
import itemsPermission from './NP5_ITEMS_PERMISSION'
import tas from './NP5_THERAPEUTICAL_AREA'
import steps from './CONF_STEP'

export function getNew() {
  let o = {}
  for (let field of this.fields) {
    o = {
      ...o,
      [field.key]: null
    }
  }

  return o
}

export function toObject(data = []) {
  const arrayToObj = (data) => {
    let o = {}
    for (let [index, field] of this.fields.entries()) {
      o = {
        ...o,
        [field.key]: data[index]
      }
    }

    return o
  }

  return arrayToObj(data)
}

export function toArray(data = []) {
  const mapToObj = (ele) => {
    let o = []
    for (let field of this.fields) {
      o = [
        ...o,
        ele[field.key]
      ]
    }

    return o
  }

  return data.map(mapToObj)
}

export function getSearchFilter(value) {
  let result = []
  for (let field of this.fields) {
    if (field.config.searchable) {
      result.push(field.key)
    }
  }

  let obj = {}
  result.forEach((e) => {
    obj[e] = value
  })

  return obj
}

export default {
  items,
  disclaimers,
  countries,
  itemsPermission,
  tas,
  steps
}
