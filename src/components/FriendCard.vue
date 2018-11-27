<template>
  <div class="friend-card" @click="handleJump">
    <sixty-card
      rotate
      :is-front="isFront"
      :class="isFront ? '' : `friends-card-active-${itemData.color}`"
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
import _ from 'lodash'
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
      backgroundImage: 'https://lib.sixtyden.com/hy1.jpeg',
      isFront: true,
      cardBackImage: [
        'https://lib.sixtyden.com/hy_mz.jpg',
        'https://lib.sixtyden.com/family.jpeg',
        'https://lib.sixtyden.com/hy_xiaoying.jpg',
        'https://lib.sixtyden.com/hy_shuimen.jpg',
        'https://lib.sixtyden.com/hy_shuimen2.jpg',
        'https://lib.sixtyden.com/hy_zuozhu.png',
        'https://lib.sixtyden.com/hy_zm.jpg',
        'https://lib.sixtyden.com/hy_mingren.png',
        'https://lib.sixtyden.com/hy_mc.jpg',
        'https://lib.sixtyden.com/hy_qiban.png',
        'https://lib.sixtyden.com/hy_naruto.png'
      ]
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
        this.backgroundImage = _.sample(this.cardBackImage)
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
  .friends-card-active-purple {
    animation: purple 800ms ease-out infinite alternate;
  }
  @keyframes purple {
    0% {
      border-radius: 5px;
      box-shadow: 0 0 10px purple;
    }
    100% {
      border-color: #dc25ff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(147, 122, 219, 0.8), inset 0 0 8px rgba(102, 51, 153, 0.6), 0 0 0 rebeccapurple;
    }
  }

  .friends-card-active-blue {
    animation: blue 800ms ease-out infinite alternate;
  }
  @keyframes blue {
    0% {
      border-radius: 5px;
      box-shadow: 0 0 10px blue;
    }
    100% {
      border-color: dodgerblue;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(30, 144, 255, 0.8), inset 0 0 8px rgba(18, 182, 255, 0.4), 0 0 0 #09bbff;
    }
  }

  .friends-card-active-white {
    animation: white 800ms ease-out infinite alternate;
  }
  @keyframes white {
    0% {
      border-radius: 5px;
      box-shadow: 0 0 10px white;
    }
    100% {
      border-color: whitesmoke;
      border-radius: 5px;
      box-shadow: 0 0 10px rgb(142, 255, 250), inset 0 0 8px rgb(142, 255, 250), 0 0 0 whitesmoke;
    }
  }

  .friends-card-active-yellow {
    animation: yellow 800ms ease-out infinite alternate;
  }
  @keyframes yellow {
    0% {
      border-radius: 5px;
      box-shadow: 0 0 10px yellow;
    }
    100% {
      border-color: #ecff8d;
      border-radius: 5px;
      box-shadow: 0 0 10px rgb(252, 255, 200), inset 0 0 8px rgb(242, 255, 102), 0 0 0 #fff211;
    }
  }

  .friends-card-active-green {
    animation: green 800ms ease-out infinite alternate;
  }
  @keyframes green {
    0% {
      border-radius: 5px;
      box-shadow: 0 0 10px green;
    }
    100% {
      border-color: darkgreen;
      border-radius: 5px;
      box-shadow: 0 0 10px rgb(14, 184, 49), inset 0 0 8px rgb(37, 128, 60), 0 0 0 green;
    }
  }
  /*边框闪烁动画结束*/
</style>
