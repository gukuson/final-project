<template>
  <div class="hero">
    <div class="heroBox">
        <h1>Account Needed to Continue</h1>
      <form class="pure-form">
        <fieldset class="set-flex">
          <legend>Register for an account</legend>
          <input placeholder="first name" v-model="firstName" />
          <input placeholder="last name" v-model="lastName" />
        </fieldset>
        <fieldset class="set-flex">
          <input placeholder="username" v-model="username" />
          <input type="password" placeholder="password" v-model="password" />
        </fieldset>
          <button
            type="submit"
            class="pure-button pure-button-primary"
            @click.prevent="register"
          >
            Register
          </button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <form class="pure-form space-above">
        <fieldset class="set-flex">
          <legend>Login</legend>
          <input placeholder="username" v-model="usernameLogin" />
          <input
            type="password"
            placeholder="password"
            v-model="passwordLogin"
          />
        </fieldset>
          <button
            type="submit"
            class="pure-button pure-button-primary"
            @click.prevent="login"
          >
            Login
          </button>
      </form>
      <p v-if="errorLogin" class="error">{{ errorLogin }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      usernameLogin: "",
      passwordLogin: "",
      error: "",
      errorLogin: "",
    };
  },
  methods: {
    async register() {
      this.error = "";
      this.errorLogin = "";
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post("/api/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = "";
      this.errorLogin = "";
      if (!this.usernameLogin || !this.passwordLogin) return;
      try {
        let response = await axios.post("/api/users/login", {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 120px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.heroBox input{
    height: 30px;
    border-color: rgb(230, 228, 228);
    border-radius: 8px;
    border-style: solid;
}
.heroBox button{
    margin-top: 1em;
    padding: 5px 20px;
    background-color: #7c8981;
    color: rgb(231, 228, 228);
    border-style: solid;
    border-radius: 5px;
    border-color: #424f5c;
}
.heroBox h1{ 
    margin-top: 0px;
    margin-bottom: 30px;
}


.heroBox button:focus{
    outline: none;
    border-color: rgb(231, 228, 228);
}
.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

fieldset {
    border-right: none;
    border-bottom: none;
    border-left: none;
}
.set-flex input:focus {
  border-color: #7c8981;
  outline: none;
}
</style>