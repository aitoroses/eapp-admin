//NP5_CONF_DISCLAIMER
var config = {

  tableName: 'NP5_CONF_DISCLAIMER',
  fields: [
    {
      label: 'ITEM_ID',
      key: 'itemId',
      config: {
        type: 'number',
        defaultValue: null,
        editable: false,
        validations: ['required'],
        tooltip: 'eapp.admin.tooltips.itemId'
      }
    },
    {
      label: 'ORGANIZATIONAL_UNIT',
      key: 'organizationalUnit',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: ['required'],
        tooltip: 'eapp.admin.tooltips.ou'
      }
    },
    {
      label: 'DISCLAIMER',
      key: 'disclaimer',
      config: {
        type: 'text',
        defaultValue: 'NA',
        editable: true,
        validations: ['required', ['maxLength', 4000]],
        tooltip: 'eapp.admin.tooltips.disclaimer'
      }
    },
    {
      label: 'DATE_CREATION',
      key: 'dateCreation',
      config: {
        type: 'date',
        format: 'MM-DD-YYYY',
        defaultValue: null,
        editable: false,
        validations: []
      }
    },
    {
      label: 'USER_CREATION',
      key: 'userCreation',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: []
      }
    },
    {
      label: 'DATE_MODIFIED',
      key: 'dateModified',
      config: {
        type: 'date',
        format: 'MM-DD-YYYY',
        defaultValue: null,
        editable: false,
        validations: []
      }
    },
    {
      label: 'USER_MODIFIED',
      key: 'userModified',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: []
      }
    },
    {
      label: 'DELETED',
      key: 'deleted',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: false,
        validations: []
      }
    }
  ]
}
export default config
