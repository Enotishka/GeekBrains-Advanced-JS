const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          this.$refs["error-message"].show(`Could not get json: ${error}`);
          return Promise.reject(error);
        });
    },
  },
});
