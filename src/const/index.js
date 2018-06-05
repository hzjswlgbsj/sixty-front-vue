/**
 * 在这里写一些常量，如果常量多的话再进行拆分
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/5/13
 * Time: 下午5:40
 */

const ARTICLE_PAGINATION = 5
const ARTICLE_COMMENT_PAGINATION = 2
const ARTICLE_CHILDREN_COMMENT_PAGINATION = 5
const ARTICLE_COMMENT_LEVEL = {
  comment: 'comment',
  childComment: 'childComment',
  childReply: 'childComment'
}
const ARTICLE_COMMENT_TYPE = 'article'
const MESSAGE_COMMENT_TYPE = 'message'
const LINK_COMMENT_TYPE = 'link'

let CONSTS = {
  ARTICLE_PAGINATION,
  ARTICLE_COMMENT_PAGINATION,
  ARTICLE_CHILDREN_COMMENT_PAGINATION,
  ARTICLE_COMMENT_LEVEL,
  ARTICLE_COMMENT_TYPE,
  MESSAGE_COMMENT_TYPE,
  LINK_COMMENT_TYPE
}
export default CONSTS
