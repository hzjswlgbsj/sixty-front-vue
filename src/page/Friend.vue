<template>
  <div class="friends-root">
    <div class="friends-container">
      <div class="friends-alert-operation">
        下面是我们木叶村的一些优秀忍者，想拜他们为师吗？来翻个牌子吧。
      </div>
      <div class="friends-card-container" v-if="friendsData && friendsData.length > 0">
        <friend-card class="friends-card-item" v-for="(item, index) in friendsData" :friend-data="item" :key="index"></friend-card>
      </div>
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
import { getComment } from '../service/article'
import FriendCard from '../components/FriendCard'
import Const from '../const/index'

export default {
  name: 'blog',
  created () {
    this.initData()
  },
  components: {
    'comment': Comment,
    'friend-card': FriendCard
  },
  data () {
    return {
      commentType: Const.LINK_COMMENT_TYPE,
      friendsData: [
        {
          avatar: 'http://ovrjw2my5.bkt.clouddn.com/80.jpg',
          nickname: 'Sixty',
          description: '生活不止眼前的代码，还有弹不响的吉他弦'
        },
        {
          avatar: 'http://ovrjw2my5.bkt.clouddn.com/80.jpg',
          nickname: 'Sixty',
          description: '生活不止眼前的代码，还有弹不响的吉他弦'
        },
        {
          avatar: 'http://ovrjw2my5.bkt.clouddn.com/80.jpg',
          nickname: 'Sixty',
          description: '生活不止眼前的代码，还有弹不响的吉他弦'
        },
        {
          avatar: 'http://ovrjw2my5.bkt.clouddn.com/80.jpg',
          nickname: 'Sixty',
          description: '生活不止眼前的代码，还有弹不响的吉他弦'
        },
        {
          avatar: 'http://ovrjw2my5.bkt.clouddn.com/80.jpg',
          nickname: 'Sixty',
          description: '生活不止眼前的代码，还有弹不响的吉他弦'
        },
        {
          avatar: 'http://ovrjw2my5.bkt.clouddn.com/80.jpg',
          nickname: 'Sixty',
          description: '生活不止眼前的代码，还有弹不响的吉他弦'
        }
      ]
    }
  },
  computed: {
    commentData () {
      return dataStore.store('currentComment')
    }
  },
  methods: {
    async initData () {
      this.initCommentData(true)
    },
    async initCommentData (refresh = false) {
      try {
        await getComment(refresh, 0, 1, Const.ARTICLE_COMMENT_PAGINATION, 1, Const.ARTICLE_CHILDREN_COMMENT_PAGINATION, this.commentType)
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
