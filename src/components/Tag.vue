<template>
  <div class="tag-text-container" :style="initStyle" @click="tagClick">
    <icon name="tag" style="margin-right: 5px" />
    <slot></slot>
  </div>
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
      default: '20px'
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
      default: ''
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
    tagClick () {
      this.$emit('tag-click')
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../style/mixin/baseMixin";
  @import '../style/base/base';
  .tag-text-container {
    .flex-define(row, start, center);
    text-align: center;
    padding: 8px 10px;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      background-color: #ffffff !important;
      color: @common-line-color !important;
    }
  }
</style>
