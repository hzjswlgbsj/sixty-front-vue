<template>
  <div class="resource-card" @click="handleJump">
    <sixty-card card-width="175px" card-height="100px" background-color="#336773">
      <div class="resource-card-content" v-if="itemData">
        <div class="resource-card-content-avatar-name">
          <avatar size="40px" :src="itemData.logo_url" rotate></avatar>
          <div class="resource-card-content-name">{{itemData.nickname}}</div>
        </div>
        <div class="resource-card-content-description">{{itemData.description}}</div>
      </div>
    </sixty-card>
  </div>
</template>

<script>
import SixtyCard from './SixtyCard'
import Avatar from './Avatar'
export default {
  name: 'resource-card',
  components: {
    'sixty-card': SixtyCard,
    'avatar': Avatar
  },
  props: {
    linkData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    itemData () {
      return this.linkData
    }
  },
  methods: {
    handleJump () {
      window.open(this.itemData.link)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .resource-card {
    font-size: $font-size;
    color: $font-color;
    .resource-card-content {
      @include flex-define(column, space-around, center);
      height: 100%;
      .resource-card-content-avatar-name {
        height: 40px;
        width: 100%;
        @include flex-define(row, start, center);
        .resource-card-content-name {
          font-size: 18px;
          margin-left: 20px;
        }
      }
      .resource-card-content-description {
        text-align: left;
        width: 100%;
      }
    }
  }
</style>
