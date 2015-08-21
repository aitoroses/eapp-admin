class TableCellComponent extends React.Component {

  static propTypes = {
    isEditing: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string.isRequired
  }

  static styles = {
    input: {
      borderRadius: '4px',
      border: '1px solid grey',
      outline: 'none',
      lineHeight: '24px',
      backgroundColor: null,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
    output: {
      whiteSpace: 'nowrap',
      lineHeight: '24px',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      position: 'absolute',
      backgroundColor: null
    }
  }

  state = {
    validity: true
  }

  _getCellColor() {
    var color = this.props.isEditing == true && this.state.validity == false ? "rgb(244, 177, 177)" : null;
    return color;
  }

  handleChange(){

  }

  render() {

    var color = this._getCellColor();
    var style = this.props.isEditing ? TableCellComponent.styles.input : TableCellComponent.styles.output;
    style.backgroundColor = color;

    var holder;
    if (this.props.isEditing) {
      holder = (
        <input
          style={style}
          ref="input"
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
        />
      )
    } else {
      holder = (
        <div
          style={style}>
          {this.props.value}
        </div>
      )
    }
    return (
      <div>
        {holder}
      </div>
    );
  }
}

export default TableCellComponent;
