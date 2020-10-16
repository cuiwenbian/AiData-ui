<template>
  <div id="app">
    <!-- <Nav></Nav> -->
	<router-view></router-view>
	<Foot></Foot>
  </div>
</template>
<script>
	
import Foot from './components/foot.vue'

export default {
  name: 'App',
  components: {
	Foot
  }
}
</script>
<style lang="scss">

</style>
