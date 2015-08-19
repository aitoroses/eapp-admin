var react = require('angular/react');
var classnames = require('classnames')
import state from 'lib/app-state';
import {store, actions} from '../AppState/index';
import validations from '../../validations';

class NewItemComponent extends React.Component {

    changeNewItemState(k, v) {
        var e = store.getErrorNewItem();
        var ne = new Object();
        Object.keys(e).forEach(function (key) {
           ne[key] = e[key];
        });
        ne[k] = false;
        if(k == "id" && !validations.number(v)){
            ne[k] = true;
        }else if(!validations.string(v)){
            ne[k] = true;
        }else{
            var ni = store.getNewItem();
            var n = new Object();
            Object.keys(ni).forEach(function (key) {
               n[key] = ni[key];
            });
            n[k] = v;
            actions.setNewItem(n);
        }
        actions.setErrorNewItem(ne);
    }

    handleSaveItem() {
        if(!store.getErrorNewItem().id && !store.getErrorNewItem().name && !store.getErrorNewItem().description){
            if(store.getNewItem().update){
                actions.saveItem();
            }else{
                actions.saveNewItem();
            }

        }
    }

    render() {
        return (
            <div className="addForm">
                <span>
                    Item Id: <input type="text" disabled={(store.getNewItem().update) ? "disabled" : ""} className={(store.getErrorNewItem().id) ? "error": ""} onChange={(s)=>{this.changeNewItemState("id", s.target.value)}} value={store.getNewItem().id} />
                </span>
                <span>
                    Item Name: <input type="text" className={(store.getErrorNewItem().name) ? "error": ""} onChange={(s)=>{this.changeNewItemState("name", s.target.value)}} value={store.getNewItem().name} />
                </span>
                <span>
                    Item Description: <input type="text" className={(store.getErrorNewItem().description) ? "error": ""} onChange={(s)=>{this.changeNewItemState("description", s.target.value)}} value={store.getNewItem().description} />
                </span>
                <button className={'button black-color'} onClick={this.handleSaveItem}><span className="glyphicon glyphicon-pencil">Save</span></button>
            </div>
        )
    }
}
export default NewItemComponent;
