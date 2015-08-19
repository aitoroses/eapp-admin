var react = require('angular/react');
var classnames = require('classnames');

var tableFactory = function TableComponent(injector, util) {
  var CountriesMixin = require('../../Stores/CountriesMixin');

  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var TableComponent = React.createClass({

    mixins: [CountriesMixin],

    /**
     * Get the initial state for the component
     */
    getInitialState(){
      return {
        countries: [],
        width: 0,
        selectedRow: null,
        empty: false
      }
    },

    /**
     * On mount
     */
    componentDidMount() {
      console.log("Table Component loaded successfully");
      this.countries().actions.setPage(1);
      this.countries().actions.setSearch("");
      this.countries().actions.queryCountries();

      function setWidth() {
        if(this.isMounted()){
          this.setState({
            width: React.findDOMNode(this.refs.countriesContainer).clientWidth -40
          });
        }
      }

      $(window).resize(setWidth.bind(this));
      setWidth.call(this);
    },

    onCountriesFetch() {
        debugger
      console.log("event fetched countries");
      var countries = this.countries().store.getCountries().map(function(t,index){
        var row = [
          index,
          t.countryId,
          t.countryCode,
          t.countryName
        ];
        return row;
      })
      if(countries.length==0 && this.countries().store.getPage()>1){
        this.countries().actions.setPage(this.countries().store.getPage()-1);
        this.countries().actions.queryCountries();
      }else if(countries.length==0){
        console.log("tabla vacia");
        this.setState({
          empty: true
        });
      }else if(countries.length>0){
        this.setState({
          empty: false
        });
      }
      this.setState({
        countries: countries
      });
    },

    handleRowClick(event, index, country){
      console.log("Row seleccionada {" + country + "}");
      this.countries().actions.setCountryId(country[1]);
      this.countries().actions.setCountryCode(country[2]);
      this.countries().actions.setCountryName(country[3]);
      this.setState({
        selectedRow: country
      });
    },

    /*setClass(){
      //var shadowness = this.state.selectedRow ? 'background-color: #FFF3E0!important' : "";
      var shadowness = this.state.selectedRow ? 'shadowness' : "";
      console.log(shadowness);
      return shadowness;
    },*/

    /**
     * Rendering method
     */
    render() {
      return (
        <div ref="countriesContainer" className="row-fluid panel panel-default ng-scope margin-for-table">
          <div width="100%">
            <h1 className="black-color"><span className="glyphicon glyphicon-map-marker marginRight white-color icon-radius"></span>Results</h1>
          </div>
          <div className="margin-for-table">
            <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.countries.length}
              rowHeight={50}
              headerHeight={40}
              onRowClick={this.handleRowClick}
              /*cellClassName={this.setClass()}*/
              rowGetter={function(rowIndex) {return this.state.countries[rowIndex]; }.bind(this)}>
                <Column isResizable={true} dataKey={1} width={100} label="Country Id"/>
                <Column isResizable={true} dataKey={2} width={100} label="Country Code"/>
                <Column isResizable={true} dataKey={3} width={100} flexGrow={1} label="Country Name"/>
            </Table>
          </div>
          {this.state.empty ? "No data to display" : ""}
        </div>
      )
    }
  });

  return TableComponent;

}

module.exports = tableFactory;
