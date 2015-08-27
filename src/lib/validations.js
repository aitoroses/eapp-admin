var rules = {
  number: {
    required: {
      error: "Number is required",
      validate(x) {
        return x != null
      }
    },
    maxlength: {
      error: "Number exceeds maximum length",
      validate(num){
        return /^[0-9]{1,5}$|^$/.test(num);
      }

    },
  },
  string: {
    required: {
      error: "String is required",
      validate(x) {
        return x != null || x!=""
      }
    },
    maxlength: {
      error: "String exceeds maximum length",
      validate(str){
        return str.length < 200;
      }
    }
  },
  'null': {
    required: {
      error: "Null is required",
      validate(x) {
        return x == null
      }
    },
    maxlength: {
      error: "String exceeds maximum length",
      validate(str){
        return true;
      }
    }
  }
}

export function validate(input, rls) {

  var type = input ? typeof input : "null";

  var ruleSet = rules[type];

  var results = rls.map(r => {
    var rule = ruleSet[r];

    if (!rule) {
      throw Error("Not valid rule for type " + type + " called " + r);
    }

    var fn = rule.validate;

    return {valid: fn(input), validation: r , message: rule.error}
  })

  var invalidResults = results.filter(r => r.valid == false);

  if (invalidResults.length > 0) {
    return {valid: false, errors: invalidResults, length: invalidResults.length}
  } else {
    return {valid: true};
  }
}

//validate(33, ["required", "maxlength"]);
//validate("hola", ["required", "maxlength"]);
