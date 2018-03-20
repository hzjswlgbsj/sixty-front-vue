import http from '../util/http'
import data from '../data/index'

const module = {
  async all (refresh) {
    if (refresh) {
      data.store('article_tags', await http.xget('tag.all'))
    } else {
      if (data.store('article_tags').length < 1) {
        data.store('article_tags', await http.xget('tag.all'))
      }
    }
    return data.store('article_tags')
  }
}

export default module
