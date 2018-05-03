
export default {
  curRouter: {}, // 当前路由对象
  articles: [], // 当前被取出来的所有文章
  tags: [], // 当前被取出来的所有标签
  weiboCode: '', // 调用微博oauth2/authorize接口拿到的code，用于下一步换取token
  users: [], // 所有用户
}
