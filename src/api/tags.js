import http from '../util/http'
import dataStore from '../data/index'

const module = {
  async all (refresh) {
    if (refresh) {
      dataStore.store('article_tags', await http.xget('tag.all'))
    } else {
      if (dataStore.store('article_tags').length < 1) {
        dataStore.store('article_tags', await http.xget('tag.all'))
      }
    }
    return dataStore.store('article_tags')
  }
}

export default module
