import {decorate} from 'react-mixin';
import PureComponent from 'react-pure-render/component'

var ToggleParentClassMixin = {
    componentDidMount() {
      var node = React.findDOMNode(this);
      var $node = $(node);
      this.$node = $node;
    },

    toggleParentClass(klass) {
      this.$node.parent().toggleClass(klass);
    }
}

@decorate(ToggleParentClassMixin)
class TableCellComponent extends PureComponent {

  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    columnDef: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func
  }

  static styles = {
    input: {
      border: 'none',
      outline: 'none',
      lineHeight: '24px',
      left: 0,
      top: 0,
      padding: '8px'
    },
    output: {
      whiteSpace: 'nowrap',
      lineHeight: '24px',
      left: 0,
      top: 0,
      backgroundColor:'rgba(0,0,0,0) !important',
      background: 'rgba(0,0,0,0) !important',
      border: 0
    }
  }

  state = {
    validity: true
  }

  _getCellColor() {
    var color = this.props.isEditing == true && this.state.validity == false ? "rgb(244, 177, 177)" : null;
    return color;
  }

  _getCellValue() {
    return this.props.columnDef.config.type == 'date' && this.props.value!=null ? moment(this.props.value).format(this.props.columnDef.config.format) : this.props.value;
  }

  componentDidMount() {
    if (this.isEditable()) {
      this.toggleParentClass('no-padding');
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.isEditable(this.props) != this.isEditable(nextProps)) {
      this.toggleParentClass('no-padding');
    }
  }

  isEditable(props) {
    var p = props || this.props;
    return p.isEditing && p.columnDef.config.editable;
  }

  handleChange(value) {
    //this.props.onChange(value, )
  }


  render() {

    var inputEditable = this.isEditable()

    var props = {
      isEditing: inputEditable,
      value: this._getCellValue(),
      columnDef: this.props.columnDef,
      onChange: this.handleChange
    }

    if(this.props.columnDef.config.type == 'date'){
      return <DateCellComponent {...props}></DateCellComponent>
    }
    if(this.props.columnDef.config.type == 'text'){
      return <TextCellComponent {...props}></TextCellComponent>
    }
    if(this.props.columnDef.config.type == 'number'){
      return <NumberCellComponent {...props}></NumberCellComponent>
    }
    if(this.props.columnDef.config.type == 'checkbox'){
      return <CheckBoxCellComponent {...props}></CheckBoxCellComponent>
    }

    /*
    var color = this._getCellColor();
    */

  }
}

class DateCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    columnDef: React.PropTypes.object.isRequired
  }

  handleChange(){
    console.log('cambiando valor');
  }

  render() {
    var holder;
    if(this.props.isEditing){
      var style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }
      holder = (
        <input
          className="input-editable"
          ref="input"
          type="text"
          value={this.props.value}
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
    return holder;
  }
}

class TextCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    columnDef: React.PropTypes.object.isRequired
  }

  handleChange(){
    console.log('cambiando valor');
  }

  render() {
    var holder;
    if(this.props.isEditing){
      var style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }
      holder = (
        <input
          className="input-editable"
          ref="input"
          type="text"
          value={this.props.value}
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
    return holder;
  }
}

class NumberCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number,
    columnDef: React.PropTypes.object.isRequired
  }

  handleChange(){
    console.log('cambiando valor');
  }

  render() {
    var holder;
    if(this.props.isEditing){
      var style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }
      holder = (
        <input
          className="input-editable"
          ref="input"
          type="number"
          value={this.props.value}
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
    return holder;
  }
}

class CheckBoxCellComponent extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number,
    columnDef: React.PropTypes.object.isRequired
  }

  handleChange(){
    console.log('cambiando valor');
  }

  render() {
    var holder;
    if(this.props.isEditing){
      var style = {
        padding: '5px',
        border: 0,
        width:'100%',
        height:'50px'
      }
      holder = (
        <input
          className="input-editable"
          ref="input"
          type="checkbox"
          value={this.props.value}
          onChange={this.handleChange}
          style={style}
        />
      )
    } else {
      var style = {
        backgroundColor: 'rgba(0,0,0,0) !important',
        border: 0,
        padding: '5px'
      }
      holder = (
        <input
          ref="input"
          disabled={true}
          type="checkbox"
          defaultValue={this.props.value}
          style={style}
        />
      )
    }
    return holder;
  }
}

export default TableCellComponent;
