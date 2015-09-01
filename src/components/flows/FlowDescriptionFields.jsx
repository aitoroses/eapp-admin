import {validate} from 'lib/validations'
import {actions as FlowActions} from 'actions/FlowsActions'
import {store as FlowsStore} from 'stores/FlowsStore'
import shallowEqual from 'react-pure-render/shallowEqual'
const PropTypes = React.PropTypes

class FlowDescriptionFields extends React.Component {

  static propTypes = {
    flowId: PropTypes.object.isRequired,
    flowName: PropTypes.object.isRequired,
    flowDescription: PropTypes.object.isRequired,
    itemList: PropTypes.object.isRequired
  }

  handleChange(value, fieldId) {
    FlowActions.setFieldRuntimeValue({value: value, fieldId: fieldId})
  }

  handleValidate(error, fieldId) {
    FlowActions.setFieldRuntimeError({error: error, fieldId: fieldId})
  }

  render() {

    let handleChange = this.handleChange.bind(this)
    let handleValidate = this.handleValidate.bind(this)

    return (
      <div>
        <FlowDescriptionInput {...this.props.flowId} onChange={handleChange} onValidate={handleValidate}/>
        <FlowDescriptionInput {...this.props.flowName} onChange={handleChange} onValidate={handleValidate}/>
        <FlowDescriptionInput {...this.props.flowDescription} onChange={handleChange} onValidate={handleValidate}/>
        <FlowDescriptionCombo {...this.props.itemList}
          onChange={handleChange}
          onValidate={handleValidate}
          options={FlowActions.queryItems}
          labelField='itemDescription'
          valueField='itemId' />
      </div>
    )
  }
}

class ControlledValueComponent extends React.Component {
  constructor(props) {
    super()

    this.state =  {
      value: props.runtime.value
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.runtime !== this.props.runtime) {
      this.setState({
        value: nextProps.runtime.value,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
    )
  }

  handleChange(value) {
    this.setState({value})
  }
}

class FlowDescriptionInput extends ControlledValueComponent {

  static propTypes = {
    runtime: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onValidate: PropTypes.func

  }

  constructor(props) {
    super(props)

    if (props.onValidate) {
      props.onValidate(validate(props.runtime.value, props.config.validations), props.config.fieldId)
    }
  }

  componentWillReceiveProps(props) {

    super.componentWillReceiveProps(props)

    if (this.props.onValidate) {
      this.props.onValidate(validate(props.runtime.value, props.config.validations), props.config.fieldId)
    }
  }

  handleChange(event) {

    var input = event.target.value

    if (this.props.config.type == 'number') input = parseInt(input)

    var errors = validate(input, this.props.config.validations)

    // Update local state
    super.handleChange(input)

    //if (this.props.onChange && errors.valid) {
    if (this.props.onChange) {
      this.props.onChange(input, this.props.config.fieldId)
    }

    if (this.props.onValidate) {
      this.props.onValidate(errors, this.props.config.fieldId)
    }
  }

  renderInput() {
    const {runtime, config} = this.props

    let handleChange = this.handleChange.bind(this)

    switch (config.type) {

      case 'text':
        return <input placeholder={config.hint} type='text' onChange={handleChange} value={this.state.value}/>

      case 'number':
        return <input placeholder={config.hint} type='number' onChange={handleChange} value={this.state.value}/>

      case 'textarea':
        return <textarea placeholder={config.hint} onChange={handleChange} value={this.state.value}/>

      default:
        return <span/>
    }
  }

  renderErrors() {
    return (
      <div>{JSON.stringify(this.props.runtime.error)}</div>
    )
  }

  render() {
    const {runtime, config} = this.props

    return (
      <div>
        <label>{config.label}</label>
        {this.renderInput()}
        {this.renderErrors.call(this)}
      </div>
    )
  }
}

class FlowDescriptionCombo extends React.Component {

  static propTypes = {
    runtime: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    options: PropTypes.func,
    labelField: PropTypes.string,
    valueField: PropTypes.string
  }

  constructor(props) {
    super(props)

    if (props.onValidate) {
      props.onValidate(validate(props.runtime.value, props.config.validations), props.config.fieldId)
    }
  }

  componentDidMount() {
    this.props.options()
  }

  componentWillReceiveProps(props) {

    if (this.props.onValidate) {
      this.props.onValidate(validate(props.runtime.value, props.config.validations), props.config.fieldId)
    }
  }

  handleChange() {

    var input = event.target.value

    var errors = validate(input, this.props.config.validations)

    if (this.props.onChange) {
      this.props.onChange(input, this.props.config.fieldId)
    }

    if (this.props.onValidate) {
      this.props.onValidate(errors, this.props.config.fieldId)
    }
  }

  renderInput() {

    const {runtime, config} = this.props

    let handleChange = this.handleChange.bind(this)

    if (config.validValues.length > 0) {
      var _this = this
      var optionNodes = config.validValues.map(function(option) {
        return <option key={option[_this.props.valueField]} value={option[_this.props.valueField]}>{option[_this.props.labelField]}</option>
      })
    }

    return <select onChange={handleChange}>{optionNodes}</select>
  }

  renderErrors() {
    return (
      <div>{JSON.stringify(this.props.runtime.error)}</div>
    )
  }

  render() {

    const {runtime, config} = this.props

    return (
      <div>
        <label>{config.label}</label>
        {this.renderInput()}
        {this.renderErrors.call(this)}
      </div>
    )
  }

}

export default FlowDescriptionFields
