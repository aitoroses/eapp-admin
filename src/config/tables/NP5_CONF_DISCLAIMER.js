//NP5_CONF_DISCLAIMER
var config = {

  tableName: 'NP5_CONF_DISCLAIMER',
  fields: [
  	{
  		label: 'ITEM_ID',
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
  		config: {
  			type: 'text',
  			defaultValue: null,
  			editable: false,
  			validations: ['required'],
  			tooltip: 'eapp.admin.tooltips.ou'
  		}
  	},
  	{
  		label:	'DISCLAIMER',
  		config: {
  			type: 'text',
  			defaultValue: 'NA',
  			editable: true,
  			validations: ['required', ['maxLength', 4000]],
  			tooltip: 'eapp.admin.tooltips.disclaimer'
  		}
  	},
  	{
  		label:	'DATE_CREATION',
  		config: {
  			type: 'date',
  			format: 'MM-DD-YYYY',
  			defaultValue: null,
  			editable: false,
  			validations: []
  		}
  	},
  	{
  		label:	'USER_CREATION',
  		config: {
  			type: 'text',
  			defaultValue: null,
  			editable: false,
  			validations: []
  		}
  	},
  	{
  		label:	'DATE_MODIFIED',
  		config: {
  			type: 'date',
  			format: 'MM-DD-YYYY',
  			defaultValue: null,
  			editable: false,
  			validations: []
  		}
  	},
  	{
  		label:	'USER_MODIFIED',
  		config: {
  			type: 'text',
  			defaultValue: null,
  			editable: false,
  			validations: []
  		}
  	},
  	{
  		label:	'DELETED',
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
