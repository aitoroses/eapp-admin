import {actions as FlowActions} from 'actions/FlowsActions'
import {store as FlowStore} from 'stores/FlowsStore'
import Box from 'components/Box'

const PropTypes = React.PropTypes

class FlowStepVarAssign extends React.Component {

  static propTypes = {
    masterFields: PropTypes.object,
    flowfields: PropTypes.object,
    flowfieldsCategories: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  handleChange(item, list1, list2) {
    console.log('cargar tabla de vars')
    console.log('Step Seleccionado: ')
    console.log(item)
  }

  render() {

    var left = {
      list: FlowStore.getStepFromSteps()
    }

    return (
      <div>
        <Box label='AAA'
            options={left.list}
            labelField='stepDescription'
            valueField='stepId'
            onChange={this.handleChange.bind(this)} />
      </div>
    )

  }

}

export default FlowStepVarAssign
