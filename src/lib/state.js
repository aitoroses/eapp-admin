import Tessel from 'tessel-js';

var atom = new Tessel();

Object.defineProperty(window, 'atom', {get: () => atom.get() })

export default atom;
