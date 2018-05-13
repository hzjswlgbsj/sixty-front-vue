import http from '../util/http'

const module = {
  async all (id, page, limit) {
    let res = await http.xpost('article.all', {
      id,
      page,
      limit
    })
    return res
  },
  async getComment (articleId, page, limit, childrenPage, childrenLimit) {
    let res = await http.xpost('comment.all', {
      article_id: articleId,
      limit,
      page,
      children_limit: childrenLimit,
      children_page: childrenPage
    })
    return res
  },
  async getChildrenComment (parentId, limit, page) {
    let res = await http.xpost('comment.children', {
      parent_id: parentId,
      page,
      limit
    })
    return res
  }
}

export default module
