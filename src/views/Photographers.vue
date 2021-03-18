<template>
  <div class="boutique">
    <div class="background-image">
      <img
        src="https://images.unsplash.com/photo-1516283182395-4b90237bff2e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80"
      />
      <h1>Filters</h1>
      <Searchbox placeHolder="Enter photographer name/max price"/>
    </div>
    <h1>Here are the top 40 photographers for weddings</h1>
    <div class="photographers">
      <div class="photographer" v-for="photographer in photographers" :key="photographer.id">
        <div class="info">
          <h1>{{ photographer.first_name }} {{photographer.last_name}}</h1>
          <p>Average Wedding Bundle: {{ photographer.photographer_price }}</p>
        </div>
        <div class="image">
          <img :src="photographer.image_photographer" />
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
    photographers() {
      return this.$root.$data.filteredData;
    },
  },
};
</script>

<style scope>

.photographers {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.photographer {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}
.image img{
  width: 100%;
}
.info p{
    font-family: "Oswald", sans-serif !important;
}

</style>