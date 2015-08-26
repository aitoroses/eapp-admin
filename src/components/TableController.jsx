import API from 'core/API';
import {getNew, toObject, toArray} from 'config/tables';
import TableComponent from './TableComponent';
import swal from 'sweetalert';
import PureComponent from 'react-pure-render/Component'
import {getElementArray, PaginationNumber, PaginationDecrease, PaginationIncrease} from 'lib/paginationUtils';

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
		let newObject = toObject.call(config, arrayValue);
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
			let newObj = getNew.call(config);
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
		return toArray.call(config, this.props.store.getAll());
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
		var perPage = this.props.store.getMaxResultsPerPage();
    return (
      <div style={{marginLeft:'50px', marginTop:'50px'}} >
        <FiltersComponent  store={this.props.store} actions={this.props.actions} width={width}></FiltersComponent>
        <TableComponent columnsWidth={columnsWidth} width={width} data={data} columnsDef={columnsDef} newRow={this.state.newRow} selectedRow={this.state.selectedRow} onEnterEditMode={this.onEnterEditMode} onExitEditMode={this.onExitEditMode} onCancelAddNewRow={this.onCancelAddNewRow} onSave={this.onSave}></TableComponent>
				<FooterComponent  perPage={perPage} addRowFunc={this.onAddNewRow} width={width}></FooterComponent>
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
		let count = this.props.store.getCount() || 0;
		let perPage = this.props.store.getMaxResultsPerPage();
		let actions = this.props.actions;
		let isLoading = this.state.loading;
		let isError = this.state.error;
    return (
			<div className="search-toolbar" style={widthStyle}>
	      <input className="search-input" type="text" ref="searchText"/>
	      <i className="fa fa-search fa-lg" onClick={function(){console.log('filtrando')}}></i>
	      {!isLoading?
					<span className="search-results" onClick={this.handleRefresh}>Items Found: {count}</span> :
	      	<i className="fa fa-spinner fa-lg"></i>
				}
				<PaginationComponent isError={isError} isLoading={isLoading} perPage={perPage} visible={5} count={count} actions={actions}></PaginationComponent>
      </div>
		)
  }
}

class FooterComponent extends React.Component {

	static propTypes = {
		width: number.isRequired,
		addRowFunc: func,
		perPage: number
	}

	handleAddRow(){
		this.props.addRowFunc();
	}

  render() {
		var widthStyle = {width: this.props.width} || {width: '0px'};
		var itemsCount = this.props.perPage || '...';
    return (
			<div className="footer-toolbar" style={widthStyle}>
				<div style={{float:'left'}}>Items per Page: {itemsCount}</div>
	      <div style={{float:'right'}}><button onClick={this.handleAddRow}><i className="fa fa-plus"></i> Add</button></div>
      </div>
		)
  }
}


class PaginationComponent extends PureComponent {

	static propTypes = {
		perPage: number.isRequired,
		count: number,
		actions: object.isRequired,
		isLoading: bool.isRequired,
		isError: bool.isRequired
	}

	static contextTypes = {
		router: func.isRequired
	}

	constructor(props){
		super(props);
		this.state = {
		  current: 1
		}

		this.state.pageArray = this.getElementArray()
	}

	getElementArray(more) {
		return getElementArray({...this.state, ...this.props, ...more});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.count!=this.props.count){
			this.setState({
				pageArray: this.getElementArray(nextProps)
			})
		}
	}

  setPage(p) {
		let page = (
			p.target.innerText == "<" ? (this.state.current -1):
		  p.target.innerText == ">" ? (this.state.current +1): parseInt(p.target.innerText)
		)
		if(page>0 && page<(this.props.visible+1)){
			let auxState = {...this.state};
			auxState.current = page;
      this.setState({
        current: page
      })
			//Hacer el fetch para la pagina P
			let query = {
				payload: {},
				skip: (page*this.props.perPage) - this.props.perPage,
				limit: this.props.perPage
			}
			this.props.actions.fetchByPage(query).then(() => {
				this.setState({
					pageArray: this.getElementArray()
				})
			})
		}
	}

	render() {

      if(this.state.pageArray.length == 0 || this.props.isLoading || this.props.isError) {
        return (<div></div>)
      }
      else {
				let onClick = this.setPage;
				let current = this.state.current;
				let pageArray = this.state.pageArray;
				return renderPagination(pageArray, current, onClick);
      }
  }
}

class PaginationLayoutView extends React.Component {
	static style = {
		float: 'right',
		marginTop: '8px'
	}
	render() {
		return (
			<div style={PaginationLayoutView.style}>
				{this.props.children}
			</div>
		)
	}
}


class PaginationNumberView extends React.Component {

	static styles = {
    selectedPage: {
			backgroundColor: '#565151',
			color: 'white',
			cursor:'pointer',
			fontWeight:'bold',
			padding: '5px 5px 5px 5px',
			border: '1px solid #C5C3C3',
			borderRadius: '2px'
		},
    unselectedPage: {
			color:'blue',
			textDecoration: 'underline',
			cursor:'pointer',
			padding: '5px 5px 5px 5px',
			border: '1px solid #C5C3C3',
			borderRadius: '2px'
		}
	}
	render() {
		let style = this.props.active ? PaginationNumberView.styles.selectedPage : PaginationNumberView.styles.unselectedPage;
		return (<span onClick={this.props.onClick} style={style}>{this.props.value}</span>)
	}
}

class PaginationIncreaseView extends React.Component {
	static style = {
		color:'blue',
		cursor:'pointer',
		fontSize:'11px',
		padding: '5px 5px 5px 5px',
		border: '1px solid #C5C3C3',
		borderRadius: '2px'
	}
	render() {
		let style = PaginationIncreaseView.style
		return (<span onClick={this.props.onClick} style={style}>{this.props.value}</span>)
	}
}

class PaginationDecreaseView extends React.Component {
	static style = {
		color:'blue',
		cursor:'pointer',
		fontSize:'11px',
		padding: '5px 5px 5px 5px',
		border: '1px solid #C5C3C3',
		borderRadius: '2px'
	}
	render() {
		let style = PaginationDecreaseView.style
		return (<span onClick={this.props.onClick} style={style}>{this.props.value}</span>)
	}
}

function renderPagination(pageArray, current, onClick) {
	function mapToComponent(el, index) {
		return (
			el instanceof PaginationNumber ?   <PaginationNumberView key={'number_'+index} onClick={onClick} active={(current==el._value)} value={el._value}/> :
			el instanceof PaginationDecrease ? <PaginationDecreaseView key={'decrease_'+index} onClick={onClick} value={el._value}/>:
		  el instanceof PaginationIncrease ? <PaginationIncreaseView key={'increase_'+index} onClick={onClick} value={el._value}/ > : <div className="no-element"></div>
		)
	}

	function hasIncreaseElement(array){
		let res = false;
		array.forEach((el) => {
			if(el instanceof PaginationIncrease){
				res=true;
			}
		})
		return res
	}

	return (
		<PaginationLayoutView>
		  {pageArray.map(mapToComponent)}
			{hasIncreaseElement(pageArray) ? null: <div style={{width:'20px', display:'inline-block'}}>{' '}</div>}
		</PaginationLayoutView>
	)
}

export default TableController;
