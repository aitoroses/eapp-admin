import validate from './fieldValidations'

describe.only('Field Validations Tests:', () => {

  it('Input type Number Positive -> should return VALID', () => {
    let field = {value: '602', type: 'number', rules: ['required', 'positive']}
    let res = validate(field)
    res.valid.should.equal(true)
  })

  it('Input type Number Negative -> should return INVALID', () => {
    let field = {value: -1, type: 'number', rules: ['required', 'positive']}
    let res = validate(field)
    res.valid.should.equal(false)
  })

  it('Input type Number Empty -> should return INVALID', () => {
    let field = {value: null, type: 'number', rules: ['required', 'positive']}
    let res = validate(field)
    res.valid.should.equal(false)
  })

  it('Input type Text Required -> should return VALID', () => {
    let field = {value: 'aaa', type: 'text', rules: ['required']}
    let res = validate(field)
    res.valid.should.equal(true)
  })

  it('Input type Text Required -> should return INVALID', () => {
    let field = {value: '', type: 'text', rules: ['required']}
    let res = validate(field)
    res.valid.should.equal(false)
  })

  it('Input type Text MaxLength -> should return VALID', () => {
    let field = {value: 'aaa', type: 'text', rules: [['maxLength', 10]]}
    let res = validate(field)
    res.valid.should.equal(true)
  })

  it('Input type Text MaxLength -> should return INVALID', () => {
    let field = {value: 'aaabbbcccddd', type: 'text', rules: [['maxLength', 10]]}
    let res = validate(field)
    res.valid.should.equal(false)
  })

  it('Input type Text Pattern -> should return VALID', () => {
    let field = {value: 'Prueba_Buena', type: 'text', rules: [['pattern', '^.+_.+$']]}
    let res = validate(field)
    res.valid.should.equal(true)
  })

  it('Input type Text Pattern -> should return INVALID', () => {
    let field = {value: 'Prueba', type: 'text', rules: [['pattern', '^.+_.+$']]}
    let res = validate(field)
    res.valid.should.equal(false)
  })

  it('NO INPUT TYPE -> should return INVALID', () => {
    let field = {value: 'Prueba', type: null, rules: [['pattern', '^.+_.+$']]}
    let res = validate(field)
    res.valid.should.equal(false)
    res.errors.should.be.instanceof(Array)
  })
})
