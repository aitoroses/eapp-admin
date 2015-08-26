import API from 'core/API';
import TableComponent from './TableComponent';
import swal from 'sweetalert';
import PureComponent from 'react-pure-render/Component'

const {PropTypes: {string, func, number, object, bool}, Component} = React;

class TableController extends Component {

	static propTypes = {
		table: string.isRequired,
		width: number.isRequired
	}

	constructor(props) {
		super();
		var {store,actions} = API[props.table];
		this.store = store;
		this.actions = actions;
	}

	render() {
    return (
      <div>
        <AdminToolHeader>{this.store.getTableName() + " Table Administration"}</AdminToolHeader>
        <GenericTable width={this.props.width} store={this.store} actions={this.actions}></GenericTable>
      </div>

    )
	}
}

class AdminToolHeader extends React.Component {
  render() {
    return (
      <div className="title-margin">
        <div className="title-center panel-body">
          <div>Admin Tool</div>
          <div className="color_grey">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

class GenericTable extends React.Component {

  static propTypes = {
		store: object.isRequired,
    actions: object.isRequired,
		width: number.isRequired

	}

  state = {
    selectedRow:null,
		newRow:null
  }

	onSave(arrayValue, row){
		let config = this.props.store.getDefinition();
		let newObject = config.toObject(arrayValue);
		let action = {
			onServer: true,
			index:row,
			payload: newObject
		}
		this.props.actions.update(action);
	}

	onAddNewRow(){
		if(this.state.selectedRow!=null || this.state.newRow!=null) {
				swal('','You are already editing a row. Please save or discard changes.');
		} else {
			let config = this.props.store.getDefinition();
			let newObj = config.getNew();
			this.props.actions.addNew(newObj);
			setTimeout(function(){
				this.setState({
		      newRow:0,
					selectedRow: 0
	    	})}.bind(this))
		}

	}

	onCancelAddNewRow() {
		this.props.actions.cancelNew();
		setTimeout(function(){
			this.setState({
				selectedRow: null,
				newRow:null
			})}.bind(this))
	}

  onEnterEditMode(row) {
		if(this.state.selectedRow!=null || this.state.newRow!=null) {
				swal('','You are already editing a row. Please save or discard changes.');
		} else {
	    this.setState({
	      selectedRow: row
	    });
		}
  }

	onExitEditMode() {
    this.setState({
      selectedRow: null
    });
  }

	getTransformedData(){
		let config = this.props.store.getDefinition();
		return config.toArray(this.props.store.getAll());
	}

	calculateColumnsWidth(columnsDef) {
    var columnCount =  columnsDef.length +1;
    var singleColumn = (this.props.width)/columnCount;
    var singlePercentage = (singleColumn/this.props.width)*100;
    var withoutLastColumnWidth = (columnCount-1)*singleColumn;
    var lastCol = this.props.width - withoutLastColumnWidth;
    var lastPercentage = (lastCol/this.props.width)*100;
    var columnArray =[];
    for(var i=0;i<columnCount;i++) {
      if(i==(columnCount-1)) columnArray.push({size: lastCol, percentage: lastPercentage})
      else columnArray.push({size: singleColumn, percentage: singlePercentage});
  	}
		return columnArray;
	}

  render() {
    var columnsDef = this.props.store.getFields();
    var data = this.getTransformedData() || [];
		var columnsWidth = this.props.width==0 ? [] : this.calculateColumnsWidth(columnsDef);
		var width = this.props.width || 0;

    return (
      <div style={{marginLeft:'50px', marginTop:'50px'}} >
        <FiltersComponent  store={this.props.store} actions={this.props.actions} width={width}></FiltersComponent>
        <TableComponent columnsWidth={columnsWidth} width={width} data={data} columnsDef={columnsDef} newRow={this.state.newRow} selectedRow={this.state.selectedRow} onEnterEditMode={this.onEnterEditMode} onExitEditMode={this.onExitEditMode} onCancelAddNewRow={this.onCancelAddNewRow} onSave={this.onSave}></TableComponent>
				<FooterComponent  addRowFunc={this.onAddNewRow} width={width}></FooterComponent>
      </div>
    )
  }

}

class FiltersComponent extends React.Component {

	static propTypes = {
		width: number.isRequired,
		store: object.isRequired,
		actions: object.isRequired
	}

	state = {
		loading: true,
		error: false
	}

	handleError(e) {
		debugger
		this.setState({
			loading: false,
			error: true
		})
	}

	handleRefresh() {
		this.setState({
			loading: true
		});
		this.props.actions.fetchCount().then(() => this.setState({ loading: false })).catch(() => this.handleError);
	}

	componentDidMount() {
		this.props.actions.fetchCount().then(() => this.setState({ loading: false })).catch(() => this.handleError);
		let query = {
			payload: {},
			skip: 0,
			limit: this.props.store.getMaxResultsPerPage()
		}
		this.props.actions.fetchByPage(query);
	}

  render() {
		let widthStyle = {width: this.props.width} || {width: '0px'};
		let count = this.props.store.getCount();
		let perPage = this.props.store.getMaxResultsPerPage();
		let actions = this.props.actions;
		let isLoading = this.state.loading;
    return (
			<div className="search-toolbar" style={widthStyle}>
	      <input className="search-input" type="text" ref="searchText"/>
	      <i className="fa fa-search fa-lg" onClick={function(){console.log('filtrando')}}></i>
	      {!isLoading?
					<span className="search-results" onClick={this.handleRefresh}>Items Found: {count}</span> :
	      	<i className="fa fa-spinner fa-lg"></i>
				}
				<PaginationComponent isLoading={isLoading} perPage={perPage} count={count} actions={actions}></PaginationComponent>
      </div>
		)
  }
}

class FooterComponent extends React.Component {

	static propTypes = {
		width: number.isRequired,
		addRowFunc: func
	}

	handleAddRow(){
		this.props.addRowFunc();
	}

  render() {
		var widthStyle = {width: this.props.width} || {width: '0px'};
    return (
			<div className="footer-toolbar" style={widthStyle}>
	      <button onClick={this.handleAddRow}><i className="fa fa-plus"></i> Add</button>
      </div>
		)
  }
}


class PaginationComponent extends PureComponent {

	static propTypes = {
		perPage: number.isRequired,
		count: number,
		actions: object.isRequired,
		isLoading: bool.isRequired
	}



	static styles = {
    selectedPage: {
			backgroundColor: '#565151',
			color: 'white',
			padding: '2px',
			cursor:'pointer',
			fontWeight:'bold'
		},
    unselectedPage: {
			color:'blue',
			textDecoration: 'underline',
			cursor:'pointer'
		},
		marker: {
			color:'blue',
			cursor:'pointer',
			fontSize:'15px'
		}
  }

	constructor(props){
		super(props);

		this.state = {
		  current: 1,
		  perPage: this.props.perPage,
		  count: this.props.count,
		  visible: 5,
		}

		this.state.pageArray = this.getElementArray()
	}

	decreasePage(){
    if(this.state.current ==1) return
    this.setPage(this.state.current-1);
  }

  increasePage(){
    if(this.state.current == this.state.visible) return
    this.setPage(this.state.current+1);
  }

  setPage(p) {
		if(p>0 && p<(this.state.visible+1)){
      this.setState({
        current: p,
        pageArray: this.getElementArray(p)
      })
			//Hacer el fetch para la pagina P
			let query = {
				payload: {},
				skip: (p*this.state.perPage) - this.state.perPage +1,
				limit: this.state.perPage
			}
			this.props.actions.fetchByPage(query)
		}
	}

	getElementArray(p) {
		let current = p || this.state.current;
	  var array = [];
	  for (let i = 0; i < this.state.visible; i++) {
	      array[i] = i + current;
	  }
	  return array;
	}



	render() {

      if(this.state.pageArray.length == 0 || this.props.isLoading) {
        return (<span></span>)
      }
      else {
				var markerStyle = PaginationComponent.styles.marker;
				var selectedStyle = PaginationComponent.styles.selectedPage;
				var unselectedStyle = PaginationComponent.styles.unselectedPage;

        return (
            <span>
              {this.state.current ==1? null: <span style={markerStyle} onClick={this.decreasePage}>&laquo;</span>}&nbsp;
                {this.state.pageArray.map((ele, index) => (
                  <span onClick={this.setPage.bind(this,ele)} key={"page_"+index}><span style={this.state.currentSelectedPage==ele ?  selectedStyle : unselectedStyle}><span >{ele}</span></span>&nbsp;</span>
                ))}
              {this.state.current == this.state.visible ? null: <span style={markerStyle} onClick={this.increasePage}>&raquo;</span>}&nbsp;
            </span>
        )
      }
  }
}


export default TableController;
