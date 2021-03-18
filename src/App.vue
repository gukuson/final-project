<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/boutique">Dresses</router-link></li>
        <li><router-link to="/photographers">Photographers</router-link></li>
      </ul>
    </div>
    <router-view />
    <div id="footer"><a href="https://github.com/gukuson/WeddingOneStop" target="_blank">Github</a>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
}
.background-image {
  position: relative;
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
  padding: 27px 41px;
  position: fixed;
  top: 0;
  width: 100%;
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
  color: #D8D5D2;
}
#footer a:hover {
  color:#8C9CAA;
}
</style>
