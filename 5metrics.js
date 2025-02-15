export class fivemetrics {
    #apiKey
    constructor(apiKey) {
        this.#apiKey = apiKey
    }
    request(resource, data) {
        return fetch(`https://api.5metrics.dev/${resource}`, {
            headers: {
                'content-type': 'application/json',
                authorization: this.#apiKey
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(r => r.json())
    }
    getResource(resource) {
        return this.request('getResource', {resource})
    }
}