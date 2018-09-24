<template>
  <div class="sixty-about-container">
    <div class="sixty-about-desc-container">
      <div class="sixty-about-top-cover" :style="containerHeight" />

      <div class="sixty-about-avatar">
        <avatar :src="sixtyLogo" size="120px" rotate></avatar>
        <h1 class="name">Sixty</h1>
        <h3>生活不止眼前的代码，还有弹不响的吉他弦</h3>
      </div>
      <section class="sixty-about-content">
        <div class="sixty-about-me">
          <h1># 关于我</h1>
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
          <p>坐在电视机旁边等土豪去星空卫视点播火影</p>
          <p>呃... 赶紧醒醒</p>
          <p>

          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Avatar from '../../src/components/Avatar'
import { SIXTY_LOGO } from '../const'

export default {
  name: 'blog',
  data () {
    return {
      sixtyLogo: SIXTY_LOGO
    }
  },
  components: {
    avatar: Avatar
  },
  computed: {
    containerHeight () {
      let height = document.body.clientHeight
      return {
        'min-height': `${height}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .sixty-about-container {
    width: 100%;
    height: 100%;
    .sixty-about-desc-container {
      width: 100%;
      height: 100%;
      .sixty-about-avatar {
        width: 100%;
        text-align: center;
        color: #ffffff;
        position: absolute;
        top: 200px;
        .name {
          margin: 10px 0;
        }
      }
      .sixty-about-top-cover {
        height: 100%;
        border-radius: 5px;
        margin-bottom: 30px;
        display: block;
        background-image: url($aboutCover);
        background-color: rgba(0, 0, 0, .6);
        background-size: cover;
        background-repeat: no-repeat;
        /*background-position: center center;*/
        transition: opacity 1s;
        opacity: .3;
      }
      .sixty-about-content {
        @include flex-define(row, center, center);
        font-size: $font-size;
        .sixty-about-me {
          width: 62%;
          max-width: 880px;
        }
      }
    }
  }
</style>
