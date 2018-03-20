import dataStore from '../data/index'
import arrayTool from '../util/array'

function getArticles () {
  return dataStore.store('articles')
}

function getTags () {
  return dataStore.store('article_tags')
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

export default {
  getArticles,
  getTags,
  getTagsByIds
}
