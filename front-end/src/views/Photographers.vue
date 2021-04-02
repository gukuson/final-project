<template>
  <div class="photographers">
    <div class="background-image">
      <img
        src="https://images.unsplash.com/photo-1516283182395-4b90237bff2e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80"
      />
      <h1>Photographers</h1>
    </div>
    <h1>Find Your Photographer</h1>
    <div class="dropdown">
      <input v-model="findTitle" placeholder="Search" />
      <div class="suggestions" v-if="suggestions.length > 0">
        <div
          class="suggestion"
          v-for="s in suggestions"
          :key="s.id"
          @click="selectType(s)"
        >
          {{ s.type }}
        </div>
      </div>
    </div>
    <div class="add">
      <p>
        New Photographer? Click the link below to add/edit yourself on the
        website
      </p>
      <router-link to="/create">New Photographer</router-link>
    </div>
    <div class="display-container" v-if="findType">
      <h1>
        <u>{{ findType.type }}</u>
      </h1>
      <p></p>
      <div
        class="photographer"
        v-for="photographer in photographers"
        :key="photographer.id"
      >
        <h2>{{ photographer.name }}</h2>
        <h3>Base Price: {{photographer.price}}</h3>
        <img :src="photographer.path" />
        <div @click="showReviews(photographer)">
          <h3>
            <a><u>Click Here to See Reviews</u></a>
          </h3>
        </div>
        <div class="reviews" v-if="photographer._id === photographerId">
          <h2>Reviews</h2>
          <div
            class="review"
            v-for="review in reviews"
            :key="review.id"
          >
          <p>{{review.text}}</p>
          <p><i>-{{review.name}}</i></p>

          </div>
        </div>
      </div>
    </div>

    <!-- <div class="photographers">
      <div class="photographer" v-for="photographer in photographers" :key="photographer.id">
        <div class="info">
          <h1>{{ photographer.first_name }} {{photographer.last_name}}</h1>
          <p>Average Wedding Bundle: {{ photographer.photographer_price }}</p>
        </div>
        <div class="image">
          <img :src="photographer.image_photographer" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Photographers",
  data() {
    return {
      types: [],
      photographers: [],
      reviews: [],
      findTitle: "",
      findType: null,
      photographerId: "",
    };
  },
  computed: {
    suggestions() {
      let types = this.types.filter((type) =>
        type.type.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return types.sort((a, b) => a.types > b.types);
    },
  },
  created() {
    this.getTypes();
  },
  methods: {
    async getTypes() {
      try {
        let response = await axios.get("/api/types");
        this.types = response.data;
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async getPhotographers(type) {
      try {
        console.log(type._id);
        let response = await axios.get(`/api/types/${type._id}/photographers`);
        console.log(response);
        this.photographers = response.data;
        console.log(this.photographers);
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async getReviews(photographer) {
      try {
        let response = await axios.get(
          `/api/photographers/${photographer._id}/reviews`
        );
        this.reviews = response.data;
        console.log(this.photographers);
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    selectType(type) {
      this.findTitle = "";
      this.findType = type;
      this.getPhotographers(this.findType);
    },
    selectTypePhotographer(type) {
      this.findType = type;
      this.chosenType = true;
    },
    showReviews(photographer) {
      this.photographerId = photographer._id;
      this.getReviews(photographer);
    },
  },
};
</script>

<style scope>
.display-container h1{
  display: block;
}
.display-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.add {
  margin: 0;
}
.photopgraher img {
  max-width: 400px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #7c8981;
  color: white;
}
h1 {
  width: 100%;
}
.photographers {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.photographer {
  margin: 10px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 300px;
}

.photographer h2,
.photographer h3,
.photographer img {
  padding-bottom: 1em;
}


.dropdown input {
  width: 195px;
  height: 30px;
}
.image img {
  width: 100%;
}
.info p {
  font-family: "Oswald", sans-serif !important;
}
</style>