Vue.component("goods-list", {
  data() {
    return {
      goods: [],
      filteredGoods: [],
    };
  },
  mounted() {
    this.$root.get(`${API_URL}/catalog`).then((data) => {
      this.goods = data;
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
      <button @click="$root.goTo('#product', {good})">Подробнее</button>
    </div>
  `,
});
