<template>
  <div class="create">
    <h1>Add Photographer</h1>
    <div class="add">
      <button @click="showAdd()">Add Photographer</button>
      <div class="add-form" v-if="showAddP">
        <div class="form">
          <input v-model="name" placeholder="Name" />
          <p></p>
          <input v-model="price" placeholder="Price of base package" />
          <p></p>
          <input type="file" name="photo" @change="fileChanged" />
          <div class="select-type" v-if="!chosenType">
            <p>Choose your photographer type</p>
            <div class="suggestions" v-if="suggestions.length > 0">
              <div
                class="suggestion"
                v-for="s in suggestions"
                :key="s.id"
                @click="selectTypePhotographer(s)"
              >
                {{ s.type }}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="select-type">
              <p>Type of Photographer: {{ findType.type }}</p>
            </div>
          </div>
          <button @click="upload">Add</button>
          <p>Is your type of photography not here?</p>
          <button @click="switchType">Add Photography Type</button>
        </div>
      </div>
      <div class="add-type" v-if="newType">
        <input v-model="typeName" placeholder="New Photographer Type" />
        <button @click="addType">Add</button>
      </div>
      <div class="upload" v-if="addPhotographer">
        <h2>{{ addPhotographer.name }}</h2>
        <h2>Base Price: {{ addPhotographer.price }}</h2>
        <img :src="addPhotographer.path" />
      </div>
    </div>
    <div class="edit">
      <button @click="showEditDelete">Edit/Delete Photographer</button>
      <div class="edit-form" v-if="showED">
        <input v-model="findTitle" placeholder="Search" />
        <div class="suggestions" v-if="photographer_suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in photographer_suggestions"
            :key="s.id"
            @click="selectPhotographer(s)"
          >
            {{ s.name }}
          </div>
        </div>
        <input v-model="name" />
        <p></p>
        <input v-model="price" />
        <p></p>
        <button @click="editPhotographer(findPhotographer)">Edit</button>
        <button @click="deletePhotographer(findPhotographer)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Create",
  data() {
    return {
      name: "",
      price: "",
      file: null,
      addPhotographer: null,
      types: [],
      filteredPhotographers: [],
      photographers: [],
      findType: null,
      showAddP: false,
      chosenType: false,
      typeName: "",
      newType: false,
      showED: false,
      findTitle: "",
      findPhotographer: null,
    };
  },
  computed: {
    suggestions() {
      return this.types;
    },
    photographer_suggestions() {
      let photographers = this.photographers.filter((photographers) =>
        photographers.name
          .toLowerCase()
          .startsWith(this.findTitle.toLowerCase())
      );
      return photographers.sort((a, b) => a.photographers > b.photographers);
    },
  },
  created() {
    this.getTypes();
    this.getAllPhotographers();
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
    switchType() {
      this.newType = !this.newType;
    },
    async addType() {
      try {
        await axios.post("/api/type", {
          type: this.typeName,
        });
        this.getTypes();
        this.typeName = "";
        this.switchType();
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async getPhotographers(type) {
      try {
        let response = await axios.get(`/api/types/${type._id}/photographers`);
        this.filteredPhotographers = response.data;
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async getAllPhotographers() {
      try {
        let response = await axios.get(`/api/photographers`);
        this.photographers = response.data;
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
    showAdd() {
      this.showAddP = !this.showAddP;
      this.chosenType = false;
      this.name = "";
      this.price = "";
      this.addPhotographer = null;
    },
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post(
          `/api/types/${this.findType._id}/photographers`,
          {
            name: this.name,
            price: this.price,
            path: r1.data.path,
          }
        );
        this.showAdd();
        this.addPhotographer = r2.data;
      } catch (error) {
        // console.log(error);
      }
    },
    showEditDelete() {
      this.showED = !this.showED;
    },
    selectPhotographer(photographer) {
      this.name = photographer.name;
      this.price = photographer.price;
      this.findPhotographer = photographer;
    },
    async editPhotographer(photographer) {
        try {
        await axios.put(`/api/types/${photographer.type}/photographers/` + photographer._id, {
            name: this.name,
            price: this.price
        });
        this.findPhotographer = null;
        this.name = "";
        this.price = "";
        this.getAllPhotographers();
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async deletePhotographer(photographer) {
      try {
        await axios.delete(`/api/types/${photographer.type}/photographers/` + photographer._id);
        this.findPhotographer = null;
        this.name = "";
        this.price = "";
        this.getAllPhotographers();
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>

<style scope>
.create .add,
.create .edit {
  margin-left: 3em;
}
/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
.create {
  min-height: 400px;
}
button {
  display: flex;
  margin-top: 2em;
  margin-bottom: 1em;
}
.create input,
.create .select-type {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
p {
  text-align: left;
  margin-top: 1em;
  margin-bottom: 10px;
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
}
.photographer {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}
.image img {
  width: 100%;
}
.info p {
  font-family: "Oswald", sans-serif !important;
}
</style>