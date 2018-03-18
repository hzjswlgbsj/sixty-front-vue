<template>
  <div class="avatar-container">
    <img :class="rotate ? 'img-rotate' : '' " :src="src" :style="avatarType" @click="clickImg">
  </div>
</template>

<script>
import routerMixin from '../mixins/router'
export default {
  name: 'avatar',
  data () {
    return {
    }
  },
  mixins: [routerMixin],
  props: {
    src: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '60px'
    },
    type: {
      type: String,
      default: 'circle'
    },
    rotate: {
      type: Boolean,
      default: false
    },
    desc: {
      type: String,
      default: ''
    },
    router: {
      type: String,
      default: ''
    }
  },
  computed: {
    avatarType () {
      if (this.type === 'square') {
        return {
          width: this.size,
          height: this.size,
          'border-radius': '16%'
        }
      } else {
        return {
          width: this.size,
          height: this.size,
          'border-radius': '50%'
        }
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
  .avatar-container {
    &:hover {
      cursor: pointer;
    }
    .img-rotate {
      transition: All 0.6s ease-in-out;
      -webkit-transition: All 0.6s ease-in-out;
      -moz-transition: All 0.6s ease-in-out;
      -o-transition: All 0.6s ease-in-out;
      &:hover {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
      }
    }
  }
</style>
