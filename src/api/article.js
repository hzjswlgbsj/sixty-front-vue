import { Api } from '../common'

export function getArticle (id, page, limit) {
  return Api.call('article.all', {
    id,
    page,
    limit
  })
}

export function getComment (articleId, page, limit, childrenPage, childrenLimit, type = 'article') {
  return Api.call('comment.all', {
    article_id: articleId,
    limit,
    page,
    children_limit: childrenLimit,
    children_page: childrenPage,
    type
  })
}

export function getChildrenComment (parentId, page, limit) {
  return Api.call('comment.children', {
    parent_id: parentId,
    page,
    limit
  })
}

export function addComment (articleId, userId, content, parentId = 0, replyId = 0, parentUserId = 0, type, email, articleTitle) {
  return Api.call('comment.add', {
    article_id: articleId,
    user_id: userId,
    content: content,
    parent_user_id: parentUserId,
    parent_id: parentId,
    reply_id: replyId,
    type,
    email,
    article_title: articleTitle
  })
}

export function like (userId, commentId, like) {
  let ret = Api.call('comment.like', {
    user_id: userId,
    comment_id: commentId,
    like
  })
  return ret
}

export function getLike (userId, commentId) {
  let ret = Api.call('comment.getlike', {
    user_id: userId,
    comment_id: commentId
  })
  return ret
}
