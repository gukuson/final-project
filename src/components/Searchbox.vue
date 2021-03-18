<template>
  <div>
    <div class="wrapper">
      <div class="search">
        <form class="pure-form" v-on:submit.prevent>
          <i class="fas fa-search"></i
          ><input
            :placeholder="placeHolder"
            v-on:change="filter()"
            v-model="searchText"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Searchbox",
  props: {
    placeHolder: String,
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    filter() {
        if (this.searchText === "") {
            console.log("Force Update");
            this.$router.go();
        }
      if (this.$route.name !== "Photographers") {
        if (isNaN(this.searchText)) {
          this.$root.$data.filteredData = this.$root.$data.weddingData.filter(
            (dress) =>
              dress.country
                .toLowerCase()
                .search(this.searchText.toLowerCase()) >= 0
          );
        } else {
          this.$root.$data.filteredData = this.$root.$data.weddingData.filter(
            (dress) =>
              dress.price.replace(/[^0-9.-]+/g, "") <
              parseFloat(this.searchText)
          );
        }
      } else {
        //   Filter by first and last name and price
        if (isNaN(this.searchText)) {
          this.$root.$data.filteredData = this.$root.$data.weddingData.filter(
            (photographer) =>
              photographer.first_name
                .toLowerCase()
                .search(this.searchText.toLowerCase()) >= 0 || photographer.last_name
                .toLowerCase()
                .search(this.searchText.toLowerCase()) >= 0 
          );
        } else {
          this.$root.$data.filteredData = this.$root.$data.weddingData.filter(
            (photographer) =>
              photographer.photographer_price.replace(/[^0-9.-]+/g, "") <
              parseFloat(this.searchText)
          );
        }
      }

      console.log(this.$root.$data.filteredData);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.search {
  width: 50%;
}

input {
  font-size: 20px;
  width: 100%;
  height: 40px;
}
</style>