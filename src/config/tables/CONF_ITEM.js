//CONF_ITEM
var config = {

  tableName: 'CONF_ITEM',
  resolve: ['tas'],
  fields: [
    {
      label: 'ITEM_ID',
      key: 'itemId',
      config: {
        type: 'number',
        defaultValue: null,
        editable: true,
        validations: ['required', 'positive'],
        tooltip: 'eapp.admin.tooltips.itemId',
        searchable: true
      }
    },
    {
      label:  'ITEM_NAME',
      key: 'itemName',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        validations: ['required',['maxLength', 200]],
        tooltip: 'eapp.admin.tooltips.itemName',
        searchable: true
      }
    },
    {
      label: 'ITEM_DESCRIPTION',
      key: 'itemDescription',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        validations: ['required', ['maxLength', 250]],
        tooltip: 'eapp.admin.tooltips.itemDescription',
        searchable: true
      }
    },
    {
      label:  'DATE_CREATION',
      key: 'dateCreation',
      config: {
        type: 'date',
        format: 'MM-DD-YYYY',
        defaultValue: null,
        editable: false,
        validations: [],
        searchable: false
      }
    },
    {
      label:  'USER_CREATION',
      key: 'userCreation',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: [],
        searchable: false
      }
    },
    {
      label:  'DATE_MODIFIED',
      key: 'dateModified',
      config: {
        type: 'date',
        format: 'MM-DD-YYYY',
        defaultValue: null,
        editable: false,
        validations: [],
        searchable: false
      }
    },
    {
      label:  'USER_MODIFIED',
      key: 'userModified',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: [],
        searchable: false
      }
    },
    {
      label:  'DELETED',
      key: 'deleted',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: false,
        validations: [],
        searchable: false
      }
    }/*,
    {
      label:  'TA',
      key: 'ta',
      config: {
        type: 'dylov',
        dataSource: 'tas',
        valueField: 'taId',
        labelField: 'taName',
        defaultValue: 0,
        editable: true,
        validations: [],
        searchable: false
      }
    }*/
  ]
}

export default config
