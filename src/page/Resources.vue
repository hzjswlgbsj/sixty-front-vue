<template>
  <div class="resource-root" :style="containerHeight">
    <div class="resource-container">
      <div class="resource-alert-operation">
        <p>这里是大蛇丸的实验室，在下追随蛇叔多年，下面是我一路走来收集的密卷（其实就是爬过的坑-_=）</p>
        <p>请大佬过目</p>
      </div>
      <div class="resource-card-container" v-if="linkData && linkData.length > 0">
        <resource-card
          class="resource-card-item"
          v-for="item in linkData"
          :link-data="item"
          :key="item.id">
        </resource-card>
      </div>
      <div v-else>
        <vue-loading
          type="bubbles"
          color="#2BBC8A"
          :size="{ width: '50px', height: '50px' }" />
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../components/Comment'
import dataStore from '../data/index'
import { remoteGetComment } from '../service/article'
import { getLinks } from '../service/link'
import ResourceCard from '../components/ResourceCard'
import Const from '../const/index'

export default {
  name: 'resource',
  created () {
    this.initData()
  },
  components: {
    'comment': Comment,
    'resource-card': ResourceCard
  },
  data () {
    return {
      commentType: Const.RESOURCE_COMMENT_TYPE
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
        await getLinks(refresh, Const.LINK_RESOURCE_TYPE, null, 1, Const.LINK_PAGINATION)
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
  .resource-root {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    height: 100%;
    .resource-container {
      width: 62%;
      max-width: 880px;
      .resource-alert-operation {
        font-size: 16px;
        color: $font-color;
        margin-bottom: 20px;
      }
      .resource-card-container {
        @include flex-define(row, start, center);
        flex-wrap: wrap;
        .resource-card-item {
          padding: 8px;
        }
      }
    }
  }
</style>
