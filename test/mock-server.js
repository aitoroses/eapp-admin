var Nocker = require('nocker');

Nocker.register([
  {
    method: 'POST',
    path: '/np5services/countryandta/np5therapeuticalarea/selectbyexample',
    reply() {
      return require('./fixtures/tas');
    }
  }
])

Nocker.start({port: 7003}, function() {
  console.log("Listening on port 7003")
})
