import { Api } from '../common'

const module = {
  async all () {
    let res = await Api.call('tag.all')
    return res.data
  }
}

export default module
