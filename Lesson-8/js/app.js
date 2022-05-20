const API_URL = "/api";

const app = new Vue({
  el: "#app",
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
      this.$refs["router"].currentPath = path;
      this.$refs["router"].routedProps = props;
    },
  },
});
