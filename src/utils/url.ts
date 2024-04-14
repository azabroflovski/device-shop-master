interface QueryParams {
    [key: string]: any
}

export class URLBuilder {
    public url: string = ''

    constructor(initialUrl: string = '') {
        this.url = initialUrl
    }

    setPath(path: string) {
        this.url = path
        return
    }

    setQueryParams(queryParams: QueryParams = {}) {
        const params = new URLSearchParams(queryParams)
        this.url += '?' + params

        return this
    }

    build() {
        console.log(this.url)
        return this.url
    }
}


new URLBuilder()
