/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/4/3
 * Time: 上午11:28
 */

import dataStore from '../data/index'
import arrayTool from '../util/array'
import articleApi from '../api/article'
import tagApi from '../api/tags'
import Const from '../const/index'

/**
 * 获取所有文章(必须分页，不分页默认返回1000条数据)
 * @param refresh 强制从远端获取数据
 * @param id
 * @param page
 * @param limit
 * @return {Array}
 */
export async function getArticles (refresh, id, page = 1, limit = Const.ARTICLE_PAGINATION) {
  if (refresh || dataStore.store('articles').length === 0) {
    let currentArticleData = dataStore.store('articles')
    let articles = await articleApi.all(id, page, limit)
    for (let article of articles.data) {
      let tagIds = article.tag_ids && article.tag_ids.split(',')
      article.tags = await getTagsByIds(tagIds)
    }
    if (page > 1) {
      let newArticleDate = currentArticleData.concat(articles.data)
      dataStore.store('articles', newArticleDate)
    } else {
      dataStore.store('articles', articles.data)
    }
  }
  return dataStore.store('articles')
}

/**
 * 获取所有标签(必须分页，不分页默认返回1000条数据)
 * @param refresh 强制从远端获取数据
 * @return {Array}
 */
export async function getTags (refresh) {
  if (refresh || dataStore.store('tags').length === 0) {
    const tags = await tagApi.all()
    dataStore.store('tags', tags)
  }
  return dataStore.store('tags')
}

/**
 * 通过tag的id集合返回标签数据集合
 * @param ids
 * @return {Array}
 */
export async function getTagsByIds (ids) {
  if (!ids || !arrayTool.isArray(ids) || ids.length < 1) {
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
  const articles = await getArticles()
  let article = arrayTool.filterItem('id', id, articles)
  if (!article || !article.id) {
    article = await getArticles(true, id)
  }
  return article
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
export async function getComment (refresh, articleId, page = 1, limit = Const.ARTICLE_COMMENT_PAGINATION, childrenPage = 1, childrenLimit = Const.ARTICLE_CHILDREN_COMMENT_PAGINATION, type) {
  if (refresh || dataStore.store('currentComment').length === 0) {
    let articleComment = await articleApi.getComment(articleId, page, limit, childrenPage, childrenLimit, type)
    dataStore.store('currentComment', articleComment)
  }
  return dataStore.store('currentComment')
}

/**
 * 根据评论id获取一级评论，默认读出缓存,此方法输出本地数据的引用，谨慎使用
 * @param id
 * @param refresh
 * @return {*}
 */
export async function getCommentById (id, refresh = false) {
  let cacheComment = await getComment(refresh)
  return arrayTool.filterItem('id', id, cacheComment.data)
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
export async function getChildrenComment (refresh, parentId, page = 1, limit = Const.ARTICLE_CHILDREN_COMMENT_PAGINATION) {
  let childrenComment = await articleApi.getChildrenComment(parentId, page, limit)
  let currentComment = await getCommentById(parentId)
  currentComment.children = childrenComment
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
export async function addComment (articleId, userId, content, parentId = 0, replyId = 0, parentUserId = 0, type) {
  let result = await articleApi.addComment(articleId, userId, content, parentId, replyId, parentUserId, type)
  return result.data
}

/**
 * 点赞
 * @param userId
 * @param commentId
 * @param like
 * @return {Boolean}
 */
export async function like (userId, commentId, like) {
  let result = await articleApi.like(userId, commentId, like)
  return result.data
}

/**
 * 通过评论id和用户id获取该用户的点赞情况
 * @param userId
 * @param commentId
 * @return {Object}
 */
export async function getLike (userId, commentId) {
  let result = await articleApi.getLike(userId, commentId)
  return result.data
}
