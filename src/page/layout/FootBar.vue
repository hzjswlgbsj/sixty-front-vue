<template>
  <div class="footbar-container">
    <div class="footbar-right-content">
      <span>Copyright © 2016-2019 Sixty'Den  </span>
      <span>
        <a
          style="color: #2BBC8A;"
          href="http://www.miitbeian.gov.cn/" target="_blank">
          苏ICP备17001302号
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foot-bar'
}
</script>

<style lang="less" scoped>
  @import "../../style/base/base";
  .footbar-container {
    background-color: #010101;
    margin-top: 10px;
    .footbar-right-content {
      color: @font-color;
      font-size: @font-size;
      text-align: center;
      padding: 10px 0;
    }
  }

  @media screen and (max-width: 767px) {
    .footbar-container {
      padding: 5px 0 !important;
    }
  }
</style>
