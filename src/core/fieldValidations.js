//VALIDATION RULES

var validationRules = {
  number: {
    required: {
      errorId: 'eapp.admin.errors.number.required',
      label: '',
      validate: function(x) {
        return x != null && x != ''
      }
    },
    positive: {
      errorId: 'eapp.admin.errors.number.positive',
      label: '',
      validate: function(num) {
        return num > 0
      }
    }
  },
  text: {
    required: {
      errorId: 'eapp.admin.errors.text.required',
      label: '',
      validate: function(x) {
        return x != null && x != ''
      }
    },
    maxLength: {
      errorId: 'eapp.admin.errors.text.maxLength',
      label: '',
      validate: function(str, maxLength) {
        return str.length <= maxLength
      }
    },
    pattern: {
      errorId: 'eapp.admin.errors.text.pattern',
      label: '',
      validate: function(str, pattern) {
        var regExp = new RegExp(pattern)
        return regExp.test(str)
      }
    },
    in: {
      errorId: 'eapp.admin.errors.text.in',
      label: '',
      validate: function(str, array) {
        return array.indexOf(str) != -1
      }
    }
  },
  checkbox: {
  },
  dylov: {
    required: {
      errorId: 'eapp.admin.errors.dylov.required',
      label: '',
      validate: function(x) {
        return x != null && x != ''
      }
    }
  }
}

export function validate({value, type, rules}) {
  //Validations of inputs
  if (type == null) {
    return {valid: false, errors: [{valid:false, errorId: 'eapp.admin.errors.null.type'}], length:1}
  }

  var ruleSet = validationRules[type]

  var results = rules.map(r => {

    if (r instanceof Array) {
      var [ruleName, ...args] = r
      var rule = ruleSet[ruleName]
      if (!rule) throw Error('Not valid rule for type ' + type + ' called ' + ruleName + ' and args ' + JSON.stringify(args))
      var fn = rule.validate
      return {valid: fn.apply(value, [value, ...args]), validation: r, errorId: rule.errorId}
    }    else {
      var rule = ruleSet[r]
      if (!rule) throw Error('Not valid rule for type ' + type + ' called ' + r)
      var fn = rule.validate
      return {valid: fn(value), validation: r, errorId: rule.errorId}
    }
  })

  var invalidResults = results.filter(r => r.valid == false)

  if (invalidResults.length > 0) {
    return {valid: false, errors: invalidResults, length: invalidResults.length}
  } else {
    return {valid: true}
  }
}

export default validate
