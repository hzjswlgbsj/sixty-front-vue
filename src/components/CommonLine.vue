<template>
  <div class="line-container">
    <div :style="lineStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'common-line',
  props: {
    size: {
      type: String,
      default: '1px'
    },
    color: {
      type: String,
      default: '#4B4F65'
    },
    width: {
      type: String,
      default: '100px'
    }
  },
  computed: {
    lineStyle () {
      return {
        'background-color': this.color,
        width: this.width,
        height: this.size
      }
    }
  }
}
</script>

<style scoped>
  .line-container {
    display: flex;
    justify-content: center
  }
</style>
