<template>
  <div class="hello">
    <div class="background-image">
      <img
        src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      />
      <h1>{{ msg }}</h1>
    </div>
    <div class="helloContainer">
      <h2>Have you ever planned a wedding?</h2>
      <p>
        Wedding planning can be so stressful! With having to find a wedding
        dress at a reasonable price, the perfect photographer, a venue, a ring
        shop, honeymoon and more, it is no wonder that oftentimes couples are
        more stressed for their special day than excited. That's why we're here.
        So you can spend less time scavenging different websites and more time
        enjoying your time with your special someone.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin-top: 30px;
}
.helloContainer p {
  text-align: left;
  margin: 2em 1em 2em 1em;
  line-height: 2;
}
</style>
