import Vue from "vue";
import "../css/main.css";
import App from "./app.js";

new Vue({
  el: "#app",
  components: {
    App,
  },
  data: {
    apiUrl: "/api",
  },
  methods: {
    get(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          this.$refs["error-message"].show(`Could not get json: ${error}`);
          return Promise.reject(error);
        });
    },
    post(url, method, data) {
      console.log(`post() data: ${data}, str: '${JSON.stringify(data)}'`);
      return fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      }).then((result) => result.json());
    },
    goTo(path, props) {
      this.$root.$refs["app"].$refs["router"].goTo(path, props);
    },
  },
  template: `
    <App ref="app"/>
  `,
});
