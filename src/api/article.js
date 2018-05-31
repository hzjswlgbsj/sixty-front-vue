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
  async getChildrenComment (parentId, page, limit) {
    let res = await http.xpost('comment.children', {
      parent_id: parentId,
      page,
      limit
    })
    return res
  },
  async addComment (articleId, userId, content, parentId = 0, replyId = 0, parentUserId = 0) {
    let res = await http.xpost('comment.add', {
      article_id: articleId,
      user_id: userId,
      content: content,
      parent_user_id: parentUserId,
      parent_id: parentId,
      reply_id: replyId
    })
    return res
  },
  async like (userId, commentId, like) {
    let res = await http.xpost('comment.like', {
      user_id: userId,
      comment_id: commentId,
      like
    })
    return res
  },
  async getLike (userId, commentId) {
    let res = await http.xpost('comment.getlike', {
      user_id: userId,
      comment_id: commentId
    })
    return res
  }
}

export default module
