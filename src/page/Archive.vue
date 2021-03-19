<template>
  <div class="archive-root" :style="containerHeight">
    <div class="archive-container">
      <div class="archive-alert-operation">
        <p>为了方便查看和阅读我在此归个档，但是此处只会列举出一些<b>系列类</b>或者<b>专题类</b>的文章哦。</p>
      </div>
      <div class="archive-item-container" v-for="(archive, index) in archiveData" :key="index">
        <h2 class="archive-title-name">{{ archive.title }}</h2>
        <div v-for="(item, subindex) in archive.data" :key="subindex">
          <a href="" @click="jumpDeatil(item.articleId)">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'archive',

  components: {

  },

  data () {
    return {
      archiveData: [
        {
          title: '深入JavaScript知识点系列',
          data: [
            {title: '深入JavaScript系列(1) -- 变量以及作用域问题', articleId: 1},
            {title: '深入JavaScript系列(2) -- 执行上下文', articleId: 1},
            {title: '深入JavaScript系列(3) -- 闭包', articleId: 30},
            {title: '深入JavaScript系列(4) -- 原型与原型链', articleId: 31},
            {title: '深入JavaScript系列(5) -- call和apply', articleId: 1},
            {title: '深入JavaScript系列(6) -- 创建对象的方式', articleId: 1},
            {title: '深入JavaScript系列(7) -- 继承的多种方式及其优缺点', articleId: 32},
            {title: '深入JavaScript系列(8) -- 作用域链', articleId: 1},
            {title: '深入JavaScript系列(9) -- 搞懂this', articleId: 1},
            {title: '深入JavaScript系列(9) -- 类数组对象与arguments', articleId: 1}
          ]
        },
        {
          title: 'JavaScript异步系列',
          data: [
            {title: '预备知识', articleId: 1},
            {title: 'jquery的解决方案', articleId: 1},
            {title: 'ES6 中的 Promise', articleId: 1},
            {title: 'Generator', articleId: 1},
            {title: 'async与await', articleId: 1}
          ]
        },
        {
          title: 'JavaScript专题知识点系列',
          data: [
            {title: 'JavaScript专题知识点系列(1) -- 数组去重', articleId: 1},
            {title: 'JavaScript专题知识点系列(2) -- 类型判断', articleId: 1},
            {title: 'JavaScript专题知识点系列(3) -- 深拷贝与浅拷贝', articleId: 1},
            {title: 'JavaScript专题知识点系列(4) -- 数组的各种数据处理', articleId: 1},
            {title: 'JavaScript专题知识点系列(5) -- 函数柯里化', articleId: 1},
            {title: 'JavaScript专题知识点系列(6) -- 递归', articleId: 1},
            {title: 'JavaScript专题知识点系列(7) -- 乱序', articleId: 1},
            {title: 'JavaScript专题知识点系列(8) -- 如何判断两个对象相等', articleId: 1},
            {title: 'JavaScript专题知识点系列(9) -- 函数记忆', articleId: 1},
            {title: 'JavaScript专题知识点系列(9) -- 函数组合', articleId: 1}
          ]
        },
        {
          title: 'vue源码学习',
          data: [
            {title: 'vue源码学习(1) -- 准备工作', articleId: 1},
            {title: 'vue源码学习(2) -- 双向绑定原理', articleId: 1},
            {title: 'vue源码学习(3) -- 数据响应之Observer', articleId: 1},
            {title: 'vue源码学习(4) -- 数据响应之Watcher', articleId: 1},
            {title: 'vue源码学习(5) -- 模板渲染之render和watcher', articleId: 1},
            {title: 'vue源码学习(6) -- 深入Compiler理解render函数的生成过程', articleId: 1},
            {title: 'vue源码学习(7) -- 深入$mount内部理解组件挂载和更新原理', articleId: 1},
            {title: 'vue源码学习(8) -- vnode的生成与更新机制', articleId: 1},
            {title: 'vue源码学习(9) -- patch 算法', articleId: 1}
          ]
        },
        {
          title: 'ES6系列',
          data: [
            {title: 'ES6系列(1) -- let 和 const', articleId: 1},
            {title: 'ES6系列(2) -- 模板字符串', articleId: 1},
            {title: 'ES6系列(3) -- 箭头函数', articleId: 1},
            {title: 'ES6系列(4) -- 模拟实现 Symbol 类型', articleId: 1},
            {title: 'ES6系列(5) -- 迭代器与 for of', articleId: 1},
            {title: 'ES6系列(6) -- 深入Compiler理解render函数的生成过程', articleId: 1},
            {title: 'ES6系列(7) -- Generator 的自动执行', articleId: 1},
            {title: 'ES6系列(8) -- Async', articleId: 1},
            {title: 'ES6系列(9) -- 异步处理实战', articleId: 1},
            {title: 'ES6系列(9) -- defineProperty 与 proxy', articleId: 1},
            {title: 'ES6系列(9) -- 装饰器', articleId: 1}
          ]
        }
      ]
    }
  },

  computed: {
    containerHeight () {
      let height = document.body.clientHeight
      return {
        'min-height': `${height}px`
      }
    }
  },
  methods: {
    jumpDeatil (articleId) {
      this.$router.push(`blog/articleDetail/${articleId}`)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../style/mixin/baseMixin.less";
  @import "../style/base/base";
  .archive-root {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    line-height: 1.4em;
    .archive-container {
      width: 62%;
      max-width: 880px;
      .archive-alert-operation {
        margin-bottom: 40px;
      }
      .archive-item-container {
        margin: 20px 0;
        .archive-title-name {
          margin-bottom: 20px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .archive-container {
      width: 94% !important;
    }
  }
</style>
