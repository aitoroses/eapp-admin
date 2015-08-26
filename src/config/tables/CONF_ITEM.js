//CONF_ITEM
var config = {

  tableName: 'CONF_ITEM',
  fields: [
  	{
  		label: 'ITEM_ID',
  		key: 'itemId',
      config: {
  			type: 'number',
  			defaultValue: null,
  			editable: true,
  			validations: ['required', 'positive'],
  			tooltip: 'eapp.admin.tooltips.itemId'
  		}
  	},
  	{
  		label:	'ITEM_NAME',
  		key: 'itemName',
      config: {
  			type: 'text',
  			defaultValue: null,
  			editable: true,
  			validations: ['required',['maxLength', 200]],
  			tooltip: 'eapp.admin.tooltips.itemName'
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
  			tooltip: 'eapp.admin.tooltips.itemDescription'
  		}
  	},
  	{
  		label:	'DATE_CREATION',
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
  		label:	'USER_CREATION',
  		key: 'userCreation',
      config: {
  			type: 'text',
  			defaultValue: null,
  			editable: false,
  			validations: []
  		}
  	},
  	{
  		label:	'DATE_MODIFIED',
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
  		label:	'USER_MODIFIED',
  		key: 'userModified',
      config: {
  			type: 'text',
  			defaultValue: null,
  			editable: false,
  			validations: []
  		}
  	},
  	{
  		label:	'DELETED',
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

export default config;
