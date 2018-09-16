<template>
  <div class="tucao-root" :style="containerHeight">
    <div class="tucao-container">
      <div class="tucao-content">
        <span class="tucao-content-hello-text">各位大佬好：</span>
        <p>
          欢迎来到Sixty'den，它存在的意义就是记录我的成长历程。在下认为，要把某个知识融会贯通需要去梳理这中间的逻辑。
          而把这个过程用图文形式记录下来是一个很好的办法。
        </p>
        <span class="tucao-content-title-text">Sixty's Den的身世</span>
        <p>
          Sixty'den是以Vue和vuex为骨架；以PHP和Mysql两位大佬为血肉而构成的生命体。 由在下汇（
          <span class="tucao-content-keywords4">jiè</span>
          ）集（
          <span class="tucao-content-keywords4">jiàn</span>
          ）各家设计之长为他赋予灵魂让它不至于太丑。至于它的内涵，
          如果大佬感兴趣，在下这就用空间忍术带你
          <a class="tucao-content-keywords keywords-link1" href="https://github.com/hzjswlgbsj/sixty-front" target="_blank">一探究竟</a>
        </p>
        <span class="tucao-content-title-text">简单的自我介绍：</span>
        <p>据说吾乃汉高帝后裔分支，命里缺木，遂名曰：林</p>
        <p>
          爱
          <span class="tucao-content-keywords">炊事</span>，厨界新生；
          爱
          <span class="tucao-content-keywords3">吉他</span>，无奈手残音缺；
          爱
          <span class="tucao-content-keywords2">代码</span>，
          初入江湖
        </p>
        <p>常驻B站，Sixty'den的评论组件跟它的如出一撤，(゜-゜)つロ干杯~-bilibilin</p>
        <p>
          火影迷，我是要继承
          <span class="tucao-content-keywords5">火（jì）之（shù）意（zǒng）志（jiān）</span>
          的人，怎么能在此处倒下！
        </p>
        <p>
          伪杰迷，
          <span class="tucao-content-keywords">七里香</span>
          入坑，然后无法自拔
        </p>
        <p>
          什么？你想知道更多？
          <a class="tucao-content-keywords3 keywords-link2" @click="handleJumpAbout">飞雷神</a>
          带你飞
        </p>
        <p>既然来了，不妨留下你的足迹，对在下指点一二。</p>
      </div>
      <div class="tucao-comment">
        <comment
          :comment-total="parseInt(commentData.total)"
          :discussType=commentType
          :commentData="commentData.data"
          :articleId="'0'"
          @refresh-comment-data="initCommentData(true)">
        </comment>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../components/Comment'
import dataStore from '../data/index'
import { remoteGetComment } from '../service/article'
import Const from '../const/index'

export default {
  name: 'blog',
  data () {
    return {
      commentType: Const.MESSAGE_COMMENT_TYPE
    }
  },
  created () {
    this.initData()
  },
  components: {
    'comment': Comment
  },
  computed: {
    commentData () {
      return dataStore.store('currentComment')
    },
    containerHeight () {
      let height = document.body.clientHeight
      return {
        'min-height': `${height}px`
      }
    }
  },
  methods: {
    async initData () {
      this.initCommentData(true)
    },
    async initCommentData (refresh = false) {
      try {
        await remoteGetComment(refresh, 0, 1, Const.ARTICLE_COMMENT_PAGINATION, 1, Const.ARTICLE_CHILDREN_COMMENT_PAGINATION, this.commentType)
      } catch (e) {
        console.log(e)
      }
    },
    handleJumpAbout () {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .tucao-root {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    height: 100%;
    .tucao-container {
      width: 62%;
      max-width: 880px;
      .tucao-content {
        font-size: $font-size;
        color: $font-color;
        line-height: 2em;
        .tucao-content-hello-text, .tucao-content-title-text {
          font-weight: 600;
          color: $logout-color;
          line-height: 3em;
        }
        .tucao-content-hello-text {
          font-size: 1.3em;
        }
        .tucao-content-title-text {
          font-size: 1.1em;
        }
        p {
          text-indent: 2em;
        }
        .keywords-link1 {
          border-bottom: 1px solid red;
        }
        .keywords-link2 {
          border-bottom: 1px solid #FFC66D;
        }
        .tucao-content-keywords {
          @include keywords(red)
        }
        .tucao-content-keywords2 {
          @include keywords(#9876AA)
        }
        .tucao-content-keywords3 {
          @include keywords(#FFC66D)
        }
        .tucao-content-keywords4 {
          @include keywords(#FFA347)
        }
        .tucao-content-keywords5 {
          @include keywords(#FED95F)
        }
      }
      .tucao-comment {
        color: $font-color;
      }
    }
  }
</style>
