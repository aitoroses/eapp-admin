import DualBox from 'components/DualBox'
import {store as FlowsStore} from 'stores/FlowsStore'
import {actions as FlowActions} from 'actions/FlowsActions'

const PropTypes = React.PropTypes

class ExtendedDualBox extends React.Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    left: PropTypes.array.isRequired,
    right: PropTypes.array.isRequired,
    labelField: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
  }

  handleChangeCategory(row, event) {
    actions.setCategory({
      row: row,
      value: event.target.value
    })
  }

  renderSelectBox() {

    var data = this.props.right.map(function(element) {
      return element.field
    })

    if (data.length == 0) return

    let handleChangeCategory = this.handleChangeCategory.bind(this)

    var selectBox = this.props.right.map(function(option, index) {
      var categories = store.getCategories()
      if (option.category == null && categories.length > 0) {
        var optionNodes = categories.map(function(opt) {
          return <option
            selected={opt.name == 'GENERAL'}
            key={opt.name}
            value={opt.name}>{opt.name}</option>
        })
      }else if (categories.length > 0) {
        var optionNodes = categories.map(function(opt) {
          return <option
            selected={option.category == opt.name}
            key={opt.name}
            value={opt.name}>{opt.name}</option>
        })
      }

      return (
        <select
          key={index}
          onChange={handleChangeCategory.bind(this, index)}>
          {optionNodes}
        </select>
      )
    })

    return <div>{selectBox}</div>
  }

  render() {

    var data = this.props.right.map(function(element) {
      return element.field
    })

    var left = {
      title: 'A',
      list: this.props.left
    }

    var right = {
      title: 'B',
      list: data
    }

    return (
      <div>
        <DualBox left={left}
          right={right}
          labelField='fieldDisplayName'
          valueField='fieldId'
          callback={this.props.callback} />
          {this.renderSelectBox()}
      </div>
    )
  }

}

export default ExtendedDualBox
