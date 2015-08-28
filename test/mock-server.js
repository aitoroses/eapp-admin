var Nocker = require('nocker')

var itemsCollection = require('./mock-db/items')
var tasCollection = require('./mock-db/tas')

function delay(res, result, amount) {
  setTimeout(function() {
    res.json(result)
  }, amount)
}

function getRest(collection, pathname, key) {

  function filter(items, record) {
    var result = items
    var searchKeys = Object.keys(record).filter(function(k) {
      return k != null
    })

    if (searchKeys.length > 0) {
      result = result.filter(function(item) {
        var anyMatch = searchKeys
          .map(function(k) {
            return (new RegExp(record[k])).test(item[k])
          })
          .filter(function(c) {
            return c == true
          })

        return anyMatch.length > 0
      })
    }

    return result
  }

  return [
    {
      method: 'POST',
      path: '/' + pathname + '/selectbyexample', //?firstResult=0&maxResults=10'
      reply(params, query, body) {
        collection.find({}).sort({[key]: 1}).exec(function(err, items) {
          var result = filter(items, body)
          result = query.firstResult ?
            result.slice(query.firstResult, query.firstResult + query.maxResults) :
            result
          this.res.json(result)
        }.bind(this))
      }
    }, {
      method: 'POST',
      path: '/' + pathname + '/count',
      reply(params, query, body) {
        collection.find({}, function(err, items) {
          var result = filter(items, body)
          this.res.json(result.length)
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
