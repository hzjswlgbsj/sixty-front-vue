<template>
  <div class="friend-card" @click="handleJump">
    <sixty-card
      rotate
      :is-front="isFront"
      :class="isFront ? '' : 'friends-card-active'"
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
      setTimeout(() => {
        this.backgroundImage = 'http://lib.sixtyden.com/hy2.jpeg'
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

  /*边框闪烁动画开始*/
  .friends-card-active {
    /*width: 150px;*/
    /*height: 130px;*/
    /*background-color: #0d1926;*/
    animation: glow 800ms ease-out infinite alternate;
  }
  @keyframes glow {
    0% {
      border-color: #bc98ff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(19, 19, 255, 0.6), inset 0 0 8px rgba(53, 19, 255, 0.4), 0 0 0 #2f3c99;
    }
    100% {
      border-color: #272899;
      border-radius: 5px;
      box-shadow: 0 0 20px rgba(78, 147, 255, 0.6), inset 0 0 15px rgba(47, 58, 255, 0.4), 0 0 0 #daa7ff;
    }
  }
  /*边框闪烁动画结束*/
</style>
