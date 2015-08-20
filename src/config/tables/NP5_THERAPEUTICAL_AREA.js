//NP5_THERAPEUTICAL_AREA
var config = {

  tableName: 'NP5_THERAPEUTICAL_AREA',
  fields: [
  	{
  		label: 'TA_ID',
  		config: {
  			type: 'number',
  			defaultValue: null,
  			editable: true,
  			validations: ['required', 'positive'],
  			tooltip: 'eapp.admin.tooltips.taId'
  		}
  	},
  	{
  		label:	'TA_NAME',
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
  		label:	'DIVISION',
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
  		label:	'ORGANIZATIONAL_UNIT',
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
  		label:	'IS_BU',
  		config: {
  			type: 'checkbox',
  			defaultValue: 0,
  			editable: true,
  			validations: [],
  			tooltip: 'eapp.admin.tooltips.isBU'
  		}
  	},
  	{
  		label:	'IS_BF',
  		config: {
  			type: 'checkbox',
  			defaultValue: 0,
  			editable: true,
  			validations: [],
  			tooltip: 'eapp.admin.tooltips.isBF'
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
  		label:	'COUNTRY_ID',
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
