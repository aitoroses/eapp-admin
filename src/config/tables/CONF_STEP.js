var config = {

	tableName: 'CONF_STEP',
	fields: [
		{
			label: 'STEP_ID',
			key: 'stepId',
			config: {
				type: 'number',
				defaultValue: null,
				editable: false,
				validations: ['required'],
				tooltip: 'eapp.admin.tooltips.stepId'
			}
		},
		{
			label: 'STEP_DESCRIPTION',
			key: 'stepDescription',
			config: {
				type: 'text',
				defaultValue: 'NA',
				editable: true,
				validations: ['required', ['maxLength', 250]],
				tooltip: 'eapp.admin.tooltips.stepDescription'
			}
		},
		{
			label: 'ORGANIZATIONAL_UNIT',
			key: 'organizationalUnit',
	  		config: {
	  			type: 'text',
	  			defaultValue: 'REQUEST',
	  			editable: false,
	  			validations: ['required'],
	  			tooltip: 'eapp.admin.tooltips.ou'
	  		}
		},
		{
			label: 'STEP_TYPE',
			key: 'stepType',
			config: {
	  			type: 'text',
	  			defaultValue: null,
	  			editable: true,
	  			validations: ['required'],
	  			tooltip: 'eapp.admin.tooltips.stepType'
	  		}
		},
		{
			label: 'STEP_REMINDER',
			key: 'stepReminder',
			config: {
				type: 'number',
				defaultValue: null,
				editable: true,
				validations: ['positive'],
				tooltip: 'eapp.admin.tooltips.stepReminder'
			}
		},
		{
			label: 'STEP_DEADLINE',
			key: 'stepReminder',
			config: {
				type: 'number',
				defaultValue: null,
				editable: true,
				validations: ['positive'],
				tooltip: 'eapp.admin.tooltips.stepDeadline'
			}
		},
		{
			label: 'DEFAULT_NEXT_STEP_ID',
			key: 'defaultNextStepId',
			config: {
				type: 'number',
				defaultValue: null,
				editable: true,
				validations: ['required'],
				tooltip: 'eapp.admin.tooltips.defaultNextStepId'
			}
		},
		{
			label: 'REJECTED_NEXT_STEP_ID',
			key: 'rejectedNextStepId',
			config: {
				type: 'number',
				defaultValue: null,
				editable: true,
				validations: ['required'],
				tooltip: 'eapp.admin.tooltips.rejectedNextStepId'
			}
		}
	]
}
export default config;
