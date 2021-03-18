/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/4/3
 * Time: 上午11:28
 */

import { Store } from '../common'
import { isArray, find } from 'lodash-es'
import tagApi from '../api/tags'
import Const from '../const/index'
import {
  getArticle,
  getArticleByFilter,
  getComment,
  getCommentCount,
  getChildrenComment,
  addComment,
  like,
  getLike
} from '../api/article'

/**
 * 获取所有文章(必须分页，不分页默认返回1000条数据)
 * @param refresh 强制从远端获取数据
 * @param id
 * @param page
 * @param limit
 * @return {Array}
 */
export async function remoteGetArticles (refresh, id, page = 1, limit = Const.ARTICLE_PAGINATION) {
  if (refresh || Store.store('articles').length === 0) {
    let currentArticleData = Store.store('articles')
    let ret = await getArticle(id, page, limit)
    let articles = ret.data.items

    if (articles.length < Const.ARTICLE_PAGINATION) {
      Store.store('notAnyMareArticle', true)
    }

    for (let article of articles) {
      let tagIds = article['tag_ids'] && article['tag_ids'].split(',')
      article.tags = await getTagsByIds(tagIds)
      let comment = await getCommentCount(article.id)
      article.comment = comment.data
    }

    if (page > 1) {
      let newArticleDate = currentArticleData.concat(articles)
      Store.store('articles', newArticleDate)
    } else {
      Store.store('articles', articles)
    }
  }

  return Store.store('articles')
}

export async function remoteFilterArticles (fliter, page = 1, limit = Const.ARTICLE_PAGINATION) {
  let ret = await getArticleByFilter(fliter, page, limit)
  return ret.data
}

/**
 * 获取所有标签(必须分页，不分页默认返回1000条数据)
 * @param refresh 强制从远端获取数据
 * @return {Array}
 */
export async function getTags (refresh) {
  if (refresh || Store.store('tags').length === 0) {
    const tags = await tagApi.all()
    Store.store('tags', tags.items)
  }
  return Store.store('tags')
}

/**
 * 通过tag的id集合返回标签数据集合
 * @param ids
 * @return {Array}
 */
export async function getTagsByIds (ids) {
  if (!ids || !isArray(ids) || ids.length < 1) {
    return null
  }
  const allTags = await getTags()
  let tags = []
  if (allTags && allTags.length > 0) {
    for (let tagId of ids) {
      for (let tag of allTags) {
        if (tag.id === tagId) {
          tags.push(tag)
        }
      }
    }
  }
  return tags
}

/**
 * 通过文章id返回对应的文章数据
 * @param id
 * @return {Object}
 */
export async function getArticleById (id) {
  if (id) {
    let ret = await getArticle(id)
    return ret.data.items[0]
  }
}

/**
 * 通过文章id获取该文章对应的所有评论
 * @param refresh
 * @param articleId
 * @param page
 * @param limit
 * @param childrenPage
 * @param childrenLimit
 * @param type
 * @return {Array}
 */
export async function remoteGetComment (refresh, articleId, page = 1, limit = Const.ARTICLE_COMMENT_PAGINATION, childrenPage = 1, childrenLimit = Const.ARTICLE_CHILDREN_COMMENT_PAGINATION, type) {
  if (refresh || Store.store('currentComment').length === 0) {
    let articleComment = await getComment(articleId, page, limit, childrenPage, childrenLimit, type)
    Store.store('currentComment', articleComment)
  }
  return Store.store('currentComment')
}

/**
 * 根据评论id获取一级评论，默认读出缓存,此方法输出本地数据的引用，谨慎使用
 * @param id
 * @param refresh
 * @return {*}
 */
export async function remoteGetCommentById (id, refresh = false) {
  let cacheComment = await remoteGetComment(refresh)
  return find(cacheComment.data, {id: id})
}

/**
 * 通过某评论id获取该评论下对应的子评论
 * 通过修改一级评论的children的引用实现数据更新
 * @param refresh
 * @param parentId
 * @param page
 * @param limit
 * @return {Array}
 */
export async function remoteGetChildrenComment (refresh, parentId, page = 1, limit = Const.ARTICLE_CHILDREN_COMMENT_PAGINATION) {
  let childrenComment = await getChildrenComment(parentId, page, limit)
  let currentComment = await remoteGetCommentById(parentId)
  currentComment.children = childrenComment.data
  return childrenComment
}

/**
 * 添加一条评论
 * @param articleId
 * @param userId
 * @param content
 * @param parentId
 * @param replyId
 * @param parentUserId
 * @param type
 * @return {Boolean}
 */
export async function remoteAddComment (articleId, userId, content, parentId = 0, replyId = 0, parentUserId = 0, type, email, articleTitle) {
  let result = await addComment(articleId, userId, content, parentId, replyId, parentUserId, type, email, articleTitle)
  return result
}

/**
 * 点赞
 * @param userId
 * @param commentId
 * @param like
 * @return {Boolean}
 */
export async function remoteLike (userId, commentId, likeKey) {
  let result = await like(userId, commentId, likeKey)
  return result.data
}

/**
 * 通过评论id和用户id获取该用户的点赞情况
 * @param userId
 * @param commentId
 * @return {Object}
 */
export async function remoteGetLike (userId, commentId) {
  let result = await getLike(userId, commentId)
  return result.data
}
