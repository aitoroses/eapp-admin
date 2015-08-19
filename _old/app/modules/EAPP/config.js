import validation from 'EAPP/validations'
//import {validate} from 'EAPP/validations'
//debugger;

module.exports = {
	StepType: [{'name':'APP'},{'name':'REV'},{'name':'REV2'}],
	Category: [{'name':'GENERAL'},{'name': 'DETAILS'},{'name':'TABLE'}],
	Variables: ['stringVar1', 'stringVar2', 'stringVar3', 'stringVar4', 'stringVar5'],
	Type: ['OU', 'BusinessRole', 'Therapeutical Area'],
	Value: [],
	tables: {
	StepTable2: [
		{'stepId':{
			'displayName': 'Step Id',
			'atomicData': 'stepId',
			'typeOfColumn': 'input',
			'value': null,
			'required': true,
			'validation' : validation.number,
			'error' : false
		}},
		{'stepDescription':{
			'displayName': 'Step Description',
			'atomicData': 'stepDescription',
			'typeOfColumn': 'input',
			'value': null,
			'required': false,
			'validation' : validation.string,
			'error' : false
		}},
		{'stepType':{
			'displayName': 'Step Type',
			'atomicData': 'stepType',
			'typeOfColumn': 'combo',
			'value': null,
			'required': true,
			'combo' : {
				'data' : [{'name':'APP'},{'name':'REV'},{'name':'REV4'}],
				'multiple' : false,
				'saveData' : 'name',
				'keyData' : 'value',
				'display' : 'name',
				'validation' : function(a){console.log(a);}
			}
		}},
		{'reminder':{
			'displayName': 'Reminder',
			'atomicData': 'reminder',
			'typeOfColumn': 'input',
			'value': null,
			'required': false,
			'placeholder' : '24',
			'validation' : validation.number,
			'error': false
		}},
		{'deadline':{
			'displayName': 'Deadline',
			'atomicData': 'deadline',
			'typeOfColumn': 'input',
			'value': null,
			'required': false,
			'placeholder' : '72',
			'validation' : validation.number,
			'error': false
		}},
		{'nextStepId':{
			'displayName': 'Next Step Id',
			'atomicData': 'nextStepId',
			'typeOfColumn': 'input',
			'value': null,
			'required': false,
			'validation' : validation.number,
			'error': false
		}},
		{'firstStepId':{
			'displayName': 'First Step Id',
			'atomicData': 'firstStepId',
			'typeOfColumn': 'checkbox',
			'value': false,
			'required': false,
			'checkbox' : {
				'editable' : true,
				'validation' : function(a){console.log(a);}
			}
		}},
		{'rejectedNextStepId':{
			'displayName': 'Rejected Next Step Id',
			'atomicData': 'rejectedNextStepId',
			'typeOfColumn': 'input',
			'value': null,
			'required': false,
			'validation' : validation.number,
			'error': false
		}}],
	FlowFieldsTable: [
		{'fieldDisplayName':{
			'displayName': 'Flow Field',
			'atomicData': 'fieldDisplayName',
			'typeOfColumn': 'input'
		}},
		{'category':{
			'displayName': 'Category',
			'atomicData': 'category',
			'typeOfColumn': 'combo',
			'value': null,
			'force': true,
			'combo' : {
				'data' :[{'name':'GENERAL'},{'name': 'DETAILS'},{'name':'TABLE'}],
				'multiple' : false,
				'saveData' : 'name',
				'keyData' : 'value',
				'display' : 'name',
				'validation' : function(a){console.log(a);}
			}
		}}],
	ItemsTable: [
		{'itemId':{
			'displayName': 'Item Id',
			'atomicData': 'itemId',
			'typeOfColumn': 'input',
			'validation' : validation.string,
			'error' : false
		}},
		{'itemName':{
			'displayName': 'Item Name',
			'atomicData': 'itemName',
			'typeOfColumn': 'input',
			'validation' : validation.string,
			'error' : false
		}},
		{'itemDescription':{
			'displayName': 'Item Description',
			'atomicData': 'itemDescription',
			'typeOfColumn': 'input',
			'validation' : validation.string,
			'error' : false
		}}
	],
	CountriesTable: [
		{'countryId':{
			'displayName': 'Country Id',
			'atomicData': 'countryId',
			'typeOfColumn': 'input',
			'validation' : validation.string,
			'error' : false
		}},
		{'countryDescription':{
			'displayName': 'Country Code',
			'atomicData': 'countryCode',
			'typeOfColumn': 'input',
			'validation' : validation.string,
			'error' : false
		}},
		{'countryName':{
			'displayName': 'Country Name',
			'atomicData': 'countryName',
			'typeOfColumn': 'input',
			'validation' : validation.string,
			'error' : false
		}},

	]},
	DefaultOptions: {
		"rows":8,
		"maximumPages":10
	},
	a: function(){
		console.log("a");
	}
}
