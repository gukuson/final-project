<template>
  <div class="home">
    <HelloWorld msg="Welcome to your new best friend"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style>
  .home img {
    width: 100%;
  }
</style>
