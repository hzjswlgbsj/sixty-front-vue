<template>
  <div>
    <iframe
      frameborder="no"
      marginwidth="0"
      marginheight="0"
      width=330
      height=86
      :src="src">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data () {
    return {}
  },

  props: {
    id: {
      type: Number,
      default: 477342444
    },
    auto: {
      type: Number,
      default: 0
    }
  },

  computed: {
    src () {
      return `//music.163.com/outchain/player?type=2&id=${this.id}&auto=${this.auto}&height=66`
    }
  }
}
</script>

<style scoped>

</style>
