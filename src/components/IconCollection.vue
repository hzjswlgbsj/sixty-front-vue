<template>
  <div class="icon-collection-container">
    <div class="icon-collection-icon" v-for="(icon, idx ) in iconItems" :key="idx">
      <Tooltip :content="icon.desc" placement="top">
        <icon :name="icon.name" :scale="icon.scale"></icon>
      </Tooltip>
    </div>
    <div class="icon-collection-icon">
      <slot name="sixty"></slot>
    </div>
    <div class="icon-collection-icon">
      <slot name="music"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'icon-collection',
  props: {
    iconItems: {
      type: Array,
      default: function () {
        return [
          {name: 'github-square', scale: '1.3', desc: 'github'}
        ]
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
  @import "../style/mixin/baseMixin";
  .icon-collection-container {
    .flex-define(row, space-around, center);
    .icon-collection-icon {
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
