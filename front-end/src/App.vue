<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/photographers">Photographers</router-link></li>
      </ul>
    </div>
    <router-view />
    <div id="footer">
      <a href="https://github.com/gukuson/creative-project-4.git" target="_blank"
        >Github</a
      >
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
}
.background-image {
  text-align: center;
}
.background-image img {
  width: 100%;
}
.background-image h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
body {
  margin-top: 78px;
  font-family: "Oswald", sans-serif;
}
#app {
  text-align: center;
  color: #424f5c;
}
#app p {
  font-family: "Raleway", sans-serif;
}
#nav ul {
  background-color: #7c8981;
  position: fixed;
  top: 0;
  width: 100%;
  padding-bottom: 10px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#nav li {
  display: inline-block;
}
#nav li a:hover {
  background-color: rgb(231, 228, 228);
  color: grey;
}
#nav a {
  padding: 27px 41px;
  font-weight: bold;
  color: rgb(231, 228, 228);
}
#nav a.router-link-exact-active {
  color: #424f5c;
}
#footer {
  background-color: #7c8981;
  height: 60px;
  text-align: center;
  padding-top: 25px;
  bottom: 0;
  width: 100%;
  border-top: 3px solid #424f5c;
  border-bottom: 3px solid #424f5c;
}
#footer a {
  color: #d8d5d2;
}
#footer a:hover {
  color: #8c9caa;
}
/* Mobile Tablet Styles */
@media only screen and (max-width: 600px) {
  .dresses,
  .photographers {
    flex-direction: column;
    justify-content: center;
  }
  .background-image h1 {
    visibility: hidden;
  }
  .background-image {
    position: initial;
  }
  #nav li {
    display: block;
    margin: 5px 0px 5px 0px;
  }
  #nav a {
    padding: 5px 75px;
  }
  .helloContainer p {
  text-align: left;
  margin: 2em 1em 2em 1em;
  line-height: 2;
}
}

/* Desktop Styles */
@media only screen and (min-width: 601px) {
  .wrapper {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #nav ul {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .helloContainer p {
    text-align: justify;
    margin: 1em 3em 3em 3em;
    line-height: 4;
    font-size: 1.25em;
  }
}
</style>
