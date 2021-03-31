<template>
  <div class="boutique">
    <div class="background-image">
      <img
        src="https://images.unsplash.com/photo-1502727135886-df285cc8379f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80"
      />
      <h1>Filters</h1>
      <Searchbox placeHolder="Enter country/max price"/>
    </div>
    <h1>Here are the top 40 dresses from around the world</h1>
    <div class="dresses">
      <div class="dress" v-for="dress in dresses" :key="dress.id">
        <div class="info">
          <h1>{{ dress.price }}</h1>
          <p>{{ dress.country }}</p>
        </div>
        <div class="image">
          <img :src="dress.image_dress" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Searchbox from "../components/Searchbox.vue";
export default {
  name: "Boutique",
  components: {
    Searchbox,
  },
  computed: {
    dresses() {
      return this.$root.$data.filteredData;
    },
  },
};
</script>

<style scope>

.dresses {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.dress {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}
.image img{
  width: 100%;
}
</style>