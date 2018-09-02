<template>
  <div class="sixty-about-container">
    <div class="sixty-about-desc-container">
      <section class="g-img1">嘿嘿嘿</section>
      <section class="g-img2">哈哈哈</section>
      <section class="g-img3">嘻嘻嘻</section>
      <section class="g-img4">呵呵呵</section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/base/base";
  .sixty-about-container {
    width: 100%;
    height: 100%;
    .sixty-about-desc-container {
      width: 100%;
      height: 100%;
      /*background-image: url("http://lib.sixtyden.com/201808050400220.jpg");*/
      /*background-color: rgba(0, 0, 0, .6);*/
      /*background-size: cover;*/
      /*background-repeat: no-repeat;*/
      /*background-position: center center;*/
      /*transition: opacity 1s;*/
      /*opacity: .5;*/

      section {
        height: 100vh;
        background: rgba(0, 0, 0, .7);
        color: #fff;
        line-height: 100vh;
        text-align: center;
        font-size: 20vh;
      }

      .g-img1 {
        background-image: url($imgAbout1);
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
      }

      .g-img2 {
        background-image: url($imgAbout2);
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
      }

      .g-img3 {
         background-image: url($imgAbout3);
         background-attachment: fixed;
         background-size: cover;
         background-position: center center;
       }
      .g-img4 {
        background-image: url($imgAbout4);
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
      }
    }
  }
</style>
