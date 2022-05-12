Vue.component("cart", {
  data() {
    return {
      goods: [],
      isVisible: false,
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
    add(good) {
      const found = this.goods.find(({ id }) => id == good.id);
      if (found) {
        this.$root
          .post(
            `${API_URL}/cart`,
            "PUT",
            Object.assign(good, { count: found.count + 1 })
          )
          .then(({ result }) => {
            if (result !== 1) {
              console.warn("Could not add product to cart");
              return;
            }
            this.get();
          });
      } else {
        this.$root
          .post(`${API_URL}/cart`, "POST", Object.assign(good, { count: 1 }))
          .then(({ result }) => {
            if (result !== 1) {
              console.warn("Could not add product to cart");
              return;
            }
            this.get();
          });
      }
    },
    remove(id) {
      const found = this.goods.find((item) => id == item.id);
      if (!found) {
        console.warn(`Could not find product with id: ${id}`);
        return;
      }
      if (found.count > 1) {
        this.$root
          .post(`${API_URL}/cart`, "PUT", { id, count: found.count - 1 })
          .then(({ result }) => {
            if (result !== 1) {
              console.warn("Could not remove product from cart");
              return;
            }
            this.get();
          });
      } else {
        this.$root
          .post(`${API_URL}/cart`, "DELETE", { id })
          .then(({ result }) => {
            if (result !== 1) {
              console.warn("Could not remove product from cart");
              return;
            }
            this.get();
          });
      }
    },
  },
  template: `
    <div class="cart">
      <button @click="isVisible=!isVisible" class="cart-button" type="button">Корзина</button>
      <div v-if="isVisible">
        <cart-item @remove-from-cart="remove($event.id)" v-for="good in goods" :good="good"></cart-item>
      </div>
    </div>
  `,
});

Vue.component("cart-item", {
  props: ["good"],
  template: `
    <div class="cart-item">
      <p>{{ good.id }}</p>
      <h3>{{ good.name }}</h3>
      <p>{{ good.price }}</p>
      <p>{{ good.count }}</p>
      <button @click="$emit('remove-from-cart', good)" >Удалить</button>
    </div>
  `,
});
