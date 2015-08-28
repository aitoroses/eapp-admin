var Nocker = require('nocker')

var itemsCollection = require('./mock-db/items')
var tasCollection = require('./mock-db/tas')

function delay(res, result, amount) {
  setTimeout(function() {
    res.json(result)
  }, amount)
}

function getRest(collection, pathname, key) {
  return [
    {
      method: 'POST',
      path: '/' + pathname + '/selectbyexample', //?firstResult=0&maxResults=10'
      reply(params, query, body) {
        collection.find(body).sort({[key]: 1}).exec(function(err, items) {
          var result = query.firstResult ? items.slice(query.firstResult, query.firstResult + query.maxResults) : items
          this.res.json(result)
        }.bind(this))
      }
    }, {
      method: 'POST',
      path: '/' + pathname + '/count',
      reply(params, query, body) {
        collection.find(body, function(err, items) {
          this.res.json(items.length)
        }.bind(this))
      }
    },
    {
      method: 'PUT',
      path: '/' + pathname + '/update',
      reply(params, query, body) {
        collection.update({itemId: body.itemId}, body, function(err, item) {
          if (err) {
            this.res.json(false)
          } else {
            this.res.json(true)
          }
        }.bind(this))
      }
    },
    {
      method: 'POST',
      path: '/' + pathname + '/insert',
      reply(params, query, body) {
        collection.insert(body, function(err, item) {
          if (err) {
            this.res.status(500).json(false)
          } else {
            this.res.json(true)
          }
        }.bind(this))
      }
    }
  ]
}

Nocker.register(getRest(itemsCollection, 'eappservices/flowstepitem/confitem', 'itemId'))
Nocker.register(getRest(tasCollection, 'np5services/countryandta/np5therapeuticalarea', 'taId'))

Nocker.start({port: 7003}, function() {
  console.log('Listening on port 7003')
})
