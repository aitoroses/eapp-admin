import state from 'lib/state'
import Resource from 'lib/Resource'
import tables from 'config/tables'

// createTesselBlueprint:: Resource -> String -> String -> [FluxClasses]
var createTesselBlueprint = _.curry(function(Resource, bindKey, dataHolderKey) {

  function getStateRef() {
      let current = state.get()
      return current[bindKey]
    }

  class GenericStore {

      state = {
        [dataHolderKey]: []
      }

      constructor() {
        this.bindState(bindKey)
      }

      getAll() {
        return this.state[dataHolderKey]
      }

      getCount() {
        return this.state.count
      }

      getDefinition() {
        var t = tables
        if (!t) return {}
        Object.freeze(t)
        return t[bindKey]
      }

      getMaxResultsPerPage() {
        return 10
      }

      getFields() {
        return this.getDefinition().fields
      }

      getTableName() {
        return this.getDefinition().tableName
      }

      getErrors() {

      }
    }

  class GenericActions {

      addNew(payload, resolve) {
        let auxData = [...[], ...this[dataHolderKey]]
        auxData.unshift(payload)
        getStateRef().set({[dataHolderKey]: auxData})
        resolve(auxData)
      }

      cancelNew(payload, resolve) {
        let auxData = [...[], ...this[dataHolderKey]]
        auxData.shift()
        getStateRef().set({[dataHolderKey]: auxData})
        resolve(auxData)
      }

      fetchAll(payload, resolve) {
        var resource = new Resource()
        resource.findAll(payload, (data) => {
          getStateRef().set({[dataHolderKey]: data})
          resolve(data)
        })
      }

      fetchByPage(query, resolve) {
        var resource = new Resource()
        resource.findByPage(query.payload, query.skip, query.limit, (data) => {
          getStateRef().set({[dataHolderKey]: data})
          resolve(data)
        })
      }

      fetchCount(payload = {}, resolve, reject) {
        var resource = new Resource()
        resource.count(payload, (data) => {
          getStateRef().set({count: data})
          resolve(data)
        }).catch((e) => {
          reject(e)
        })
      }

      create(action, resolve, reject) {
        let {onServer, index, payload} = action
        getStateRef()[dataHolderKey].set({[index]: payload})
        var resource = new Resource()
        resource.create(payload, resolve).then(() => {
          resolve(payload)
        }).catch((e) => {
          reject(e)
        })
      }

      delete(action, resolve, reject) {
        let {onServer, index} = action
        let state = getStateRef()
        let safeCollection = state[dataHolderKey]
        let safeRef = state[dataHolderKey][index]

        // Start transaction
        let trans = state.transact()

        trans[dataHolderKey] = [
          ...trans[dataHolderKey].slice(0, index),
          ...trans[dataHolderKey].slice(index + 1)
        ]

        // Reduce collection amount
        trans.count -= 1

        if (onServer) {
          var resource = new Resource()
          resource.delete(safeRef, resolve).then(() => {
            resolve(true)
          }).catch((e) => {
            // Rollback changes
            let state = getStateRef()
            let trans = state.transact()
            trans[dataHolderKey] = safeCollection
            trans.count += 1
            reject(e)
          })
        }
      }

      update(action, resolve, reject) {
        let {onServer, index, payload} = action
        let safeRef = getStateRef()[dataHolderKey][index]
        getStateRef()[dataHolderKey].set({[index]: payload})
        if (onServer) {
          var resource = new Resource()
          resource.update(payload, resolve).then(() => {
            resolve(payload)
          }).catch((e) => {
            getStateRef()[dataHolderKey].set({[index]: safeRef})
            reject(e)
          })
        }
      }

      executeValidation() {

      }
    }

  var store = state.createStore(GenericStore)
  var actions = store.createActions(GenericActions)

  return [store, actions]
})

export default createTesselBlueprint
