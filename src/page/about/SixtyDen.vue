<template>
  <div v-html="markdownIt(skills)"></div>
</template>

<script>

window.marked.setOptions({
  highlight: text => window.hljs.highlightAuto(text).value
})

export default {
  name: 'SixtyDen',
  data () {
    return {
      skills: '## # About SixtyDen\n  ### ## 自己搭博客原因\n\n 关于本渣博首先要说的是，它非常的简单，却也是在下纯手工写的。由于在这段时间一直是996的状态， 所以这个博客都是空隙时间写的，时间跨度稍大了些。为什么要自己写个博客呢，最重要的原因是可以让我保持写文章的习惯。有一句话我人赞同：博客首先是一种知识管理工具，其次才是传播工具。  \n### ## 本渣博基本配置\n\n**前端：**Vue 全家桶\n\n**后端：**PHP + Yii + Mysql\n\n**服务器：**Nginx + 腾讯云\n\n**云存储：**七牛云\n\n 在下从来不懂什么是美感，所以本站的几乎所有 UI 都不是我自己设计的，所以在下就借鉴了百家之长。 首先本站的配色为 Apple 官网的 topbar 配色，topbar 的设计也是 Apple 官网的 topbar 样式。然后整站的评论组件都是 借鉴B站的设计，你可以看到基本上是一样的。内容方面的设计我也是在浏览了上百个博客网站后（不夸张，是真的， 但是他们都长得差不多，因为都用的hexo吧）才成了现在这样（真的很纠结-_=）。本人由于是火影迷，所以你可以感知到整站都有点火影的影子。 好啦，大概就这样吧，一个很简单的用来记笔记的博客。\n\n 对了，有些文章的顶部有个网易云音乐的开关，你无聊的时候可以点击播放一下，那里只会播放纯音乐哟，都是我珍藏的哦'
    }
  },

  methods: {
    markdownIt (text) {
      return window.marked(text)
    }
  }
}
</script>

<style scoped lang="less">
</style>
