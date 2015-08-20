//NP5_COUNTRY
var countryConfig = [
	{
		label: 'COUNTRY_ID',
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
		label:	'COUNTRY_NAME',
		config: {
			type: 'text',
			defaultValue: null,
			editable: true,
			validations: ['required', ['maxLength', 1000]],
			tooltip: 'eapp.admin.tooltips.countryName'
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
	},
	{
		label:	'COUNTRY_SAP_CODE',
		config: {
			type: 'text',
			defaultValue: null,
			editable: true,
			validations: [['maxLength', 25]],
			tooltip: 'eapp.admin.tooltips.countrySapCode'
		}
	},
	{
		label:	'COUNTRY_SHORT',
		config: {
			type: 'text',
			defaultValue: 0,
			editable: true,
			validations: [['maxLength', 4]],
			tooltip: 'eapp.admin.tooltips.countryShort'
		}
	}
]

export default countryConfig;
