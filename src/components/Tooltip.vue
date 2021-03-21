<template>
  <div class='tooltip-root'>
    <div class='tooltip-rel'  @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
      <slot></slot>
    </div>
    <div v-show="show" class="tooltip-popper">
      <div class='tooltip-content'>
        <div class='tooltip-arrow'></div>
        <div class='tooltip-inner'>{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tooltip',
  data () {
    return {
      show: false
    }
  },
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: '#cccccc'
    },
    delay: {
      type: Number,
      default: 200
    }
  },
  methods: {
    handleMouseenter () {
      setTimeout(() => {
        this.show = true
      }, this.delay)
    },
    handleMouseleave () {
      setTimeout(() => {
        this.show = false
      }, this.delay)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../style/mixin/baseMixin";
  @import '../style/base/base';
  .tooltip-root {
    display: inline-block;
    position: relative;
  }
  .tooltip-rel {
    display: inline-block;
    position: relative;
    width: inherit;
  }
  .tooltip-popper {
    position: absolute;
    will-change: top, left;
    top: -42px;
    left: -34px;
    padding-bottom: 8px;
    z-index: 9;
    text-align: center;
    .tooltip-content {
      max-width: 250px;
      padding: 6px 8px;
      color: #fff;
      text-align: left;
      text-decoration: none;
      word-wrap: break-word;
      background-color: rgba(0,0,0,.75);
      border-radius: 4px;
      white-space: nowrap;
      line-height: 1.5;
    }
    .tooltip-arrow {
      position: absolute;
      width: 0px;
      height: 0px;
      line-height: 0px;/*为了防止ie下出现题型*/
      border-top: 8px solid rgba(0,0,0,.75);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      left: 36px;
      bottom: 0;
    }
  }
</style>
