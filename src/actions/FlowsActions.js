import {store as FlowsStore} from 'stores/FlowsStore'
import ItemsActions from 'actions/ItemsActions'
import TasActions from 'actions/TasActions'
import FieldsActions from 'actions/FieldsActions'
import StepsActions from 'actions/StepsActions'

import shallowEqual from 'react-pure-render/shallowEqual'

class FlowsActions {

  queryItems(payload, resolve) {
    ItemsActions.fetchAll({}).then((validValues) => {
      var itemList = FlowsStore.getFields().itemList
      itemList.config.set({validValues})
    })
  }

  queryTas(payload, resolve) {
    TasActions.fetchAll({}).then((validValues) => {
      var masterTas = FlowsStore.getFlowTas().masterTas
      masterTas.set({list: validValues})
    })
  }

  queryMasterFields(payload, resolve) {
    FieldsActions.fetchAll({}).then((masterFields) => {
      var fields = FlowsStore.getFlowFields()
      masterFields = masterFields.map(function(item) {
        return {
          field: item,
          category: null
        }
      })

      fields.set({masterFields})
    })
  }

  querySteps(payload, resolve) {
    StepsActions.fetchAll({}).then((steps) => {
      var mainSteps = FlowsStore.getSteps()
      mainSteps.set({steps})
    })
  }

  setListForFlowTas(payload, resolve) {
    let [list1, list2] = payload

    var myBranch = FlowsStore.getFlowTas()

    // Temporal solution, it should work with trasanctions.
    // Update masterTas list
    var masterTas = myBranch.masterTas.toJS()
    masterTas.list = list1
    var updated = myBranch.set({masterTas})

    // Update flowtas list
    var flowtas = updated.flowtas.toJS()
    flowtas.list = list2
    var updated = updated.set({flowtas})

    /*var trans = flowtas.transact()

    trans.masterTas.list = list1
    trans.flowtas.list = list2

    var updated = flowtas.run()*/
    resolve(updated)
  }

  setListForFlowFields(payload, resolve) {
    let [list1, list2] = payload

    var myBranch = FlowsStore.getFlowFields()

    // Temporal solution, it should work with trasanctions.
    // Update masterFields list
    var masterFields = list1.map(function(item) {
      return {
        field: item,
        category: null
      }
    })

    var updated = myBranch.set({masterFields})

    var flowfields = list2.map(function(item) {
      var flowfields = FlowsStore.getFlowFields()
      var index = flowfields.flowfields.map(function(elem) {return elem.field.fieldId}).indexOf(item.fieldId)
      var x = null
      if (index != -1) x = flowfields.flowfields[index]
      var category = null
      if (x) category = x.category

      //debugger
      return {
        field: item,
        category: category
      }
    })

    var updated = updated.set({flowfields})

    /*var datos2 = masterFields.masterFields.map(function(a){
      var datos = list1.map(function(b){
        if(b.fieldId==a.field.fieldId){
          return a
        }
      })
      var filter = datos.filter(function(n){ return n!=undefined })
      return filter[0]
    })
    datos2 = datos2.filter(function(n){ return n!=undefined })*/

    //var updated = myBranch.set({"masterFields":datos2})

    // Update flowfields list
    /*var flowfields = updated.flowfields.toJS()
    flowfields = list2
    var updated = updated.set({flowfields})*/

    /*var trans = flowfields.transact()

    trans.masterFields.list = list1
    trans.flowfields.list = list2

    var updated = flowfields.run()*/
    resolve(updated)
  }

  setCategory({row, value}, resolve) {
    var flowFields = FlowsStore.getFlowFields().flowfields
    var field = flowFields[row]
    var updated = field.set({category: value})
    resolve(updated)
  }

  setFieldRuntimeError({fieldId, error}, resolve) {
    var runtime = FlowsStore.getFieldRuntime(fieldId)
    if (!runtime) {return }

    var update = () => {
      var updated = FlowsStore.getFieldRuntime(fieldId).set({error:error})
      resolve(updated)
      return updated
    }

    if (!shallowEqual(runtime.error, error)) {
      return update()
    }

  }

  setFieldRuntimeValue({fieldId, value}, resolve) {
    var runtime = FlowsStore.getFieldRuntime(fieldId)
    if (!runtime) {return }

    var update = () => {
      var updated = FlowsStore.getFieldRuntime(fieldId).set({value:value})
      resolve(updated)
      return updated
    }

    if (!shallowEqual(runtime.value, value)) {
      return update()
    }

  }

  setFieldRuntime({fieldId, ...nextRuntime}, resolve) {
    var runtime = FlowsStore.getFieldRuntime(fieldId)
    if (!runtime) {return }

    var update = () => {
      var updated = runtime.set(nextRuntime)
      resolve(updated)
      return updated
    }

    if (runtime.value != nextRuntime.value) {
      return update()
    }

    if (nextRuntime.error && !shallowEqual(runtime.error, nextRuntime.error)) {
      return update()
    }
  }

  addNew(payload, resolve) {
    var steps = FlowsStore.getSteps()
    let auxData = [...[], ...steps.steps]
    let extObj = {
      step: payload,
      variables: []
    }
    auxData.unshift(extObj)
    steps.set({steps: auxData})
    resolve(auxData)
  }

  cancelNew(payload, resolve) {
    var steps = FlowsStore.getSteps()
    let auxData = [...[], ...steps.steps]
    auxData.shift()
    steps.set({steps: auxData})
    resolve(auxData)
  }

  create(action, resolve) {
    var branch = FlowsStore.getSteps()
    let {index, payload} = action

    let steps = [...branch.steps]
    let extObj = {
      step: payload,
      variables: []
    }
    steps[index] = extObj

    branch.set({steps})
  }

  update(action, resolve) {
    var branch = FlowsStore.getSteps()
    let {index, payload} = action

    let steps = [...branch.steps]
    let extObj = {
      step: payload,
      variables: []
    }
    steps[index] = extObj

    branch.set({steps})
  }

  delete(row, resolve) {
    var branch = FlowsStore.getSteps()

    let steps = [...branch.steps]
    steps.splice(row, 1)

    branch.set({steps})
  }

}

export var actions = FlowsStore.createActions(FlowsActions)
