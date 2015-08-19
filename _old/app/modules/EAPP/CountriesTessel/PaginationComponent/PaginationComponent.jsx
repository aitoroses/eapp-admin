var react = require('angular/react');
var cx = require('classnames')
import {store, actions} from '../AppState/index';

window.ItemsStore = store;
window.ItemsActions = actions;

class PaginationComponent extends React.Component {

    static propTypes = {
        data: React.PropTypes.object.isRequired,
    }

    /**
     * On mount
     */
    componentDidMount() {
        console.log("Pagination Component loaded successfully");
        actions.queryCountriesCount();
    }

    componentWillReceiveProps(nextProps) {
        if(store.getMaxPageArr() == null && store.getLoadPagination()){
            actions.queryCountries();
            this.onCountriesLengthFetch(nextProps);
            actions.setLoadPagination(false);
        }
    }

    onCountriesLengthFetch(nextProps){

        console.log("event count fetched items - pagination");
        var arr = this.createButtons(nextProps.data.countriesLength, store.getTotalRows());
        actions.setDataLength(nextProps.data.countriesLength);
        actions.setMaxPageArr(arr);
    }
    createButtons(dataLength,rows) {
        var maxPage;
        if(dataLength>0){
            if(dataLength % rows > 0){
                maxPage = Math.floor(dataLength / rows) + 1;
            }else{
                maxPage = dataLength / rows;
            }
            return this.updateButtons(maxPage, this.props.data.page);
        }else{
            actions.setShowPaginator(false);
        }
    }

    updateButtons(maxPage, page) {
        if (maxPage<2){
            actions.setShowPaginator(false);
        }else{
            actions.setShowPaginator(true);
        }
        var maxPageArr = [];
        if(this.props.data.maximumPages % 2 == 0){
            var buttons_down = this.props.data.maximumPages / 2 - 1;
            var buttons_up = this.props.data.maximumPages / 2;
        }else{
            var buttons_down = Math.floor(this.props.data.maximumPages/2);
            var buttons_up = Math.floor(this.props.data.maximumPages/2);
        }

        // Less pages than the maximum number of pages
        if(maxPage <= this.props.data.maximumPages){
            for (var i = 1; i <= maxPage; i++) {
                maxPageArr[maxPageArr.length]=i;
            };
        }else{
            var down_balance = page-buttons_down;
            var up_balance = page+buttons_up;
            var flag = false;

            // First n pages
            if(down_balance<1){
                for (var i = 1; i <= this.props.data.maximumPages; i++) {
                    maxPageArr[maxPageArr.length]=i;
                };
                flag=true;
            }

            // Last n pages
            if(up_balance>=maxPage){
                for (var i = maxPage-this.props.data.maximumPages+1; i <= maxPage; i++) {
                    maxPageArr[maxPageArr.length]=i;
                };
                flag=true;
            }

            // Intermediate n pages
            if(flag==false){
                for (var i = down_balance; i <= up_balance; i++) {
                    maxPageArr[maxPageArr.length]=i;
                };
            }
        }
        actions.setMaxPage(maxPage);
        return maxPageArr;
    }

    setPage(p){
        console.log("p-->"+p);
        if(p>0 && p<this.props.data.maxPage+1){
            actions.setLoadPagination(true);
            actions.setPage(p);
            actions.queryCountries();
        }
    }

    render() {
        var back_button = cx({"disabled": this.props.data.page==1});
        var forth_button = cx({"disabled":this.props.data.page==this.props.data.maxPage});
        return (
	 		<div className="pagination-centered">
	 		 {
                 this.props.data.showPaginator ?
                 <ul className="pagination">
	            	<li className={back_button}><a onClick={this.setPage.bind(this, this.props.data.page-1)}>&laquo;</a></li>
	            	{
                        this.props.data.maxPageArr ? this.props.data.maxPageArr.map(function(view) {
    	            		return <li key={view} className={this.props.data.page==view ? 'active' : ''}><a onClick={this.setPage.bind(this, view)}>{view}</a></li>
    	            	}.bind(this)) : ""
                    }
	            	<li className={forth_button}><a onClick={this.setPage.bind(this, this.props.data.page+1)}>&raquo;</a></li>
	             </ul> : null
            }
	        </div>
        );
    }
}

export default PaginationComponent;
