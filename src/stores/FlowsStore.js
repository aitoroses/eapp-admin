import state from 'lib/state'
import ItemsStore from 'stores/ItemsStore'
import TasStore from 'stores/TasStore'
import FieldsStore from 'stores/FieldsStore'

//var config = require('lib/config')

class FlowsStore {
  constructor() {
    this.bindState('flows')

    this.state = {
      createFlow: {
        fields: {
          flowId: {
            runtime: {
              value: null,
              error: null
            },
            config: {
              type: 'number',
              label: 'Flow ID',
              fieldId: 'flowId',
              hint: 'Flow ID (number)',
              validations: ['required', 'maxlength']
            }
          },
          flowName: {
            runtime: {
              value: null,
              error: null
            },
            config: {
              type: 'text',
              label: 'Flow name',
              fieldId: 'flowName',
              hint: 'Flow name',
              validations: ['required', 'maxlength']
            }
          },
          flowDescription: {
            runtime: {
              value: null,
              error: null
            },
            config: {
              type: 'textarea',
              label: 'Flow description',
              fieldId: 'flowDescription',
              hint: 'Enter flow description',
              validations: ['required', 'maxlength']
            }
          },
          itemList: {
            runtime: {
              value: null,
              error: null
            },
            config: {
              type: 'combo',
              label: 'Item',
              fieldId: 'itemList',
              get validValues() {
                return ItemsStore.getAll() || []
              },

              validations: ['required']
            }
          }
        },
        steps: {
          steps: []
        },
        flowfields: {
          masterFields: [],
          flowfields: []
        },
        flowtas: {
          masterTas: {
            list: []
          },
          flowtas: {
            list: []
          }
        }
      },
      categories: [
        {name: 'GENERAL'},
        {name: 'DETAILS'},
        {name:'TABLE'}
      ]
    }
  }

  getMasterFields() {
    return this.state.createFlow.flowfields.masterFields.map(function(element) {
      return element.field
    })
  }

  getFlowFieldsAssign() {
    return this.state.createFlow.flowfields.flowfields
    /*return this.state.createFlow.flowfields.flowfields.map(function(element){
      return element.field
    })*/
  }

  getFields() {
    return this.state.createFlow.fields
  }

  getCategories() {
    return this.state.categories
  }

  getFieldRuntime(fieldId) {
    return this.state.createFlow.fields[fieldId].runtime
  }

  getFlowTas() {
    return this.state.createFlow.flowtas
  }

  getCreate() {
    return this.state.createFlow
  }

  getFlowFields() {
    return this.state.createFlow.flowfields
  }

  getSteps() {
    return this.state.createFlow.steps
  }

  getFlowTasRuntime(combo) {
    return this.state.createFlow.flowtas[combo].runtime
  }

}

export var store = state.createStore(FlowsStore)
