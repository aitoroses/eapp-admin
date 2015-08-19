var react = require('angular/react');
var classnames = require('classnames');

var PaginationFactory = function PaginationComponent(injector, util) {
	var ItemsPermissionMixin = require('../../Stores/ItemsPermissionMixin');

	var PaginationComponent = React.createClass({

		mixins: [ItemsPermissionMixin],

		/**
		 * On mount
		 */
		componentDidMount() {
			console.log("Pagination Component loaded successfully");
			this.ItemsPermission().actions.queryItemsPermissionCount();
		},

		/**
	     * Get the initial state for the component
	     */
	    getInitialState(){
	      return {
	        page: 1,
	        maximumPages: this.ItemsPermission().store.getMaxPages(),
	        dataLength: null,
	        maxPageArr: null,
	        maxPage: null,
	        showPaginator: true
	      }
	    },

	    onItemsPermissionLengthFetch(){
	    	console.log("event count fetched Items Permission");
	    	var arr = this.createButtons(this.ItemsPermission().store.getItemsPermissionCount(),this.ItemsPermission().store.getTotalRows());
	    	this.setState({
	    		dataLength: this.ItemsPermission().store.getItemsPermissionCount(),
	    		maxPageArr: arr
	    	});
	    },

	    createButtons(dataLength,rows) {
			var maxPage;
	        if(dataLength>0){
	            if(dataLength % rows > 0){
	                maxPage = Math.floor(dataLength / rows) + 1;
	            }else{
	                maxPage = dataLength / rows;
	            }
	            return this.updateButtons(maxPage, this.state.page);
	        }else{
	        	this.setState({
	    			showPaginator: false
	    		});
	        }
	    },

	    updateButtons(maxPage, page) {
	    	if(maxPage<2){
	    		this.setState({
	    			showPaginator: false
	    		});
	    	}else{
	    		this.setState({
	    			showPaginator: true
	    		});
	    	}
	        var maxPageArr = [];
	        if(this.state.maximumPages % 2 == 0){
	        	var buttons_down = this.state.maximumPages / 2 - 1;
	        	var buttons_up = this.state.maximumPages / 2;
	        }else{
	        	var buttons_down = Math.floor(this.state.maximumPages/2);
	        	var buttons_up = Math.floor(this.state.maximumPages/2);
	        }

	        // Less pages than the maximum number of pages
	        if(maxPage <= this.state.maximumPages){
	            for (var i = 1; i <= maxPage; i++) {
	                maxPageArr[maxPageArr.length]=i;
	            };
	        }else{
	            var down_balance = page-buttons_down;
	            var up_balance = page+buttons_up;
	            var flag = false;

	            // First n pages
	            if(down_balance<1){
	                for (var i = 1; i <= this.state.maximumPages; i++) {
	                    maxPageArr[maxPageArr.length]=i;
	                };
	                flag=true;
	            }

	            // Last n pages
	            if(up_balance>=maxPage){
	                for (var i = maxPage-this.state.maximumPages+1; i <= maxPage; i++) {
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
	        this.setState({
	        	maxPage: maxPage
	        });
	        return maxPageArr;
	    },

		handleCreateRequest1() {
	      console.log("1");
	      this.setState({
	      	page: 1
	      });
	    },

	    handleCreateRequest2() {
	      console.log("2");
	      this.setState({
	      	page: 2
	      });
	    },

	    handleCreateRequest3() {
	      console.log("3");
	      this.setState({
	      	page: 3
	      });
	    },

	    setPage(p){
	    	console.log("p-->"+p);
	    	if(p>0 && p<this.state.maxPage+1){
	    		this.ItemsPermission().actions.setPage(p);
	    		this.ItemsPermission().actions.queryItemsPermission();
	    		this.onItemsPermissionLengthFetch();
	    		this.setState({
	    			page: p
	    		});
	    	}
	    },

		/**
		 * Rendering method
		 */
		 render() {
		 	var back_button = classnames({"disabled":this.state.page==1});
		 	var forth_button = classnames({"disabled":this.state.page==this.state.maxPage});
		 	return (
		 		<div className="pagination-centered">
		 		{ this.state.showPaginator ? <ul className="pagination">
		            	<li className={back_button}><a onClick={this.setPage.bind(this, this.state.page-1)}>&laquo;</a></li>
		            	{this.state.maxPageArr ? this.state.maxPageArr.map(function(view) {
		            		return <li key={view} className={this.state.page==view ? 'active' : ''}><a onClick={this.setPage.bind(this, view)}>{view}</a></li>
		            	}.bind(this)) : ""}
		            	
		            	<li className={forth_button}><a onClick={this.setPage.bind(this, this.state.page+1)}>&raquo;</a></li>
		            </ul> : null }
		        </div>
		 	)
		 }
	});

	return PaginationComponent;

}

module.exports = PaginationFactory;