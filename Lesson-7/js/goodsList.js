Vue.component("goods-list", {
  data() {
    return {
      goods: [],
      filteredGoods: [],
    };
  },
  mounted() {
    this.$root.getJson(`/catalogData`).then((data) => {
      this.goods = data.map(({ id_product, product_name, price }) => {
        return { id: id_product, name: product_name, price };
      });
      this.filterGoods("");
    });
  },
  methods: {
    filterGoods(value) {
      const regexp = new RegExp(value, "i");
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.name));
    },
  },
  template: `
    <div class="goods-list">
      <goods-item @add-to-cart="$emit('add-to-cart', $event)" v-for="good in filteredGoods" :good="good"></goods-item>
    </div>
  `,
});

Vue.component("goods-item", {
  props: ["good"],
  template: `
    <div class="goods-item">
      <h3>{{ good.name }}</h3>
      <p>{{ good.price }}</p>
      <button @click="$emit('add-to-cart', good)" class="buy-btn">Добавить</button>
    </div>
  `,
});
