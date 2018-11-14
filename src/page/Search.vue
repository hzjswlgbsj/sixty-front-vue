<template>
	<div class="search-root">
    <div class="search-container">
      这里是搜索结果
    </div>
  </div>
</template>

<script>
	export default {
		name: 'Search',
		data() {
			return {}
		},

		props: {},

		components: {},

		mounted() {
			this.$nextTick(() => {
			})
		},

		watch: {},

		computed: {},

		methods: {}

	}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .search-root {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    height: 100%;
    .search-container {
      width: 62%;
      max-width: 880px;
      font-size: $font-size;
    }
  }

  @media screen and (max-width: 767px) {
    .search-container {
      width: 94% !important;
    }
  }
</style>
