// Import the annotations
import {
  NgStore,
  NgActions,
  Register
} from 'annotations';

// Cookies from uncompresion
import {Cookies} from 'cookies';

/* Menu Actions */

@NgActions({
  module: 'EAPP'
})
function Menu() {
  return {
    setActive: "ADMIN_SET_ACTIVE",
    go: "ADMIN_GO_ACTION"
  };
}

/**
 * Menu Store
 */
@NgStore({
  module: 'EAPP',
  inject: ['MenuDomain', 'AppState', '$location']
})
function MenuStore() {
  var handlers = this.MenuDomain.handlers;
  var debug = this.debug('TasStore');
  var $location = this.$location;
  var AppState = this.AppState;

  // Initial app state
  var state = this.AppState.state.menu = {};
  state.active = [];

  return {

    handlers: handlers,

    setActive: function(act) {
      var indexpos = state.active.indexOf(act);
      if(indexpos<0){
        state.active[state.active.length]=act;
      }else{
        state.active.splice(indexpos,1);
      }
      //console.log("setActive: --> "+state.active);
      debug("active was updated");
      this.emit('menu.active.updated');
    },

    go: function(url){
      window.location.href = '#/' + url;
      debug("go was executed");
      this.emit('menu.go.executed');
    },

    // Public API
    exports: {
      getActive: function() {
        return state.active;
      }
    }
  }
}
Register(MenuStore)
Register(Menu)
