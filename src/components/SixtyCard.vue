<template>
  <div class="sixty-base-card-container" :style="initStyle" :class="rotateClass" @click="handleClick">
    <div class="sixty-base-card-image-cover" v-if="!isFront" />
    <div class="sixty-base-card-image" v-if="!isFront">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sixty-card',
  props: {
    backgroundImage: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#336773'
    },
    cardWidth: {
      type: String,
      default: '200px'
    },
    cardHeight: {
      type: String,
      default: '125px'
    },
    rotate: {
      type: Boolean,
      default: false
    },
    isFront: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      rotateClass: ''
    }
  },
  computed: {
    initStyle () {
      return {
        width: this.cardWidth,
        height: this.cardHeight,
        'background-color': this.backgroundColor,
        'background-image': `url(${this.backgroundImage})`
      }
    },
    bgImage () {
      return this.backgroundImage
    }
  },
  methods: {
    handleClick () {
      if (this.rotate) {
        this.rotateClass = 'sixty-card-rotate'
      }
      this.$emit('on-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/base/base";
  .sixty-base-card-container {
    cursor: pointer;
    border-radius: 5px;
    /*padding: 10px;*/
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    position: relative;
    .sixty-base-card-image {
      position: absolute;
      top: 14px;
      left: 20px;
      z-index: $index-level-first;
    }
    .sixty-base-card-image-cover {
      opacity: 0.5;
      border-radius: 5px;
      background-color: #000000;
      width: 100%;
      height: 100%;
    }
  }
  .sixty-card-rotate {
    -webkit-transition:1s ease-in-out;
    -moz-transition:1s ease-in-out;
    transform: rotateY(360deg);
    -webkit-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
  }

  /*响应式布局开始*/
  @media screen and (max-width: 767px) {
    .sixty-base-card-container {
      width: 160px !important;
      height: 105px !important;
    }
  }
</style>
