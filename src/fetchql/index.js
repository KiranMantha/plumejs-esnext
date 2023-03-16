export class FetchQl {
  #QUERY_METHOD = 'POST';
  #END_POINT = '';
  #HEADERS = new Headers({
    'Content-Type': 'application/json'
  });

  /**
   * @param {string} endpoint
   */
  constructor(endpoint) {
    this.#END_POINT = endpoint;
  }

  /**
   * function to set common headers
   * @param {object} headersObject
   */
  setHeaders(headersObject) {
    for (const prop in headersObject) {
      this.#HEADERS.append(prop, headersObject[prop]);
    }
  }

  /**
   * function to make graphql queries or mutations
   * @param {string} gql
   * @param {object} variables
   * @returns {Promise}
   */
  async makeRequest(gql, variables) {
    const requestBody = {
      query: gql
    };

    if (variables) {
      requestBody['variables'] = variables;
    }

    const response = await fetch({
      url: this.#END_POINT,
      method: this.#QUERY_METHOD,
      headers: this.#HEADERS,
      body: JSON.stringify(requestBody)
    });
    return await response.json();
  }
}
