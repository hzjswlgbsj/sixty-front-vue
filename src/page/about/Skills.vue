<template>
  <div v-html="markdownIt(skills)"></div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

marked.setOptions({
  highlight: text => hljs.highlightAuto(text).value
})

export default {
  name: 'skills',
  data () {
    return {
      skills: '## # My skills\n ### ## 关键词\n `HTML 掌握`、`CSS 熟练`、`JavaScript 掌握`、`Vue 熟练`、`React 了解`、`前端工程化 了解`\n\n`Node.js 熟悉`、`PHP 了解`、`Mysql 了解`、`Redis 了解`\n\n`Docker 了解`、`富文本编辑器 熟悉`、`设计模式 了解`、`算法 初级`、`数据结构 初级`\n ### ## 主要项目\n\n1.**低代码平台GUI**项目早期参与者\n\n2.**在线文档**负责人\n\n3.**中台**后台系统主要参与者\n### ## 简述\n 目前，我主要从事前端开发，主要技术栈是 vue。react 在研究 [slate](https://github.com/ianstormtaylor/slate) 编辑器源码的时候进行了学习。基本掌握目前前端项目的构建方式；熟悉从构建项目到开发项目，到代码测试，到项目上线的基本流程。\n\n 在下从大三开始实习，现在工作差不多 4 年多，其中 PHP 开发半年，后来由于公司需要转了前端。目前负责两个新人的成长，主要负责 review 他们的代码，管控他们的代码质量，给他们答疑等。目前正在恶补数据结构和算法...\n\n 如果有需要的话这里有一份稍微详细的 [简历](https://lib.sixtyden.com/resume.pdf)'
    }
  },

  methods: {
    markdownIt (text) {
      return marked(text)
    }
  }
}
</script>

<style scoped lang="less">
</style>
