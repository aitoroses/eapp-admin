let XDomain = global.XMLHttpRequest;
let reqTrack = { reqs: [],
	getForMatch(match) {
		return this.reqs
			.filter(r => r.url.match(match))
	},
	getNockerRoutes(a) {
		return this.getForMatch(a)
			.map(r => { return {
					method: r.method,
					path: '/' + r.url.split("//")[1].split("/").slice(1).join("/"),
					reply: r.getResponse()
			 }
			})
	}
}

export function trace() {
  return reqTrack;
}

export function patchXMLHttpRequest(window) {
  window.XMLHttpRequest = function() {
  	let xhr = XDomain();
  	let track = {xhr}
    let open = xhr.open;
  	let send = xhr.send;
  	xhr.open = (...args) => {
  		open.apply(xhr, args)

  		track.method = args[0]
  		track.url = args[1]
  		track.getResponse = function() {
  			try {
  				return JSON.parse(this.xhr.responseText)
  			} catch (e) {
  				return this.xhr.responseText;
  			}
  		}

  		reqTrack.reqs.push(track)
  	}
  	return xhr;
  }
}
