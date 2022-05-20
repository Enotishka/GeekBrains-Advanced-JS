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
        { path: "", component: "MainPage" },
        { path: "#cart", component: "CartPage" },
        { path: "#product", component: "ProductPage" },
      ],
      currentPath: window.location.hash,
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
      this.currentPath = path;
      this.routedProps = props;
    },
  },
  template: `
    <div>
      <component :is="routedComponent" v-bind="routedProps"></component>
    </div>
  `,
};
