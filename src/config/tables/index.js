import items from './CONF_ITEM'
import disclaimers from './NP5_CONF_DISCLAIMER'
import countries from './NP5_COUNTRY'
import itemsPermission from './NP5_ITEMS_PERMISSION'
import tas from './NP5_THERAPEUTICAL_AREA'
import steps from './CONF_STEP'
import API from 'core/API'

function resolveElement(source, key, value) {
  return API[source].store.getAll().filter((ele) => {
    return ele[key] == value
  })[0]
}

function getTime() {
  return new Date()
}

export function getFromFieldArrayByKey(fieldsConfig, key, fieldsArray) {
  let index = fieldsConfig.reduce((acc, field) => {
    if (field.key == key) acc = fieldsConfig.indexOf(field)
    return acc
  }, null)
  return fieldsArray[index]
}

export function evaluateComputedFields(fieldsConfig, fields /*array form*/) {
  return fields.map((fieldValue, i) => {
    let fieldConfig = fieldsConfig[i]
    if (fieldConfig.config.master) {
      let [key, evalString] = fieldConfig.config.master
      let preComputed = getFromFieldArrayByKey(fieldsConfig, key, fields)

      // Use a closure for eval using a context
      let result = (function() {
        try {

          // Create context for eval
          window.resolveElement = resolveElement
          window.getTime = getTime

          // Eval computing function
          evalString = 'function evalFn (x, xs) { return ' + evalString + '}'
          let x = (0, eval)
          x(evalString)
          let postComputed = evalFn(preComputed, fields)
          return postComputed
        } catch (e) {
          return fieldValue
        }
      })()

      // Remove context
      delete window.resolveElement
      delete window.getTime

      return result || ''

    } else { return fieldValue  || '' }
  })
}

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
