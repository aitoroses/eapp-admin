//NP5_ITEMS_PERMISSION
var config = {

  tableName: 'NP5_ITEMS_PERMISSION',
  fields: [
    {
      label: 'ITEM_ID',
      config: {
        type: 'number',
        defaultValue: null,
        editable: true,
        validations: ['required'],
        tooltip: 'eapp.admin.tooltips.itemId'
      }
    },
    {
      label: 'COUNTRY',
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
      label:  'OU',
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
      label:  'BUSINESS_ROLE',
      config: {
        type: 'text',
        defaultValue: 0,
        editable: true,
        validations: ['required',['maxLength', 500]],
        tooltip: 'eapp.admin.tooltips.businessRole'
      }
    },
    {
      label:  'IS_FOR_MEDICAL',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: true,
        validations: [],
        tooltip: 'eapp.admin.tooltips.isForMedical'
      }
    },
    {
      label:  'IS_FOR_MARKETING',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: true,
        validations: [],
        tooltip: 'eapp.admin.tooltips.isForMarketing'
      }
    },
    {
      label:  'IS_FOR_SALES',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: true,
        validations: [],
        tooltip: 'eapp.admin.tooltips.isForSales'
      }
    },
    {
      label:  'EVERYBODY',
      config: {
        type: 'checkbox',
        defaultValue: 1,
        editable: true,
        validations: [],
        tooltip: 'eapp.admin.tooltips.everybody'
      }
    },
    {
      label:  'DATE_CREATION',
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
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: []
      }
    },
    {
      label:  'DATE_MODIFIED',
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
      config: {
        type: 'text',
        defaultValue: null,
        editable: false,
        validations: []
      }
    },
    {
      label:  'DELETED',
      config: {
        type: 'checkbox',
        defaultValue: 0,
        editable: false,
        validations: []
      }
    }
  ]
}
export default config;
