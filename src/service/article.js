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

/**
 * 获取所有文章(必须分页，不分页默认返回1000条数据)
 * @param refresh 强制从远端获取数据
 * @param page
 * @param limit
 * @return {Array}
 */
export async function getArticles (refresh, page, limit) {
  if (refresh || dataStore.store('articles').length === 0) {
    let articles = await articleApi.all(page, limit)
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
  return arrayTool.filterItem('id', id, articles)
}

export async function getCurrentComment () {
  console.log('获取当前文章的评论')
}
