Vue.component("cart-page", {
  data() {
    return {
      goods: [],
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.$root.get(`${API_URL}/cart`).then((data) => {
        this.goods = data;
      });
    },
  },
  template: `
    <div>
      <button @click="$root.goTo('')">Назад</button>
      <cart-item @remove-from-cart="remove($event.id)" v-for="good in goods" :good="good"></cart-item>
    </div>
  `,
});
