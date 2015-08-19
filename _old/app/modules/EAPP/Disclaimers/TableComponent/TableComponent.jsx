var react = require('angular/react');
var classnames = require('classnames');

var tableFactory = function TableComponent(injector, util) {
  var DisclaimersMixin = require('../../Stores/DisclaimersMixin');

  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var TableComponent = React.createClass({

    mixins: [DisclaimersMixin],

    /**
     * Get the initial state for the component
     */
    getInitialState(){
      return {
        disclaimers: [],
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
      this.disclaimers().actions.setPage(1);
      this.disclaimers().actions.queryDisclaimers();

      function setWidth() {
        if(this.isMounted()){
          this.setState({
            width: React.findDOMNode(this.refs.disclaimersContainer).clientWidth - 40
          });
        }
      }

      $(window).resize(setWidth.bind(this));
      setWidth.call(this);
    },

    onDisclaimersFetch() {
      console.log("event fetched disclaimers");
      var disclaimers = this.disclaimers().store.getDisclaimers().map(function(t,index){
        var row = [
          index,
          t.itemId,
          t.organizationalUnit,
          t.disclaimer
        ];
        return row;
      })
      if(disclaimers.length==0 && this.disclaimers().store.getPage()>1){
        this.disclaimers().actions.setPage(this.disclaimers().store.getPage()-1);
        this.disclaimers().actions.queryDisclaimers();
      }else if(disclaimers.length==0){
        this.setState({
          empty: true
        });
      }else if(disclaimers.length>0){
        this.setState({
          empty: false
        });
      }
      this.setState({
        disclaimers: disclaimers
      });
    },

    handleRowClick(event, index, disclaimer){
      console.log("Row seleccionada {" + disclaimer + "}");
      this.disclaimers().actions.setItemId(disclaimer[1]);
      this.disclaimers().actions.setOu(disclaimer[2]);
      this.disclaimers().actions.setDisclaimer(disclaimer[3]);
      this.disclaimers().actions.setSelectedRow(disclaimer);
      this.setState({
        selectedRow: disclaimer
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
        <div ref="disclaimersContainer" className="row-fluid panel panel-default ng-scope margin-for-table">
          <div width="100%">
            <h1 className="black-color"><span className="glyphicon glyphicon-ok-circle marginRight white-color icon-radius"></span>Results</h1>
          </div>
          <div className="margin-for-table">
            <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.disclaimers.length}
              rowHeight={50}
              headerHeight={40}
              onRowClick={this.handleRowClick}
              /*cellClassName={this.setClass()}*/
              rowGetter={function(rowIndex) {return this.state.disclaimers[rowIndex]; }.bind(this)}>
                <Column isResizable={true} dataKey={1} width={100} label="Item Id"/>
                <Column isResizable={true} dataKey={2} width={100} label="Organizational Unit"/>
                <Column isResizable={true} dataKey={3} width={100} flexGrow={1} label="Disclaimer"/>
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
