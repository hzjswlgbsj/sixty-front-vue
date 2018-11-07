<template>
  <div class="friends-root" :style="containerHeight">
    <div class="friends-container">
      <div class="friends-alert-operation">
        下面是我们木叶村的一些优秀忍者，想拜师或者结交吗？来翻个牌子吧。
      </div>
      <div class="friends-card-container" v-if="linkData && linkData.length > 0">
        <friend-card
          class="friends-card-item"
          v-for="item in linkData"
          :link-data="item"
          :key="item.id">
        </friend-card>
      </div>
      <div class="friends-desc-container" v-if="linkData && linkData.length > 0">
        看到上面那些牌子没有？那都是木叶精英啊，你想把你的名字挂上去吗？那你得达到以下标准才行哦：
        <div class="friends-conditions-content">
          <p>-- 只有像蛇叔一样追求科学（<span class="keywords-red">技术</span>）才有资格称为精英</p>
          <p>-- 你得有你自己的研究成果（原创技术类文章<span class="keywords-red">20</span>篇以上）</p>
          <p>-- 精英也分等级的哦，依次为
            <span class="keywords-white">白</span>、
            <span class="keywords-blue">蓝</span>、
            <span class="keywords-yellow">黄</span>、
            <span class="keywords-green">绿</span>、
            <span class="keywords-purple">紫</span>
            ，你是啥颜色呢
          </p>
        </div>
        当然也要献上本站信息啦，不然你怎么加我呢，要加友链的大佬也按这个格式给我吧，哈哈
        <div class="friends-desc-info">
          <p>-- 博客名称：Sixty'Den</p>
          <p>-- 博客地址：http://www.sixtyden.com</p>
          <p>-- 博客头像：http://lib.sixtyden.com/sixtyAvatar.jpg</p>
          <p>-- 博客描述：生活不止眼前的代码，还有弹不响的吉他弦</p>
        </div>
      </div>
      <vue-loading
        v-if="!linkData || linkData.length === 0"
        type="spiningDubbles"
        color="#2BBC8A"
        :size="{ width: '30px', height: '30px' }" />
      <div class="friends-comments">
        <comment
          :comment-total="parseInt(commentData.total)"
          :discussType="commentType"
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
import { Store } from '../common'
import { remoteGetComment } from '../service/article'
import { getLinks } from '../service/link'
import FriendCard from '../components/FriendCard'
import Const from '../const/index'

export default {
  name: 'okami',
  created () {
    this.initData()
  },
  components: {
    'comment': Comment,
    'friend-card': FriendCard
  },
  data () {
    return {
      commentType: Const.LINK_COMMENT_TYPE
    }
  },
  computed: {
    commentData () {
      return Store.store('currentComment')
    },
    linkData () {
      return Store.store('links')
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
      this.initLinkData(true)
    },
    async initCommentData (refresh = false) {
      try {
        await remoteGetComment(refresh, 0, 1, Const.ARTICLE_COMMENT_PAGINATION, 1, Const.ARTICLE_CHILDREN_COMMENT_PAGINATION, this.commentType)
      } catch (e) {
        console.log(e)
      }
    },
    async initLinkData (refresh = false) {
      try {
        await getLinks(refresh, Const.LINK_LINK_TYPE, null, 1, Const.LINK_PAGINATION)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .friends-root {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    height:100%;
    .friends-container {
      width: 62%;
      max-width: 880px;
      .friends-alert-operation {
        font-size: 16px;
        color: $font-color;
        margin-bottom: 20px;
      }
      .friends-card-container {
        @include flex-define(row, start, center);
        flex-wrap: wrap;
        .friends-card-item {
          padding: 8px;
        }
      }
      .friends-desc-container {
        font-size: $font-size;
        color: $font-color;
        line-height: 2em;
        padding: 20px 0;
        .friends-conditions-content, .friends-desc-info {
          margin: 10px 0;
          padding: 10px 20px;
          background-color: #282C34;
          border-radius: 10px;
          .keywords-white {
            @include keywords(#FFFFFF)
          }
          .keywords-blue {
            @include keywords(#0000FF)
          }
          .keywords-yellow {
            @include keywords(#FFFF00)
          }
          .keywords-green {
            @include keywords(#008000)
          }
          .keywords-purple {
            @include keywords(#800080)
          }
        }
        .keywords-red {
          @include keywords(#FF0000)
        }
      }
      .friends-comments {
        color: $font-color;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .friends-container {
      width: 94% !important;
    }
    .friends-conditions-content, .friends-desc-info {
      font-size: 12px !important;
      padding: 5px !important;
    }
  }
</style>
