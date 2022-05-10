Vue.component("cart", {
  data() {
    return {
      goods: [],
      isVisible: false,
    };
  },
  mounted() {
    this.$root.getJson(`${API_URL}/getBasket.json`).then((data) => {
      this.goods = data.contents.map(
        ({ id_product, product_name, price, quantity }) => {
          return {
            id: id_product,
            name: product_name,
            price,
            count: quantity,
          };
        }
      );
    });
  },
  methods: {
    add(id, name, price) {
      this.$root.getJson(`${API_URL}/addToBasket.json`).then(({ result }) => {
        if (result !== 1) {
          console.warn("Could not add product to cart");
          return;
        }
        let item = this.goods.find((item) => item.id == id);
        if (!item) {
          item = { id, name, price, count: 0 };
          this.goods.push(item);
        }
        item.count++;
      });
    },
    remove(id) {
      this.$root
        .getJson(`${API_URL}/deleteFromBasket.json`)
        .then(({ result }) => {
          if (result !== 1) {
            console.warn("Could not remove product from cart");
            return;
          }
          let item = this.goods.find((item) => item.id == id);
          if (!item) {
            console.warn(`Could not find product with id ${id}`);
            return;
          }
          item.count--;
          this.goods = this.goods.filter((item) => item.count > 0);
        });
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
