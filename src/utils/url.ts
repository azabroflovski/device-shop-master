/**
 * Represents a collection of query parameters.
 */
interface QueryParams {
  [key: string]: any
}

/**
 * Represents a utility for building URLs with query parameters.
 */
export class URLBuilder {
  /** The URL being constructed. */
  public url: string = ''

  /**
   * Creates an instance of URLBuilder.
   * @param {string} [initialUrl] - The initial URL to start building from.
   */
  constructor(initialUrl: string = '') {
    this.url = initialUrl
  }

  /**
   * Sets the path of the URL.
   * @param {string} path - The path to set.
   */
  setPath(path: string) {
    this.url = path
  }

  /**
   * Sets the query parameters of the URL.
   * @param {QueryParams} [queryParams] - The query parameters to set.
   * @returns {URLBuilder} The URLBuilder instance for method chaining.
   */
  setQueryParams(queryParams: QueryParams = {}) {
    const params = new URLSearchParams(queryParams)
    this.url += `?${params}`

    return this
  }

  /**
   * Builds and returns the constructed URL.
   * @returns {string} The constructed URL.
   */
  build() {
    return this.url
  }
}
