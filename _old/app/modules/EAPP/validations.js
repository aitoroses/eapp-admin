module.exports = {
	number: function(num){
		return /^[0-9]{1,5}$|^$/.test(num);
	},
	string: function(str){
		return /^[A-Za-z0-9 ]{1,200}$|^$/.test(str);
	}
}

// var rules = module.exports = {
/*var rules = {
	number: {
		required: {
			error: "Number is required",
			validate: function(x) {
				return x != null
			} 
		},
		maxlength: {
			error: "Number exceeds maximum length",
			validate: function(num){
				return /^[0-9]{1,5}$|^$/.test(num);
			}
		
		},
	},
	string: {
		required: {
			error: "String is required",
			validate: function(x) {
				return x != null
			}
		},
		maxlength: {
			error: "String exceeds maximum length",
			validate: function(str){
				return /^[A-Za-z ]{1,200}$|^$/.test(str);
			}
		}
	}
}


export function validate(input, rls) {
	var type = typeof input;

	var ruleSet = rules[type];

	var results = rls.map(r => {
		var rule = ruleSet[r];

		if (!rule) throw Error("Not valid rule for type " + type + " called " + r);

		var fn = rule.validate;

		return {valid: fn(input), validation: r , message: rule.error}
	})

	var invalidResults = results.filter(r => r.valid == false);

	if (invalidResults.length > 0) {
		return {valid: false, errors: invalidResults, length: invalidResults.length}
	} else {
		return {valid: true};
	}
}*/

//validate(33, ["required", "maxlength"]);
//validate("hola", ["required", "maxlength"]);