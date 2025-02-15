export default class {
	#lock
	#queue = []
	push(resource, options) {
		const {promise, resolve} = Promise.withResolvers()
		this.#queue.push([resolve, resource, options])
		if (!this.#lock)
			this.#next(this.#lock = true)
		return promise
	}
	#next() {
		if (this.#queue.length === 0)
			this.#lock = false
		else
			this.#fetch()
	}
	#fetch() {
		fetch(...this.#queue[0].slice(1)).then(r => this.#resolve(r))
	}
	#resolve(r) {
		if (this.debug)
			console.log(r)

        if (r.status !== 429) // Too Many Requests
			this.#queue.shift().shift()(r.headers.get('content-type') === 'application/json' ? r.json() : r)

		if (r.headers.get('x-ratelimit-remaining') == 0)
			setTimeout(() => this.#next(), r.headers.get('x-ratelimit-reset') * 1e3 - Date.now())
		else
			this.#next()
	}
}