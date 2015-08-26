'use strict'

let db = require('./items-collection');
db.loadDatabase(main)

function main() {

  let data = require('./items-trace');
  let itemsData = data
    .reduce(function(acc, x) {return acc.concat(x.reply)}, [])
    .filter(function(x) {return typeof x == "object"});

  db.insert(itemsData);
}
