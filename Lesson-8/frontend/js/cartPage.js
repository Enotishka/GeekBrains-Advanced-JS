import CartItem from "./cartItem";

export default {
  components: {
    CartItem,
  },
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
      this.$root.get(`${this.$root.apiUrl}/cart`).then((data) => {
        this.goods = data;
      });
    },
  },
  template: `
    <div>
      <button @click="$root.goTo('')">Назад</button>
      <CartItem @remove-from-cart="remove($event.id)" v-for="good in goods" :good="good" />
    </div>
  `,
};
