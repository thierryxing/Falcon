/**
 * Created by Thierry on 2017/4/14.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import { mockData } from '../../mock/data/configs'

Vue.use(VueResource)

export default {

  path: '/api',

  /**
   * Http Get
   * @param {string} url
   * @param {object} pathParams
   * @param {object} options
   * @param {function} success
   * @param {function} failure
   * @export
   */
  doGet (url, pathParams, options, success, failure) {
    url = this._wrapUrl(url, pathParams)
    Vue.http.get(url, options).then(response => {
      this._handleResponse(response, success, failure)
    }, response => {
      failure(response.statusText)
    })
  },

  /**
   * Http Post
   * @param {string} url
   * @param {object} pathParams
   * @param {object} body
   * @param {object} options
   * @param {function} success
   * @param {function} failure
   * @export
   */
  doPost (url, pathParams, body, options, success, failure) {
    url = this._wrapUrl(url, pathParams)
    Vue.http.post(url, body, options).then(response => {
      this._handleResponse(response, success, failure)
    }, response => {
      failure(response.statusText)
    })
  },

  /**
   * Http Put
   * @param {string} url
   * @param {object} pathParams
   * @param {object} body
   * @param {object} options
   * @param {function} success
   * @param {function} failure
   * @export
   */
  doPut (url, pathParams, body, options, success, failure) {
    url = this._wrapUrl(url, pathParams)
    Vue.http.put(url, body, options).then(response => {
      this._handleResponse(response, success, failure)
    }, response => {
      failure(response.statusText)
    })
  },

  /**
   * Http Put
   * @param {string} url
   * @param {object} pathParams
   * @param {object} options
   * @param {function} success
   * @param {function} failure
   * @export
   */
  doDelete (url, pathParams, options, success, failure) {
    url = this._wrapUrl(url, pathParams)
    Vue.http.delete(url, options).then(response => {
      this._handleResponse(response, success, failure)
    }, response => {
      failure(response.statusText)
    })
  },

  /**
   * Handle Response with success or failure
   * @param {object} response
   * @param {function} success
   * @param {function} failure
   * @private
   */
  _handleResponse (response, success, failure) {
    if (response.body.status === 0) {
      success(response.body)
    } else {
      failure(response.body.message)
    }
  },

  /**
   * 从URL匹配出参数pathParams
   * @param {string} url
   * @param {object} params
   * @returns {string}
   * @private
   */
  _wrapUrl: function (url, params) {
    if (params !== null) {
      let matches = this._getMatches(url)
      for (let match of matches) {
        let value = params[match.replace(':', '')]
        if (value !== null) {
          url = url.replace(match, value)
        }
      }
    }
    return this.path + url
  },

  /**
   * 正则Group匹配
   * @param {string} string
   * @returns {Array}
   * @private
   */
  _getMatches: function (string) {
    let matches = []
    let regex = /(:[a-z_]+)/
    let match = regex.exec(string)
    while (match !== null) {
      matches.push(match[1])
      string = string.replace(match[1], '')
      match = regex.exec(string)
    }
    return matches
  }

}
