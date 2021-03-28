<template>
  <div class="main-layout-contact">
    <a href="https://github.com/hzjswlgbsj" target="_blank">
      <span class="contact-icon main-layout-contact-github">
        <icon name="github" scale="1.5"></icon>
      </span>
    </a>
    <a href="https://www.facebook.com/profile.php?id=100023910004726" target="_blank">
      <span class="contact-icon main-layout-contact-facebook">
        <icon name="facebook-square" scale="1.5"></icon>
      </span>
    </a>
    <a href="https://weibo.com/hiliulin" target="_blank">
      <span class="contact-icon main-layout-contact-weibo">
        <icon name="weibo" scale="1.5"></icon>
      </span>
    </a>
    <a href="https://twitter.com/hiliulin" target="_blank">
      <span class="contact-icon main-layout-contact-twitter">
        <icon name="twitter" scale="1.5"></icon>
      </span>
    </a>
    <div class="contact-icon main-layout-contact-wechat">
       <tooltip placement="top" content="hzjswlgbsj" :delay="200">
        <icon name="wechat" scale="1.5"></icon>
       </tooltip>
    </div>
    <div class="contact-icon main-layout-contact-qq">
      <tooltip placement="top" content="1025132924" :delay="200">
        <icon name="qq" scale="1.3"></icon>
       </tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  components: {
    'tooltip': () => import('./Tooltip')
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .main-layout-contact {
    margin: 0 auto;
    a {
      color: #ffffff;
    }
    .contact-icon{
      margin-right: 20px;
      display: inline-block;
      &:hover {
        cursor:pointer;
      }
    }
    .main-layout-contact-github:hover {
      color: #E58C7C;
    }
    .main-layout-contact-facebook:hover {
      color: #3B5A95;
    }
    .main-layout-contact-weibo:hover {
      color: #E52130;
    }
    .main-layout-contact-twitter:hover {
      color: #1AA0EF;
    }
    .main-layout-contact-wechat:hover {
      color: #86D850;
    }
    .main-layout-contact-qq:hover {
      color: #333333;
    }
  }
</style>
