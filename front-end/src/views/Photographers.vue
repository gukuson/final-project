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
        <h3>Base Price: {{ photographer.price }}</h3>
        <img :src="photographer.path" />
        <div @click="showReviews(photographer)">
          <h3>
            <a><u>Click Here to See Reviews</u></a>
          </h3>
        </div>
        <div class="reviews" v-if="photographer._id === photographerId && showReviewsBool">
          <div v-if="reviews.length > 0">
            <div class="review" v-for="review in reviews" :key="review.id">
              <div v-if="review._id === reviewId">
                <div class="review-box">
                  <input v-model="reviewName" />
                  <input v-model="reviewStar" style="margin-top: 4px" />
                </div>
                <div class="review-box">
                  <textarea v-model="reviewText" />
                </div>
                <button @click="editReview(review)">Edit</button>
              </div>
              <div v-else>
                <p>{{ review.text }}</p>
                <p>
                  <i>-{{ review.name }} (Rating: {{review.star}})</i>
                </p>
                <div class="review-buttons">
                  <button @click="revealEdit(review)">Edit</button>
                  <button @click="deleteReview(review)">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>There are no reviews yet</p>
          </div>
          <div v-if="showAddReview">
          <h3>Add a Review:</h3>
          <div class="add-reviews">
            <div class="review-box">
              <input v-model="reviewName" placeholder="Name" />
              <input
                v-model="reviewStar"
                placeholder="Rating 1-5"
                style="margin-top: 4px"
              />
            </div>
            <div class="review-box">
              <textarea v-model="reviewText" placeholder="Your Review" />
            </div>
          </div>
          <div class="review-button">
            <button @click="addReview(photographerId)">Add Review</button>
          </div>
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
      currPhotographer: null,
      reviewId: "",
      photographerId: "",
      reviewName: "",
      reviewStar: "",
      reviewText: "",
      showAddReview: true,
      showReviewsBool: false
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
        this.currPhotographer = photographer;
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
      this.showReviewsBool = !this.showReviewsBool;
      this.photographerId = photographer._id;
      this.getReviews(photographer);
    },
    revealEdit(review) {
      this.reviewId = review._id;
      this.reviewName = review.name;
      this.reviewText = review.text;
      this.reviewStar = review.star;
      this.showAddReview = false;
    },
    async editReview(review) {
      try {
        await axios.put(
          `/api/photographers/${this.photographerId}/reviews/` + review._id,
          {
            name: this.reviewName,
            text: this.reviewText,
            star: this.reviewStar,
          }
        );
        this.reviewId = "";

        this.getReviews(this.currPhotographer);
        this.reviewName = "";
        this.reviewText = "";
        this.reviewStar = "";
        this.showAddReview = true;
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async deleteReview(review) {
      try {
        console.log("delete review");
        await axios.delete(
          `/api/photographers/${this.photographerId}/reviews/` + review._id
        );
        this.getReviews(this.currPhotographer);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addReview(photographerId) {
      try {
        await axios.post(`/api/photographers/${photographerId}/reviews`, {
          name: this.reviewName,
          text: this.reviewText,
          star: this.reviewStar,
        });
        this.getReviews(this.currPhotographer);
        this.reviewName = "";
        this.reviewText = "";
        this.reviewStar = "";
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>

<style scope>
.review-buttons {
  display: flex;
}
.review-buttons button {
  margin-left: 53px;
  margin-top: 0;
  margin-bottom: 0;
}
.add a {
  color: #424f5c;
}
.add a:hover {
  color: #a3c1df;
}
.display-container h1 {
  display: block;
}
.display-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.add {
  margin: 0;
  margin-bottom: 50px;
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
.add-reviews {
  display: flex;
}
.review-box {
  display: flex;
  flex-direction: column;
}
.review-box input {
  max-width: 100px;
}
.review-box textarea {
  height: 40px;
}
</style>