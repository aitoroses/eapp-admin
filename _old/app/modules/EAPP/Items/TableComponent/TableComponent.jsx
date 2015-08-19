var react = require('angular/react');
var classnames = require('classnames');

var tableFactory = function TableComponent(injector, util) {
  var ItemsMixin = require('../../Stores/ItemsMixin');

  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var TableComponent = React.createClass({

    mixins: [ItemsMixin],

    /**
     * Get the initial state for the component
     */
    getInitialState(){
      return {
        items: [],
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
      this.items().actions.setPage(1);
      this.items().actions.setSearch("");
      this.items().actions.queryItems();

      function setWidth() {
        if(this.isMounted()){
          this.setState({
            width: React.findDOMNode(this.refs.itemsContainer).clientWidth -40
          });
        }
      }

      $(window).resize(setWidth.bind(this));
      setWidth.call(this);
    },

    onItemsFetch() {
      console.log("event fetched items");
      var items = this.items().store.getItems().map(function(t,index){
        var row = [
          index,
          t.itemId,
          t.itemName,
          t.itemDescription
        ];
        return row;
      })
      if(items.length==0 && this.items().store.getPage()>1){
        this.items().actions.setPage(this.items().store.getPage()-1);
        this.items().actions.queryItems();
      }else if(items.length==0){
        this.setState({
          empty: true
        });
      }else if(items.length>0){
         this.setState({
          empty: false
        });
      }
      this.setState({
        items: items
      });
    },

    handleRowClick(event, index, item){
      console.log("Row seleccionada {" + item + "}");
      this.items().actions.setItemId(item[1]);
      this.items().actions.setItemName(item[2]);
      this.items().actions.setItemDescription(item[3]);
      this.setState({
        selectedRow: item
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
        <div ref="itemsContainer" className="row-fluid panel panel-default ng-scope margin-for-table">
          <div width="100%">
            <h1 className="black-color"><span className="glyphicon glyphicon-align-left marginRight white-color icon-radius"></span>Results</h1>
          </div>
          <div className="margin-for-table">
            <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.items.length}
              rowHeight={50}
              headerHeight={40}
              onRowClick={this.handleRowClick}
              /*cellClassName={this.setClass()}*/
              rowGetter={function(rowIndex) {return this.state.items[rowIndex]; }.bind(this)}>
                <Column isResizable={true} dataKey={1} width={100} label="Item Id"/>
                <Column isResizable={true} dataKey={2} width={200} label="Item Name"/>
                <Column isResizable={true} dataKey={3} width={100} flexGrow={1} label="Item Description"/>
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
