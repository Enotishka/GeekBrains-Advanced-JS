import MainPage from "./mainPage";
import CartPage from "./cartPage";
import ProductPage from "./productPage";

export default {
  components: {
    MainPage,
    CartPage,
    ProductPage,
  },
  data() {
    return {
      routes: [
        { path: "#", component: "MainPage" },
        { path: "#cart", component: "CartPage" },
        { path: "#product", component: "ProductPage" },
      ],
      currentPath: this.fixHashedPath(window.location.hash),
      routedProps: {},
    };
  },
  computed: {
    routedComponent() {
      return this.routes.find((route) => route.path === this.currentPath)
        .component;
    },
  },
  methods: {
    goTo(path, props) {
      this.currentPath = this.fixHashedPath(path);
      this.routedProps = props;
      window.history.pushState({}, "", window.location.pathname + path);
    },
    fixHashedPath(path) {
      return path === "" ? "#" : path;
    },
  },
  template: `
    <div>
      <component :is="routedComponent" v-bind="routedProps"></component>
    </div>
  `,
};
