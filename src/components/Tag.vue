<template>
  <span class="tag-text-container" :style="initStyle">
    <Icon :type="this.icon"></Icon>
    <slot></slot>
  </span>
</template>

<script>

export default {
  name: 'tag',
  data () {
    return {
    }
  },
  props: {
    backgroundColor: {
      type: String,
      default: '#5292DD'
    },
    color: {
      type: String,
      default: '#cccccc'
    },
    radius: {
      type: String,
      default: '15px'
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'pricetag'
    }
  },
  computed: {
    initStyle () {
      return {
        width: this.width,
        height: this.height,
        'background-color': this.backgroundColor,
        'border-radius': this.radius,
        'font-color': this.color,
        'font-size': this.fontSize
      }
    }
  },
  methods: {
    clickImg () {
      this.jump(this.router)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-text-container {
    text-align: center;
    padding: 8px 10px;
    margin-right: 10px;
  }
</style>
