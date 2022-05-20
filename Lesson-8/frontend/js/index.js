import Vue from "vue";
import "../css/main.css";
import App from "./app.js";

new Vue({
  el: "#app",
  components: {
    App,
  },
  template: `
    <App ref="app"/>
  `,
});
