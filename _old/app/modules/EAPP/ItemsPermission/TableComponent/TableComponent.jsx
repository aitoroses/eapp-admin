var react = require('angular/react');
var classnames = require('classnames');

var tableFactory = function TableComponent(injector, util) {
  var ItemsPermissionMixin = require('../../Stores/ItemsPermissionMixin');
  var CheckBoxComponent = require('../../Utils/CheckBoxComponent/CheckBoxComponent')(injector,util);

  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var TableComponent = React.createClass({

    mixins: [ItemsPermissionMixin],

    /**
     * Get the initial state for the component
     */
    getInitialState(){
      return {
        itemsPermission: [],
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
      this.ItemsPermission().actions.setPage(1);
      this.ItemsPermission().actions.setSearch("");
      this.ItemsPermission().actions.queryItemsPermission();

      function setWidth() {
        if(this.isMounted()){
          this.setState({
            width: React.findDOMNode(this.refs.itemsPermissionContainer).clientWidth - 40
          });
        }
      }

      $(window).resize(setWidth.bind(this));
      setWidth.call(this);
    },

    onItemsPermissionFetch() {
      console.log("event fetched items permission");
      var itemsPermission = this.ItemsPermission().store.getItemsPermission().map(function(t,index){
        var row = [
          index,
          t.itemId,
          t.itemName,
          t.country,
          t.division,
          t.ou,
          t.businessRole,
          t.isForMedical,
          t.isForMarketing,
          t.isForSales,
          t.everybody
        ];
        return row;
      })
      if(itemsPermission.length==0){
        this.setState({
          empty: true
        });
      }else if(itemsPermission.length>0){
        this.setState({
          empty: false
        });
      }
      this.setState({
        itemsPermission: itemsPermission
      });
    },

    handleRowClick(event, index, item){
      console.log("Row seleccionada {" + item + "}");
      this.ItemsPermission().actions.setItemId(item[1]);
      this.ItemsPermission().actions.setItemName(item[2]);
      this.ItemsPermission().actions.setCountry(item[3]);
      this.ItemsPermission().actions.setDivision(item[4]);
      this.ItemsPermission().actions.setOu(item[5]);
      this.ItemsPermission().actions.setBusinessRole(item[6]);
      this.ItemsPermission().actions.setIsForMedical(item[7]);
      this.ItemsPermission().actions.setIsForMarketing(item[8]);
      this.ItemsPermission().actions.setIsForSales(item[9]);
      this.ItemsPermission().actions.setEverybody(item[10]);
      this.ItemsPermission().actions.setSelectedRow(item);
      this.setState({
        selectedRow: item
      });
    },

    updateData(){
      console.log("elemento actualizado tabla");
      this.ItemsPermission().actions.setSelectedRow(null);
      this.ItemsPermission().actions.queryItemsPermission();
      this.setState({
        selectedRow: null
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

    /*getRenderer(value, column, colData, row){
      var selectedValue;
      (value==1) ? selectedValue=true : selectedValue=false;

      return <CheckBoxComponent selected={selectedValue}/>
    },*/

    /**
     * Rendering method
     */
    render() {
      return (
        <div ref="itemsPermissionContainer" className="row-fluid panel panel-default ng-scope margin-for-table">
          <div width="100%">
            <h1 className="black-color"><span className="glyphicon glyphicon-th-list marginRight white-color icon-radius"></span>Results</h1>
          </div>
          <div className="margin-for-table">
            <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.itemsPermission.length}
              rowHeight={50}
              headerHeight={40}
              onRowClick={this.handleRowClick}
              /*cellClassName={this.setClass()}*/
              rowGetter={function(rowIndex) {return this.state.itemsPermission[rowIndex]; }.bind(this)}>
                <Column isResizable={true} dataKey={2} width={100} label="Item"/>
                <Column isResizable={true} dataKey={3} width={100} label="Country"/>
                <Column isResizable={true} dataKey={4} width={100} label="Division"/>
                <Column isResizable={true} dataKey={5} width={100} label="Ou"/>
                <Column isResizable={true} dataKey={6} width={100} flexGrow={1} label="Business Role"/>
                <Column isResizable={true} cellRenderer={this.getRenderer} dataKey={7} width={100} label="Is For Medical"/>
                <Column isResizable={true} cellRenderer={this.getRenderer} dataKey={8} width={100} label="Is For Marketing"/>
                <Column isResizable={true} cellRenderer={this.getRenderer} dataKey={9} width={100} label="Is For Sales"/>
                <Column isResizable={true} cellRenderer={this.getRenderer} dataKey={10} width={100} label="Everybody"/>
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
