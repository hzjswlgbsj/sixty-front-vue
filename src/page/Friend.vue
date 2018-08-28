<template>
  <div class="friends-root" :style="containerHeight">
    <div class="friends-container">
      <div class="friends-alert-operation">
        下面是我们木叶村的一些优秀忍者，想拜他们为师吗？来翻个牌子吧。
      </div>
      <div class="friends-card-container" v-if="linkData && linkData.length > 0">
        <friend-card
          class="friends-card-item"
          v-for="item in linkData"
          :link-data="item"
          :key="item.id">
        </friend-card>
      </div>
      <vue-loading
        v-else
        type="bubbles"
        color="#2BBC8A"
        :size="{ width: '50px', height: '50px' }" />
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
import dataStore from '../data/index'
import { remoteGetComment } from '../service/article'
import { getLinks } from '../service/link'
import FriendCard from '../components/FriendCard'
import Const from '../const/index'

export default {
  name: 'friend',
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
      return dataStore.store('currentComment')
    },
    linkData () {
      return dataStore.store('links')
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
    margin-top: 150px;
    width: 100%;
    height:100%;
    .friends-container {
      width: 62%;
      max-width: 880px;
      .friends-alert-operation {
        font-size: 16px;
        color: $font-color;
      }
      .friends-card-container {
        @include flex-define(row, start, center);
        flex-wrap: wrap;
        .friends-card-item {
          padding: 8px;
        }
      }
      .friends-comments {
        color: $font-color;
      }
    }
  }
</style>
