var Nocker = require('nocker');

var itemsCollection = require('./mock-db/items')

function delay(res, result, amount) {
  setTimeout(function() {
    res.json(result)
  }, amount)
}

Nocker.register([
  {
    method: 'POST',
    path: '/eappservices/flowstepitem/confitem/selectbyexample', //?firstResult=0&maxResults=10'
    reply(params, query, body) {
      itemsCollection.find(body, function(err, items) {
        var result = query.firstResult ? items.slice(query.firstResult, query.firstResult + query.maxResults) : items
        this.res.json(result)
      }.bind(this));
    }
  }, {
    method: 'POST',
    path: '/eappservices/flowstepitem/confitem/count',
    reply(params, query, body) {
      itemsCollection.find(body, function(err, items) {
        this.res.json(items.length)
      }.bind(this));
    }
  },
  {
    method: 'PUT',
    path: '/eappservices/flowstepitem/confitem/update',
    reply(params, query, body) {
      itemsCollection.update({itemId: body.itemId}, body, function(err, item) {
        if (err) {
          this.res.json(false)
        } else {
          this.res.json(true)
        }
      }.bind(this));
    }
  }
])

Nocker.start({port: 7003}, function() {
  console.log("Listening on port 7003")
})
