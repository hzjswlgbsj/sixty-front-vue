<template>
  <transition
    enter-active-class='animated bounceInDown'>
    <div class="sixty-alert-container" v-if="show">{{message}}</div>
  </transition>
</template>

<script>
export default {
  name: 'Dialogs',

  data () {
    return {
      show: false,
      message: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/mixin/baseMixin";
  .sixty-alert-container {
    position: fixed;
    top: 40%;
    left: 40%;
    padding: 8px 10px 8px 55px;
    font-size: 1.2em;
    text-align: left;
    color: @theme-color;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    z-index: 999;
    background-image: url("../../assets/you.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
