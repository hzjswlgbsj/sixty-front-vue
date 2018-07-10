import http from '../util/http'

const module = {
  async all () {
    let res = await http.xget('tag.all')
    return res.data
  }
}

export default module
