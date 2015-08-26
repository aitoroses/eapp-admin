'use strict'

let path = require('path');
let csp = require('js-csp');

const DATABASE = 'test/test.db'

let Datastore = require('nedb')
let db = new Datastore({ filename: path.resolve(DATABASE) });
db.loadDatabase(main)

function main() {

  let data = require('./items-trace');
  let itemsData = data
    .reduce(function(acc, x) {return acc.concat(x.reply)}, [])
    .filter(function(x) {return typeof x == "object"});

  function* insertion(notification, items, quit) {
    console.log("NEDB data insertion starting")
    while (true) {
      console.log("waiting for item")
      let item = yield csp.take(items);
      console.log("item recieved")
      if (item == null) {
        // Send quit signal
        yield csp.put(quit);
        break
      }
      console.log(`persisting item ${JSON.stringify(item.itemId)}`);
      yield csp.timeout(1000);
      yield csp.put(notification)
    }
  }

  function* takeItems(notification, items) {
    console.log(`Taking ${itemsData.length} items`)
    let i = 0;
    while (true) {
      console.log(`Taking item ${i}`)
      yield csp.timeout(1000);
      yield csp.put(items, itemsData[i])
      yield csp.take(notification);
      i++;
    }
  }

  // Start main goroutine
  csp.go(function* () {

    let quit = csp.chan();
    let itemsChan = csp.chan();
    let notif = csp.chan();

    // Start insertion process
    csp.go(insertion, [notif, itemsChan, quit]);
    csp.go(takeItems, [notif, itemsChan]);

    csp.go(function* () {
      yield csp.timeout(5000)
      yield csp.put(quit);
    });

    // Wait for finish
    yield csp.take(quit);

    // Close channels
    quit.close();
    itemsChan.close();
    notif.close();
  })

}
