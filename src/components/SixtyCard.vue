<template>
  <div class="sixty-base-card-container" :style="initStyle" :class="rotateClass" @click="handleClick">
    <slot v-if="!bgImage"></slot>
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
      default: '#666'
    },
    cardWidth: {
      type: String,
      default: '200px'
    },
    cardHeight: {
      type: String,
      default: '125px'
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
      this.rotateClass = 'sixty-card-rotate'
      this.$emit('on-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sixty-base-card-container {
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .sixty-card-rotate {
    -webkit-transition:1s ease-in-out;
    -moz-transition:1s ease-in-out;
    transform: rotateY(360deg);
    -webkit-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
  }
</style>
