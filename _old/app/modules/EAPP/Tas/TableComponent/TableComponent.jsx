var react = require('angular/react');
var classnames = require('classnames');

var tableFactory = function TableComponent(injector, util) {
  var TasMixin = require('../../Stores/TasMixin');
  var CheckBoxComponent = require('../../Utils/CheckBoxComponent/CheckBoxComponent')(injector,util);

  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var TableComponent = React.createClass({

    mixins: [TasMixin],

    /**
     * Get the initial state for the component
     */
    getInitialState(){
      return {
        tas: [],
        width: 0,
        selectedRow: null,
        selectedValues: [],
        empty: false
      }
    },

    /**
     * On mount
     */
    componentDidMount() {
      console.log("Table Component loaded successfully");
      this.tas().actions.setPage(1);
      this.tas().actions.setSearch("");
      this.tas().actions.queryTas();

      function setWidth() {
        if(this.isMounted()){
          this.setState({
            width: React.findDOMNode(this.refs.tasContainer).clientWidth -40
          });
        }
      }

      $(window).resize(setWidth.bind(this));
      setWidth.call(this);
    },

    onTasFetch() {
      console.log("event fetched tas");
      var tas = this.tas().store.getTas().map(function(t,index){
        var row = [
          index,
          t.taId,
          t.taName,
          t.country,
          t.division,
          t.organizationalUnit,
          t.isBu,
          t.isBf
        ];
        return row;
      })
      if(tas.length==0 && this.tas().store.getPage()>1){
        this.tas().actions.setPage(this.tas().store.getPage()-1);
        this.tas().actions.queryTas();
      }else if(tas.length==0){
        this.setState({
          empty: true
        });
      }else if(tas.length>0){
        this.setState({
          empty: false
        });
      }
      this.setState({
        tas: tas
      });
    },

    handleRowClick(event, index, ta){
      console.log("Row seleccionada {" + ta + "}");
      this.tas().actions.setTaId(ta[1]);
      this.tas().actions.setTaName(ta[2]);
      this.tas().actions.setCountry(ta[3]);
      this.tas().actions.setDivision(ta[4]);
      this.tas().actions.setOu(ta[5]);
      this.tas().actions.setIsBu(ta[6]);
      this.tas().actions.setIsBf(ta[7]);
      this.setState({
        selectedRow: ta
      });
    },

    /*setClass(){
      //var shadowness = this.state.selectedRow ? 'background-color: #FFF3E0!important' : "";
      var shadowness = this.state.selectedRow ? 'shadowness' : "";
      console.log(shadowness);
      return shadowness;
    },*/

    getRenderer(value, column, colData, row){
      var selectedValue;
      (value==1) ? selectedValue=true : selectedValue=false;
      return React.addons.createFragment({
        cellData: <CheckBoxComponent selected={selectedValue}/>
      })
    },

    cambio(){
      console.log("cambio");
    },

    /**
     * Rendering method
     */
    render() {
      return (
        <div ref="tasContainer" className="row-fluid panel panel-default ng-scope margin-for-table">
          <div width="100%">
            <h1 className="black-color"><span className="glyphicon glyphicon-th marginRight white-color icon-radius"></span>Results</h1>
          </div>
          <div className="margin-for-table">
            <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.tas.length}
              rowHeight={50}
              headerHeight={40}
              onRowClick={this.handleRowClick}
              /*cellClassName={this.setClass()}*/
              rowGetter={function(rowIndex) {return this.state.tas[rowIndex]; }.bind(this)}>
                <Column isResizable={true} dataKey={1} width={100} label="Ta Id"/>
                <Column isResizable={true} dataKey={2} width={100} label="Ta Name"/>
                <Column isResizable={true} dataKey={3} width={100} label="Country"/>
                <Column isResizable={true} dataKey={4} width={100} label="Division"/>
                <Column isResizable={true} dataKey={5} width={100} flexGrow={1} label="Organizational Unit"/>
                <Column isResizable={true} dataKey={6} width={100} cellRenderer={this.getRenderer} label="Is Bu"/>
                <Column isResizable={true} dataKey={7} width={100} cellRenderer={this.getRenderer} label="Is Bf"/>
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
