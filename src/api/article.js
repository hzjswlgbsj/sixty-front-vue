import http from '../util/http'
import dataStore from '../data/index'

const module = {
  async all (refresh) {
    if (refresh) {
      dataStore.store('articles', await http.xget('article.all'))
    } else {
      if (dataStore.store('articles').length < 1) {
        dataStore.store('articles', await http.xget('article.all'))
      }
    }
    return dataStore.store('articles')
  }
}

export default module
