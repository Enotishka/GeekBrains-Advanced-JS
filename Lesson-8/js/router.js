Vue.component("router", {
  props: ["routes"],
  data() {
    return {
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
  template: `
    <div>
      <component :is="routedComponent" v-bind="routedProps"></component>
    </div>
  `,
});
