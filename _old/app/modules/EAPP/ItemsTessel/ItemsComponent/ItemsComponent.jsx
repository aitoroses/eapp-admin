var classnames = require('classnames');

var TitleComponent = require('../../Utils/TitleComponent/TitleComponent')();
var TableComponent = require('../TableComponent/TableComponent');
var PaginationComponent = require('../PaginationComponent/PaginationComponent');
import state from 'lib/app-state';
import {store, actions} from '../AppState/index';

window.store = store;

class ItemsComponentStateWrapper extends state.Component {

    render() {

        var items = this.state.items;
        if (items) {
            var i = {
                items: store.getItems(),
                dataItems: store.getData(),
                dataPagination: store.getObjectPagination()
            }

            return (
                <ItemsComponent {...i} ></ItemsComponent>
            )
        } else {
            return <span />
        }
    }
}

class ItemsComponent extends React.Component {

    static propTypes = {
        items: React.PropTypes.array.isRequired,
        dataItems: React.PropTypes.array.isRequired,
        dataPagination: React.PropTypes.object.isRequired
    }

  /**
   * On mount
   */
  componentDidMount() {
    console.log("Items Page loaded successfully");
  }


  /**
   * Rendering method
   */
  render() {
        return (
          <div className="container no-padding">
            <TitleComponent title="Items Configuration"></TitleComponent>
            <TableComponent items={this.props.items || []} dataItems={this.props.dataItems}></TableComponent>
            <PaginationComponent data={this.props.dataPagination}></PaginationComponent>
          </div>
        )
  }
}

export default ItemsComponentStateWrapper;
