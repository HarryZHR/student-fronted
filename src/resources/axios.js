import {
  instance
} from './'

export default {
  get (apiUrl, param = {}, id = '') {
    param.timerandom = new Date().getTime()
    let config = {
      params: param
    }
    let url = apiUrl
    if (id) {
      url = `${apiUrl}/${id}`
    }
    return instance.get(url, config)
  },
  save (apiUrl, param = {}, body = {}, id = '') {
    let config = {
      params: param
    }
    let url = apiUrl
    if (id) {
      url = `${apiUrl}/${id}`
    }
    return instance.post(url, body, config)
  },
  update (apiUrl, param = {}, body = {}, id = '') {
    let config = {
      params: param
    }
    let url = apiUrl
    if (id) {
      url = `${apiUrl}/${id}`
    }
    return instance.put(url, body, config)
  },
  delete (apiUrl, param = {}, id = '') {
    let config = {
      params: param
    }
    let url = apiUrl
    if (id) {
      url = `${apiUrl}/${id}`
    }
    return instance.delete(url, config)
  }

}
