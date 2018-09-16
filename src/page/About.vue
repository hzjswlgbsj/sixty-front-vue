<template>
  <div class="sixty-about-container">
    <div class="sixty-about-desc-container">
      <section class="sixty-about-background1">
        <div class="sixty-about-me">
          <h1>基本情况</h1>
          <p>喜欢做菜但是厨艺不精，喜欢指弹但是手残，喜欢撸码但不是大佬，也许不久就能成为大佬</p>
          <p>追求自由的生活，不喜欢待在家里，如果我有一个亿，我愿意到处游学，哈哈。由于喜欢程序，所以出门经常带电脑，混迹于麦当劳、图书馆、咖啡厅</p>
          <p>喜欢旅游，不怕折腾。立志要爬遍祖国所有名山，当前完成：青城山、黄山、华山</p>
          <p>喜欢怀旧</p>
          <p>
            有时候坐在图书馆，看着窗外就开始了"回忆动画片"，脑海不断闪现：乡下初春的春芽树最先长出嫩芽，
            外面的水库开始灌满了河水，天空的星星开始变多，水池的蛙声越来越多却不显得吵闹。
          </p>
          <p>我喜欢夏日跑到小河沟去抓螃蟹、跑到"人民渠"去洗澡、吃着一毛钱一包的辣条奔跑在树木笼罩的泥路上</p>
          <p>那是我的包里总是揣着"阿衰"，有时上课还要偷偷看几眼</p>
          <p>呃... 赶紧醒醒</p>
          <p>

          </p>
        </div>
      </section>
      <section class="sixty-about-background2">
        <div class="sixty-about-me">
          <h1>技能</h1>
        </div>
      </section>
      <section class="sixty-about-background3">
        <div class="sixty-about-me">
          <h1>关于Sixty'Den</h1>
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
