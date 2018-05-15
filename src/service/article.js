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
 * @param page
 * @param limit
 * @return {Array}
 */
export async function getArticles (refresh, id, page = 1, limit = Const.ARTICLE_PAGINATION) {
  if (refresh || dataStore.store('articles').length === 0) {
    let articles = await articleApi.all(id, page, limit)
    for (let article of articles) {
      let tagIds = article.tag_ids && article.tag_ids.split(',')
      article.tags = await getTagsByIds(tagIds)
    }
    dataStore.store('articles', articles)
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
 * @param article_id
 * @param page
 * @param limit
 * @return {Array}
 */
export async function getComment (refresh, articleId, page = 1, limit = Const.ARTICLE_COMMENT_PAGINATION, childrenPage = 1, childrenLimit = Const.ARTICLE_CHILDREN_COMMENT_PAGINATION) {
  if (refresh || dataStore.store('currentComment').length === 0) {
    let articleComment = await articleApi.getComment(articleId, page, limit, childrenPage, childrenLimit)
    dataStore.store('currentComment', articleComment)
  }
  return dataStore.store('currentComment')
}

/**
 * 通过某评论id获取该评论下对应的所有子评论
 * @param refresh
 * @param parent_id
 * @param page
 * @param limit
 * @return {Array}
 */
export async function getChildrenComment (refresh, parentId, page = 1, limit = Const.ARTICLE_CHILDREN_COMMENT_PAGINATION) {
  let articleComment = await articleApi.getChildrenComment(parentId, page, limit)
  return articleComment
}

export async function addComment (articleId, userId, content, parentId = 0, replyId = 0, parentUserId = 0) {
  let articleComment = await articleApi.addComment(articleId, userId, content, parentId, replyId, parentUserId)
  return articleComment
}
