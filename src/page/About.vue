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
          <h2># 了解我</h2><br>
          <p>欢迎大佬光临寒舍，在这里你能离我更近哦！</p><br>
          <h3>## hobby</h3><br>
          <p>
            >&nbsp;&nbsp;喜欢
            <span class="about-content-keywords">做菜</span>
            但是厨艺不精，喜欢
            <span class="about-content-keywords2">指弹</span>
            但是手残，喜欢
            <span class="about-content-keywords3">撸码</span>
            但不是大佬，立志成为大佬。
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

          <p>>&nbsp;&nbsp;呃... 赶紧醒醒</p><br>

          <p>>_&nbsp;&nbsp;嗯，总结一下就是，我确实喜欢不断学习，周末不在图书馆就在麦当劳、咖啡厅...</p><br>
          <h3>## skill</h3><br>
          <h4>### 概览</h4>

          <div style="margin: 10px 0;">
            <div class="sixty-about-me-skill">
              <div style="width: 60px;">前端：</div>
              <Progress style="width: 600px;" :percent="75" status="active" :stroke-width="15" />
            </div>

            <div class="sixty-about-me-skill" style="">
              <span style="width: 60px;">后端：</span>
              <Progress style="width: 600px;" :percent="50" status="active" :stroke-width="15" />
            </div>

            <div class="sixty-about-me-skill" style="">
              <span style="width: 60px;">Linux：</span>
              <Progress style="width: 600px;" :percent="40" status="active" :stroke-width="15" />
            </div>
          </div>

          <h4>### 描述</h4>
          <div class="sixty-about-me-skill-desc">

          </div>
          <p style="margin: 10px 0;">
            目前，我主要做前端开发。主要技术栈是vue，当然原生js基础就不说了，这是基础。react也自己玩玩，
            但是没有在公司的项目上使用过（我们公司目前技术栈前端是vue后端是php，所以我后端也是php）。另外，
            现在前端主要要熟悉大前端的构建方式，优化方式，打包方式等，从构建项目到开发项目，到项目上线，这是
            必须要掌握的，在下应该是达标了。
          </p>
          <p>
            在下从大三开始实习，现在工作差不多两年多，其中php开发半年，其余都是前端开发。当前前端的能力是：
            可以自己构建前端项目，简单的优化，然后写一些简单的shell脚本实现快速打包上线、切换版本等。
            可以带一两个实习生一起开发项目小中型项目。后端：能写基本的接口和微服务中的模块，能搭建docker
            容器，用镜像搭环境真的很方便。了解持续集成、集群、分布式等的原理（但是自己还没完整的搭过，公司也不
            让我这个前端来搭，哈哈）。目前正在恶补数据结构和算法...
          </p><br>
          <p>
            * 如果有需要的话这里有一份稍微详细的
            <a class="about-content-keywords3 keywords-link2" href="https://baike.baidu.com/item/%E9%98%BF%E8%A1%B0" target="_blank">简历</a>。
          </p>
          <br>

          <h2># 了解本站</h2><br>

          <h4>自己搭博客原因</h4>
          <p style="margin: 10px 0;">
            关于本渣博首先要说的是，它非常的简单，却也是在下纯手工写的。为什么要自己写个博客呢，其实是为了完成
            大学里没能做完的博客（其实之前也有一版本，是thinkPHP5的），最重要的原因是可以让我保持写文章的习惯，
            你懂了多少，写出来就算是一个总结，不写不知道，一写才吓一跳哦。
          </p>
          <h4>本渣博基本配置</h4>
          <div style="margin: 10px 0;">
            <p>前端：vue全家桶 + iview（其实用得少）</p>
            <p>后端：yii + mysql</p>
            <p>服务器：nginx + 阿里云</p>
            <p>云存储：七牛云</p>
            <p>搜索：Elasticsearch</p>
            <p style="margin-top: 10px">
              在下从来不懂什么是美感，所以本站的几乎所有UI都不是我自己设计的，所以在下就借鉴了百家之长。
              首先本站的配色为Apple官网的topbar配色，topbar的设计也是Apple官网的topbar样式。然后整站的评论组件都是
              借鉴B站的设计，你可以看到基本上是一样的。内容方面的设计我也是在浏览了上百个博客网站后（不夸张，是真的，
              但是他们都长得差不多，因为都用的hexo吧）才成了现在这样（真的很纠结-_=）。本人由于是火影迷，所以你可以感知到整站都有点火影的影子。
              好啦，大概就这样吧，一个很简单的用来记笔记的博客。
            </p>
            <p style="margin-top: 10px">对了，每篇文章的顶部有个网易云音乐的开关，你无聊的时候可以点击播放一下，那里只会播放纯音乐哟，都是我珍藏的哦。</p>
          </div><br>

          <h2># 找到我</h2><br>

          <contact/>

        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Avatar from '../../src/components/Avatar'
import Contact from '../../src/components/Contact'
import { SIXTY_LOGO } from '../const'

export default {
  name: 'blog',
  data () {
    return {
      sixtyLogo: SIXTY_LOGO
    }
  },
  components: {
    Avatar,
    Contact
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
            color: $font-color;
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

          .sixty-about-me-skill {
            display: flex;
            padding-left: 20px
          }
        }
      }
    }
  }
</style>
