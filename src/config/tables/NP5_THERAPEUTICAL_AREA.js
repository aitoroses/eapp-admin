//NP5_THERAPEUTICAL_AREA
var config = {

  tableName: 'NP5_THERAPEUTICAL_AREA',
  fields: [
    {
      label: 'TA_ID',
      key: 'taId',
      config: {
        type: 'number',
        defaultValue: null,
        editable: true,
        validations: ['required', 'positive'],
        tooltip: 'eapp.admin.tooltips.taId'
      }
    },
    {
      label:  'TA_NAME',
      key: 'taName',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        validations: ['required',['maxLength', 500]],
        tooltip: 'eapp.admin.tooltips.taName'
      }
    },
    {
      label: 'COUNTRY',
      key: 'country',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        master: ['OU', 'x.split("_")[0]'],
        validations: ['required', ['maxLength', 500]],
        tooltip: 'eapp.admin.tooltips.countryAuto'
      }
    },
    {
      label:  'DIVISION',
      key: 'division',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        master: ['OU', 'x.split("_")[1]'],
        validations: ['required', ['maxLength', 500]],
        tooltip: 'eapp.admin.tooltips.divisionAuto'
      }
    },
    {
      label:  'ORGANIZATIONAL_UNIT',
      key: 'organizationalUnit',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        validations: ['required', ['pattern', '^.+_.+$']],
        example: 'AUSTRIA_PH',
        tooltip: 'eapp.admin.tooltips.ou'
      }
    },
    {
      label:  'IS_BU',
      key: 'isBu',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: true,
        validations: [],
        tooltip: 'eapp.admin.tooltips.isBU'
      }
    },
    {
      label:  'IS_BF',
      key: 'isBf',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: true,
        validations: [],
        tooltip: 'eapp.admin.tooltips.isBF'
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
      label:  'COUNTRY_ID',
      key: 'countryId',
      config: {
        type: 'number',
        defaultValue: null,
        editable: true,
        validations: [],
        tooltip: 'eapp.admin.tooltips.countryId'
      }
    }
  ]
}
export default config;
