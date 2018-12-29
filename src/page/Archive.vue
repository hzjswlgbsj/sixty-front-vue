<template>
  <div class="archive-root" :style="containerHeight">
    <div class="archive-container">
      <div class="archive-alert-operation">
        <p>为了方便查看和阅读我在此归个档，但是此处只会列举出一些<b>系列类</b>或者<b>专题类</b>的文章哦。</p>
      </div>
      <div class="archive-card-container" v-if="archive && archiveData.length > 0">

      </div>
    </div>
  </div>
</template>

<script>
import Const from '../const/index'

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
            {title: '深入JavaScript系列(1) -- 变量以及作用域问题'},
            {title: '深入JavaScript系列(2) -- 执行上下文'},
            {title: '深入JavaScript系列(3) -- 闭包'},
            {title: '深入JavaScript系列(4) -- 原型链'},
            {title: '深入JavaScript系列(5) -- call和apply'},
            {title: '深入JavaScript系列(6) -- 创建对象的方式'},
            {title: '深入JavaScript系列(7) -- 继承的多种方式及其优缺点'}
          ]
        },
        {
          title: 'JavaScript异步系列',
          data: [
            {title: '预备知识'},
            {title: 'jquery的解决方案'},
            {title: 'ES6 中的 Promise'},
            {title: 'Generator'},
            {title: 'async与await'}
          ]
        },
        {
          title: 'JavaScript专题知识点系列',
          data: [
            {title: 'JavaScript专题知识点系列(1) -- 数组去重'},
            {title: 'JavaScript专题知识点系列(2) -- 类型判断'},
            {title: 'JavaScript专题知识点系列(3) -- 深拷贝与浅拷贝'},
            {title: 'JavaScript专题知识点系列(4) -- 数组的各种数据处理'},
            {title: 'JavaScript专题知识点系列(5) -- 函数柯里化'},
            {title: 'JavaScript专题知识点系列(5) -- 递归'},
            {title: 'JavaScript专题知识点系列(5) -- 乱序'}
          ]
        },
        {
          title: 'vue源码学习',
          data: [
            {title: 'vue源码学习(1) -- 准备工作'},
            {title: 'vue源码学习(2) -- 双向绑定原理'},
            {title: 'vue源码学习(3) -- 数据响应之Observer'},
            {title: 'vue源码学习(4) -- 数据响应之Watcher'},
            {title: 'vue源码学习(5) -- 模板渲染之render和watcher'},
            {title: 'vue源码学习(6) -- 深入Compiler理解render函数的生成过程'},
            {title: 'vue源码学习(7) -- 深入$mount内部理解组件挂载和更新原理'},
            {title: 'vue源码学习(8) -- vnode的生成与更新机制'},
            {title: 'vue源码学习(9) -- patch 算法'},
          ]
        },
        {
          title: 'ES6系列',
          data: [
            {title: 'ES6系列(1) -- let 和 const'},
            {title: 'ES6系列(2) -- 模板字符串'},
            {title: 'ES6系列(3) -- 箭头函数'},
            {title: 'ES6系列(4) -- 模拟实现 Symbol 类型'},
            {title: 'ES6系列(5) -- 迭代器与 for of'},
            {title: 'ES6系列(6) -- 深入Compiler理解render函数的生成过程'},
            {title: 'ES6系列(7) -- Generator 的自动执行'},
            {title: 'ES6系列(8) -- Async'},
            {title: 'ES6系列(9) -- 异步处理实战'},
            {title: 'ES6系列(9) -- defineProperty 与 proxy'},
            {title: 'ES6系列(9) -- 装饰器'},
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

  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .archive-root {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    height: 100%;
    .archive-container {
      width: 62%;
      max-width: 880px;
      .archive-alert-operation {
        font-size: 16px;
        color: $font-color;
        margin-bottom: 20px;
      }
      .archive-card-container {
        @include flex-define(row, start, center);
        flex-wrap: wrap;
        .archive-card-item {
          padding: 8px;
        }
      }
    }
  }
</style>
