import Tessel from 'tessel-js'

var atom = new Tessel()

// Tessel.autorun(() => {
//   console.log(atom.get())
// })

Object.defineProperty(window, 'state', {get: () => atom.get() })
Object.defineProperty(window, 'atom', {get: () => atom })

export default atom
