//NP5_THERAPEUTICAL_AREA
var config = {

  tableName: 'NP5_THERAPEUTICAL_AREA',

  //resolve: ['countries'],
  fields: [
    {
      label: 'TA_ID',
      key: 'taId',
      config: {
        type: 'number',
        defaultValue: null,
        editable: true,
        validations: ['required', 'positive'],
        tooltip: 'eapp.admin.tooltips.taId',
        searchable: true
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
        tooltip: 'eapp.admin.tooltips.taName',
        searchable: true
      }
    },
    {
      label: 'COUNTRY',
      key: 'country',
      config: {
        dataSource: 'countries',
        type: 'dylov',
        defaultValue: null,
        editable: true,
        valueField: 'countryId',
        labelField: 'countryCode',
        master: ['country', 'x.toUpperCase()'],
        validations: ['required', ['maxLength', 500]],
        tooltip: 'eapp.admin.tooltips.countryAuto',
        searchable: true
      }
    },
    {
      label:  'DIVISION',
      key: 'division',
      config: {
        type: 'text',
        defaultValue: null,
        editable: true,
        master: ['division', 'x.toUpperCase()'],
        validations: ['required', ['maxLength', 500]],
        tooltip: 'eapp.admin.tooltips.divisionAuto',
        searchable: true
      }
    },
    {
      label:  'ORGANIZATIONAL_UNIT',
      key: 'organizationalUnit',
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        master: [null, 'toCountry(xs[2]) + "_" + xs[3].toUpperCase()'],
        validations: ['required', ['pattern', '^.+_.+$']],
        example: 'AUSTRIA_PH',
        tooltip: 'eapp.admin.tooltips.ou',
        searchable: true
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
export default config
