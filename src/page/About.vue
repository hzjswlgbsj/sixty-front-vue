<template>
  <div class="sixty-about-container">
    <div class="sixty-about-desc-container">
      <section class="sixty-about-background1">
        <div class="sixty-about-me">
          <h1>基本情况</h1>
        </div>
      </section>
      <section class="sixty-about-background2">
        <div class="sixty-about-me">
          <h1>技能</h1>
        </div>
      </section>
      <section class="sixty-about-background3">
        <div class="sixty-about-me">
          <h1>关于sixtyden</h1>
        </div>
      </section>
      <section class="sixty-about-background4">
        <div class="sixty-about-me">
          <h1>联系方式</h1>
        </div>
      </section>
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
        line-height: 3em;
        font-size: $font-size;
        padding: 50px;
      }

      .sixty-about-background1,
      .sixty-about-background2,
      .sixty-about-background3,
      .sixty-about-background4 {
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
      }
      .sixty-about-background1 {
        background-image: url($imgAbout1);
      }

      .sixty-about-background2 {
        background-image: url($imgAbout2);
      }

      .sixty-about-background3 {
         background-image: url($imgAbout3);
       }
      .sixty-about-background4 {
        background-image: url($imgAbout4);
      }
    }
  }
</style>
