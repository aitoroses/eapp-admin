var classnames = require('classnames');

var TitleComponent = require('../../Utils/TitleComponent/TitleComponent')();
var TableComponent = require('../TableComponent/TableComponent');
var PaginationComponent = require('../PaginationComponent/PaginationComponent');
import state from 'lib/app-state';
import {store, actions} from '../AppState/index';

window.store = store;

class CountriesComponentStateWrapper extends state.Component {

    render() {

        var countries = this.state.countries;
        if (countries) {
            var i = {
                countries: store.getCountries(),
                dataCountries: store.getData(),
                dataPagination: store.getObjectPagination()
            }

            return (
                <CountriesComponent {...i} ></CountriesComponent>
            )
        } else {
            return <span />
        }
    }
}

class CountriesComponent extends React.Component {

    static propTypes = {
        countries: React.PropTypes.array.isRequired,
        dataCountries: React.PropTypes.array.isRequired,
        dataPagination: React.PropTypes.object.isRequired
    }

  /**
   * On mount
   */
  componentDidMount() {
    console.log("Country Page loaded successfully");
  }


  /**
   * Rendering method
   */
  render() {
        return (
          <div className="container no-padding">
            <TitleComponent title="Countries Configuration"></TitleComponent>
            <TableComponent countries={this.props.countries || []} dataCountries={this.props.dataCountries}></TableComponent>
            <PaginationComponent data={this.props.dataPagination}></PaginationComponent>
          </div>
        )
  }
}

export default CountriesComponentStateWrapper;
