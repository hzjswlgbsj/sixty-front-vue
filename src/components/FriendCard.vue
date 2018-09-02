<template>
  <div class="friend-card" @click="handleJump">
    <sixty-card
      rotate
      :is-front="isFront"
      :background-image="backgroundImage"
      @on-click="clickCard">
      <div class="friend-card-content">
        <div class="friend-card-content-avatar-name">
          <avatar size="40px" :src="itemData.logo_url" rotate></avatar>
          <div class="friend-card-content-name">{{itemData.nickname}}</div>
        </div>
        <div class="friend-card-content-description">{{itemData.description}}</div>
      </div>
    </sixty-card>
  </div>
</template>

<script>
import SixtyCard from './SixtyCard'
import Avatar from './Avatar'
export default {
  name: 'friend-card',
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
      backgroundImage: 'http://lib.sixtyden.com/hy1.jpeg',
      isFront: true
    }
  },
  computed: {
    itemData () {
      return this.linkData
    }
  },
  methods: {
    clickCard () {
      this.backgroundImage = 'http://lib.sixtyden.com/hy2.jpeg'
      setTimeout(() => {
        this.isFront = false
      }, 1000)
    },
    handleJump () {
      if (!this.isFront) {
        window.open(this.itemData.link)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .friend-card {
    font-size: $font-size;
    color: $font-color;
    .friend-card-content {
      @include flex-define(column, space-around, center);
      height: 100%;
      .friend-card-content-avatar-name {
        height: 40px;
        width: 100%;
        @include flex-define(row, start, center);
        .friend-card-content-name {
          font-size: 18px;
          margin-left: 20px;
        }
      }
      .friend-card-content-description {
        text-align: left;
        width: 100%;
      }
    }
  }
</style>
