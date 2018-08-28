<template>
  <div class="footbar-container">
    <div class="footbar-right-content">
      <span>Copyright © 2016-2018 Sixty'Den  </span>
      <span>
        <a
          style="color: #2BBC8A;"
          href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=-SZfrYcQQRABkmqrjrAVFUmtlKPrDQMkUmrYo-WPX2W21tJf-w6H!893468602" target="_blank">
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

<style lang="scss" scoped>
  @import "../../style/base/base";
  .footbar-container {
    .footbar-right-content {
      color: $font-color;
      font-size: $font-size;
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
