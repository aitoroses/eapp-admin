//CONF_ITEM
var itemsConfig = [
	{
		label: 'ITEM_ID',
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
		config: {
			type: 'date',
			format: 'MM-DD-YYYY',
			defaultValue: null,
			editable: false,
			validations: []
		}
	},
	{
		label:	'USER_CEATION',
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

export default itemsConfig;
