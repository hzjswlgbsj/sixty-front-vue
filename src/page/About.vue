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
          <h2># 关于我</h2><br>
          <p>欢迎大佬光临寒舍，在这里你能离我更近哦！</p><br>
          <h3>## hobby</h3><br>
          <p>
            >&nbsp;&nbsp;喜欢
            <span class="about-content-keywords">做菜</span>
            但是厨艺不精，喜欢
            <span class="about-content-keywords2">指弹</span>
            但是手残，喜欢
            <span class="about-content-keywords3">撸码</span>
            但不是大佬，但立志成为大佬。
          </p><br>

          <p>>&nbsp;&nbsp;追求自由的生活，不喜欢待在家里，由于喜欢撸码，所以出门经常带电脑，混迹于麦当劳、图书馆、咖啡厅...</p>
          <p>>&nbsp;&nbsp;喜欢旅游，不怕折腾。立志要爬遍祖国所有名山，当前完成：青城山、黄山、华山、贺兰山</p><br>

          <p>
            >&nbsp;&nbsp;喜欢怀旧，有时候坐在图书馆，看着窗外就开始了"回忆动画片"，脑海不断闪现：乡下初春的春芽树
            （四川方言，好像就是香椿树）最先长出嫩芽， 外面的水库开始灌满了河水，天空的星星开始变多，
            水池的蛙声越来越多却不显得吵闹。
            我喜欢夏日跑到小河沟去抓螃蟹，跑到"人民渠"去洗澡，吃着一毛钱一袋的辣条（
            <a class="about-content-keywords keywords-link1" href="https://baike.baidu.com/item/%E5%A4%A7%E5%88%80%E8%82%89" target="_blank">大刀肉</a>
            ，你懂的）
            奔跑在树木笼罩的泥路上。你知道那种感觉吗？
          </p>
          <p>
            那时候我的包里总是揣着
            <a class="about-content-keywords3 keywords-link2" href="https://baike.baidu.com/item/%E9%98%BF%E8%A1%B0" target="_blank">阿衰</a>
            ，有时上课还要偷偷看几眼，
            老汉儿买的学英语的复（M）读（P）机（3）从来都只有买时候送的英语单词磁带，其他的全是
            <span class="about-content-keywords">周杰伦</span>
            的专辑磁带；老汉儿买的
            <span class="about-content-keywords5">好（yóu）记（xì）星（jī）</span>
            最大的用处就是躲在被窝里玩
            <a class="about-content-keywords2 keywords-link3" href="https://baike.baidu.com/item/%E9%AD%94%E5%A1%94" target="_blank">魔塔</a>
            ，没事的时候就坐在电视机旁边等土豪去星空卫视点播
            <span class="about-content-keywords4">火影</span>
            。。。
          </p><br>

          <p>>_&nbsp;&nbsp;呃... 赶紧醒醒</p><br>

          <h3>## skill</h3>

          <Progress :percent="25" status="active" :stroke-width="10" />
          <Progress :percent="45" status="active" :stroke-width="10" />
          <Progress :percent="65" status="active" :stroke-width="10" />
          <Progress :percent="100" status="active" :stroke-width="10" />

          <br>
          <h2># 关于博客</h2><br>

          <h2># 联系方式</h2><br>

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
        font-size: 1.3em;
        line-height: 1.8em;
        .sixty-about-me {
          width: 62%;
          max-width: 880px;
          p {
            color: $font-other-color;
          }
          .keywords-link1 {
            border-bottom: 1px solid red;
          }
          .keywords-link2 {
            border-bottom: 1px solid #FFC66D;
          }
          .keywords-link3 {
            border-bottom: 1px solid #9876AA;
          }
          .about-content-keywords {
            @include keywords(red)
          }
          .about-content-keywords2 {
            @include keywords(#9876AA)
          }
          .about-content-keywords3 {
            @include keywords(#FFC66D)
          }
          .about-content-keywords4 {
            @include keywords(#FFA347)
          }
          .about-content-keywords5 {
            @include keywords(#FED95F)
          }
        }
      }
    }
  }
</style>
