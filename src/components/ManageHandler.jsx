import atom from 'lib/state'
import TableController from './TableController'
import DomSize from './DomSize'
import API from 'core/API'

class ManageHandler extends React.Component {
  render() {
    return (
      <DomSize>
        {({width}) =>
          <TableController
            api={API}
            width={width - 100 /* because of CSS margins */}
            table={this.props.params.table} />
        }
      </DomSize>
    )
  }
}

export default ManageHandler
