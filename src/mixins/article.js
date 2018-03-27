import dataStore from '../data/index'
import arrayTool from '../util/array'

function getArticles () {
  if (dataStore.store('articles').length > 0) {
    return dataStore.store('articles')
  } else {
    return dataStore.storage('articles')
  }
}

function getTags () {
  if (dataStore.store('article_tags').length > 0) {
    return dataStore.store('article_tags')
  } else {
    return dataStore.storage('article_tags')
  }
}

function getTagsByIds (ids) {
  if (!ids || !arrayTool.isArray(ids) || ids.length < 1) {
    return null
  }
  const allTags = getTags()
  let tags = []
  for (let tagId of ids) {
    for (let tag of allTags) {
      if (tag.id === parseInt(tagId)) {
        tags.push(tag)
      }
    }
  }
  return tags
}

function getArticleById (id) {
  return arrayTool.filterItem('id', id, getArticles())
}

function getCurrentComment() {
  
}

export default {
  getArticles,
  getTags,
  getTagsByIds,
  getArticleById
}
