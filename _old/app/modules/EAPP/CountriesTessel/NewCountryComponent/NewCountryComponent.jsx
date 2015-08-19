var react = require('angular/react');
var classnames = require('classnames')
import {store, actions} from '../AppState/index';
import validations from '../../validations';

class NewCountryComponent extends React.Component {

    changeNewCountryState(k, v) {
        var e = store.getErrorNewCountry();
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
            var ni = store.getNewCountry();
            var n = new Object();
            Object.keys(ni).forEach(function (key) {
               n[key] = ni[key];
            });
            n[k] = v;
            actions.setNewCountry(n);
        }
        actions.setErrorNewCountry(ne);
    }

    handleSaveCountry() {
        if(!store.getErrorNewCountry().id && !store.getErrorNewCountry().name && !store.getErrorNewCountry().code){
            if(store.getNewCountry().update){
                actions.saveCountry();
            }else{
                actions.saveNewCountry();
            }

        }
    }

    render() {
        return (
            <div className="addForm">
                <span>
                    Country Id: <input type="text" disabled={(store.getNewCountry().update) ? "disabled" : ""} className={(store.getErrorNewCountry().id) ? "error": ""} onChange={(s)=>{this.changeNewCountryState("id", s.target.value)}} value={store.getNewCountry().id} />
                </span>
                <span>
                    Country Code: <input type="text" className={(store.getErrorNewCountry().code) ? "error": ""} onChange={(s)=>{this.changeNewCountryState("code", s.target.value)}} value={store.getNewCountry().code} />
                </span>
                <span>
                    Country Name: <input type="text" className={(store.getErrorNewCountry().name) ? "error": ""} onChange={(s)=>{this.changeNewCountryState("name", s.target.value)}} value={store.getNewCountry().name} />
                </span>
                <button className={'button black-color'} onClick={this.handleSaveCountry}><span className="glyphicon glyphicon-pencil">Save</span></button>
            </div>
        )
    }
}
export default NewCountryComponent;
