<template>
  <div class="block-text-container" :style="initStyle">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'avatar',
  data () {
    return {
    }
  },
  props: {
    backgroundColor: {
      type: String,
      default: '#F7F7F7'
    },
    lineColor: {
      type: String,
      default: '#E7E7E7'
    },
    lineWidth: {
      type: String,
      default: '3px'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    initStyle () {
      return {
        width: this.width,
        height: this.height,
        'background-color': this.backgroundColor,
        'border-left-width': this.lineWidth,
        'border-left-style': 'solid',
        'border-left-color': this.lineColor
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .block-text-container {
    text-align: center;
    padding: 20px 10px;
  }
</style>
