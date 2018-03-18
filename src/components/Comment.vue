<template>
  <div class="comment-container">
    <div class="comment-parent-avatar">
      <avatar src="http://ovrjw2my5.bkt.clouddn.com/Bird.jpg" size="50px"></avatar>
    </div>
    <div class="comment-parent-container">
      <div class="comment-parent-info">
        <span class="comment-parent-author">Sixty</span>
        <div class="comment-parent-content-text">我觉得这样布局是没有问题的，挺方便的。</div>
        <div class="comment-parent-content-info">
          <div class="comment-parent-content-date">2018-03-10 19:34</div>
          <div class="comment-parent-content-agree">
            <icon name="thumbs-o-up" scale="0.8" style="vertical-align: middle"></icon>
            <span class="comment-parent-content-agree-number">132</span>
          </div>
          <div class="comment-parent-content-disagree">
            <icon name="thumbs-o-down" scale="0.8" style="vertical-align: middle"></icon>
            <span class="comment-parent-content-disagree-number">2</span>
          </div>
          <div class="comment-parent-content-replay">回复</div>
        </div>
        <div class="comment-children-container">
          <!--这里是子评论，这里的三段式和主评论可以抽个组件出来，但是我认为评论组件都是一块一起用我就不抽出来了-->
          <div class="comment-children-avatar">
            <avatar src="http://ovrjw2my5.bkt.clouddn.com/Bird.jpg" size="25px"></avatar>
          </div>
          <div class="comment-children-info">
            <div class="comment-children-author-content">
              <span class="comment-children-author">Sixty&nbsp;</span>
              <span class="comment-children-reply">&nbsp;回复&nbsp;</span>
              <span class="comment-children-reply-author">@alex:</span>
              <span class="comment-children-reply-content">惊为天人啊，兄弟</span>
            </div>
            <div class="comment-children-content-info">
              <span class="comment-children-content-date">2018-03-10 19:34</span>
              <span class="comment-children-content-agree">
                <icon name="thumbs-o-up" scale="0.8" style="vertical-align: middle"></icon>
                <span class="comment-children-content-agree-number">132</span>
              </span>
              <span class="comment-children-content-replay">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
export default {
  name: 'comment',
  components: {
    'avatar': Avatar
  },
  data () {
    return {
    }
  },
  props: {
    backgroundColor: {
      type: String,
      default: '#5292DD'
    },
    color: {
      type: String,
      default: '#cccccc'
    },
    radius: {
      type: String,
      default: '15px'
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'pricetag'
    }
  },
  computed: {
    initStyle () {
      return {
        width: this.width,
        height: this.height,
        'background-color': this.backgroundColor,
        'border-radius': this.radius,
        'font-color': this.color,
        'font-size': this.fontSize
      }
    }
  },
  methods: {
    clickImg () {
      this.jump(this.router)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .comment-container {
    @include flex-define(row, flex-start, flex-start);
    width: 100%;
    .comment-parent-avatar {
    }
    .comment-parent-container {
      width: 100%;
      color: #cccccc;
      font-weight: 600;
      margin-left: 30px;
      .comment-parent-info {
        width: 100%;
        font-size: 14px;
        line-height: 1.8em;
        .comment-parent-author {
          cursor: pointer;
          &:hover {
            color: $theme-color;
            font-size: 14px;
          }
        }
        .comment-parent-content-text {
          font-size: 16px;
          color: $font-color;
          font-weight: 400;
        }
        .comment-parent-content-info {
          width: 100%;
          margin-left: -5px;
          font-weight: 400;
          @include flex-define(row, flex-start, center);
          .comment-parent-content-date,
          .comment-parent-content-agree,
          .comment-parent-content-disagree,
          .comment-parent-content-replay {
            margin-right: 10px;
            cursor: pointer;
            padding: 0 5px;
            &:hover {
              color: $theme-color;
              font-size: 14px;
            }
          }
          .comment-parent-content-replay:hover {
            border-radius: 3px;
            background-color: #E5E9EF;
          }
        }
        .comment-children-container {
          margin: 10px 0;
          @include flex-define(row, flex-start, flex-start);
          .comment-children-info {
            margin: -6px 0 0 10px;
            .comment-children-author-content {
              .comment-children-reply-content {
                font-size: 16px;
                color: $font-color;
                font-weight: 400;
              }
            }
            .comment-children-content-info {
              font-weight: 400;
              .comment-children-content-date,
              .comment-children-content-agree,
              .comment-children-content-replay {
                margin-right: 10px;
                cursor: pointer;
                padding: 2px 5px;
                &:hover {
                  color: $theme-color;
                  font-size: 14px;
                }
              }
              .comment-children-content-replay:hover {
                border-radius: 3px;
                background-color: #E5E9EF;
              }
            }
          }
        }
      }
    }
  }
</style>
