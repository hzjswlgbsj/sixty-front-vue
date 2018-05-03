import http from '../util/http'

const module = {
  async all (page, limit) {
    let res = await http.xpost('article.all', {
      page,
      limit
    })
    return res
  }
}

export default module
