import http from '../util/http'
import data from '../data/index'

const module = {
  async all (refresh) {
    if (refresh) {
      data.store('articles', await http.xget('article.all'))
    } else {
      if (data.store('articles').length < 1) {
        data.store('articles', await http.xget('article.all'))
      }
    }
    return data.store('articles')
  }
}

export default module
