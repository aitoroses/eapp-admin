import {decorate} from 'react-mixin'
import shallowEqual from 'react-pure-render/shallowEqual'

var debounce = function(func, threshold, execAsap) {
  var timeout

  return function debounced() {
    var _this = this
    var args = arguments
    function delayed() {
      if (!execAsap)
          func.apply(_this, args)
      timeout = null
    }

    if (timeout)
        clearTimeout(timeout)
    else if (execAsap)
        func.apply(_this, args)

    timeout = setTimeout(delayed, threshold || 100)
  }
}

var ToggleParentClassMixin = {
  componentDidMount() {
      var node = React.findDOMNode(this)
      var $node = $(node)
      this.$node = $node
    },

  toggleParentClass(klass) {
      this.$node.parent().toggleClass(klass)
    }
}

@decorate(ToggleParentClassMixin)
class TableCellComponent extends React.Component {

  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    columnDef: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    errors: React.PropTypes.object,
    dependencyDataGetter: React.PropTypes.func
  }

  constructor(props) {
    super()
    this.debouncedChange = debounce(props.onChange, 60)
  }

  state = {
    validity: true
  }

  _getCellColor() {
    var color = this.props.isEditing == true && this.state.validity == false ? 'rgb(244, 177, 177)' : null
    return color
  }

  _getCellValue() {
    return this.props.columnDef.config.type == 'date' && this.props.value != null ? moment(this.props.value).format(this.props.columnDef.config.format) : this.props.value
  }

  componentDidMount() {
    if (this.isEditable()) {
      this.toggleParentClass('no-padding')
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.isEditable(this.props) != this.isEditable(nextProps)) {
      this.toggleParentClass('no-padding')
    }
  }

  isEditable(props) {
    var p = props || this.props
    return p.isEditing && p.columnDef.config.editable
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (!shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state))
  }

  render() {
    var calculated = {
      isEditing: this.isEditable(),
      value: this._getCellValue(),
    }

    var props = {
      ...calculated,
      columnDef: this.props.columnDef,
      onChange: this.debouncedChange,
      row: this.props.row,
      column: this.props.column,
      errors: this.props.errors,
      dependencyDataGetter: this.props.dependencyDataGetter
    }

    if (this.props.columnDef.config.type == 'date') {
      return <DateCellComponent {...props}></DateCellComponent>
    }

    if (this.props.columnDef.config.type == 'text') {
      return <TextCellComponent {...props}></TextCellComponent>
    }

    if (this.props.columnDef.config.type == 'number') {
      if (typeof (props.value) == 'string' && props.value == '') props.value = null
      return <NumberCellComponent {...props}></NumberCellComponent>
    }

    if (this.props.columnDef.config.type == 'checkbox') {
      return <CheckBoxCellComponent {...props}></CheckBoxCellComponent>
    }

    if (this.props.columnDef.config.type == 'dylov') {
      return <SelectCellComponent {...props}></SelectCellComponent>
    }
    /*
    var color = this._getCellColor()
    */

  }
}

class SelectCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    columnDef: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    errors: React.PropTypes.object,
    dependencyDataGetter: React.PropTypes.func.isRequired
  }

  state = {
    currentValue: this.props.value
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentValue: nextProps.value
    })
  }

  handleChange(e) {
    this.setState({
      currentValue: e.target.value
    })
    this.props.onChange(e.target.value, this.props.column)
  }

  renderSelect(props) {
    let className = !this.props.errors ? 'input-editable' : this.props.errors.valid ? 'input-editable' : 'input-editable input-validation-error'
    let options = this.props.dependencyDataGetter(
      this.props.columnDef.config.dataSource,
      this.props.columnDef.config.valueField,
      this.props.columnDef.config.labelField).map((ele, i) => <option key={i} value={ele.id}>{ele.label}</option>)

    if (!this.state.currentValue) {
      options = [<option key={'null'} value={null}>-- Select --</option>, ...options]
    }

    return (
      <select value={this.state.currentValue} onChange={this.handleChange} className={className} {...props}>{options}</select>
    )
  }

  render() {
    var holder
    if (this.props.isEditing) {
      var style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }

      holder = this.renderSelect({style})
    } else {
      var style = {
        border: 0,
        padding: '5px'
      }
      holder = (
        <div style={style}>{this.props.value}</div>
      )
    }

    return holder
  }
}

class DateCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    columnDef: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    errors: React.PropTypes.object
  }

  state = {
    currentValue: this.props.value
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentValue: nextProps.value
    })
  }

  handleChange(e) {
    this.setState({
      currentValue: e.target.value
    })
    this.props.onChange(e.target.value, this.props.column)
  }

  render() {
    var holder
    if (this.props.isEditing) {
      var style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }
      let className = !this.props.errors ? 'input-editable' : this.props.errors.valid ? 'input-editable' : 'input-editable input-validation-error'
      holder = (
        <input
          className={className}
          ref={this.props.columnDef.key + '_' + this.props.row}
          type='text'
          value={this.state.currentValue}
          onChange={this.handleChange}
          onBlur={this.handleOnBlur}
          style={style}
        />
      )
    } else {
      var style = {
        border: 0,
        padding: '5px'
      }
      holder = (
        <div style={style}>{this.props.value}</div>
      )
    }

    return holder
  }
}

class TextCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    columnDef: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    errors: React.PropTypes.object
  }

  state = {
    currentValue: this.props.value
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentValue: nextProps.value
    })
  }

  handleChange(e) {
    this.setState({
      currentValue: e.target.value
    })
    this.props.onChange(e.target.value, this.props.column)
  }

  render() {
    var holder
    if (this.props.isEditing) {
      var style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }
      let className = !this.props.errors ? 'input-editable' : this.props.errors.valid ? 'input-editable' : 'input-editable input-validation-error'
      holder = (
        <input
          className={className}
          type='text'
          value={this.state.currentValue}
          onChange={this.handleChange}
          style={style}
        />
      )
    } else {
      var style = {
        border: 0,
        padding: '5px'
      }
      holder = (
        <div style={style}>{this.props.value}</div>
      )
    }

    return holder
  }
}

class NumberCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    columnDef: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    errors: React.PropTypes.object
  }

  state = {
    currentValue: parseInt(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentValue: parseInt(nextProps.value)
    })
  }

  handleChange(e) {
    this.setState({
      currentValue: e.target.value
    })
    this.props.onChange(e.target.value, this.props.column)
  }

  render() {
    var holder
    if (this.props.isEditing) {
      let style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }
      let className = !this.props.errors ? 'input-editable' : this.props.errors.valid ? 'input-editable' : 'input-editable input-validation-error'
      holder = (
        <input
          className={className}
          ref={this.props.columnDef.key + '_' + this.props.row}
          type='number'
          value={this.state.currentValue}
          onChange={this.handleChange}
          onBlur={this.handleOnBlur}
          style={style}
        />
      )
    } else {
      var style = {
        border: 0,
        padding: '5px'
      }
      holder = (
        <div style={style}>{this.props.value}</div>
      )
    }

    return holder
  }
}

class CheckBoxCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    columnDef: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    errors: React.PropTypes.object
  }

  state = {
    currentValue: Boolean(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentValue: Boolean(nextProps.value)
    })
  }

  handleChange(e) {
    this.setState({
      currentValue: e.target.checked
    })
    let boolValue = e.target.checked ? 1 : 0
    this.props.onChange(boolValue, this.props.column)
  }

  render() {
    var holder
    if (this.props.isEditing) {
      var style = {
        width: '98%',
        backgroundColor: 'white',
        height: '45px',
        paddingTop: '15px',
        border: '0 !important'
      }
      if (this.props.errors) {
        if (!this.props.errors.valid) {
          style.backgroundColor = '#F3C9C9'
          style.border = '2px solid #EF6C6C ! important'
        }
      }

      holder = (
        <div style={style}>
          <input
            ref={this.props.columnDef.key + '_' + this.props.row}
            type='checkbox'
            value={this.state.currentValue}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
        </div>
      )
    } else {
      var style = {
        backgroundColor: 'rgba(0,0,0,0) !important',
        border: 0,
        padding: '5px'
      }
      holder = (
        <input
          ref='input'
          disabled={true}
          type='checkbox'
          defaultValue={this.props.value}
          style={style}
        />
      )
    }

    return holder
  }
}

export default TableCellComponent
