import dataStore from '../data/index'
import arrayTool from '../util/array'
import articleApi from '../api/article'
import tagsApi from '../api/tags'

async function getArticles () {
  try {
    let articles = await articleApi.all()
    if (articles && articles.length > 0) {
      dataStore.store('articles', articles)
      let allArticles = dataStore.store('articles')
      for (let article of allArticles) {
        let tagIds = article.tag_ids && article.tag_ids.split(',')
        article.tags = await getTagsByIds(tagIds)
      }
      console.log(11111111111)
      console.log(allArticles)
      console.log(111111111111)
      return allArticles
    }
  } catch (e) {
    console.log(e)
  }
}

async function getTags () {
  try {
    let tags = await tagsApi.all()
    if (tags && tags.length > 0) {
      dataStore.store('article_tags', tags)
      return dataStore.store('article_tags')
    }
  } catch (e) {
    console.log(e)
  }
}

async function getTagsByIds (ids) {
  if (!ids || !arrayTool.isArray(ids) || ids.length < 1) {
    return null
  }
  const allTags = await getTags()
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
