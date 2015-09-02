//NP5_COUNTRY
var config = {

  tableName: 'NP5_COUNTRY',
  allowedActions: ['ADD', 'UPDATE', 'DELETE'],
  fields: [
    {
      label: 'COUNTRY_ID',
      key: 'countryId',
      config: {
        type: 'number',
        defaultValue: null,
        editable: true,
        validations: ['required', 'positive'],
        tooltip: 'eapp.admin.tooltips.countryId'
      }
    },
    {
      label: 'COUNTRY_CODE',
      key: 'countryCode',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        validations: ['required', ['maxLength', 2], ['pattern', '^[A-Z]{2}$']],
        example: 'CH',
        tooltip: 'eapp.admin.tooltips.countryCode'
      }
    },
    {
      label:  'COUNTRY_NAME',
      key: 'countryName',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        validations: ['required', ['maxLength', 1000]],
        tooltip: 'eapp.admin.tooltips.countryName'
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
        validations: []
      }
    },
    {
      label:  'USER_CREATION',
      key: 'userCreation',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: []
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
        validations: []
      }
    },
    {
      label:  'USER_MODIFIED',
      key: 'userModified',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: []
      }
    },
    {
      label:  'DELETED',
      key: 'deleted',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: false,
        validations: []
      }
    },
    {
      label:  'COUNTRY_SAP_CODE',
      key: 'countrySapCode',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        validations: [['maxLength', 25]],
        tooltip: 'eapp.admin.tooltips.countrySapCode'
      }
    },
    {
      label:  'COUNTRY_SHORT',
      key: 'countryShort',
      config: {
        type: 'text',
        defaultValue: 0,
        editable: true,
        validations: [['maxLength', 4]],
        tooltip: 'eapp.admin.tooltips.countryShort'
      }
    }
  ]
}
export default config
