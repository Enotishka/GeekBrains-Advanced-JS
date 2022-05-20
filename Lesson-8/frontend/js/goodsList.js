import GoodsItem from "./goodsItem";

export default {
  components: {
    GoodsItem,
  },
  data() {
    return {
      goods: [],
      filteredGoods: [],
    };
  },
  mounted() {
    this.$root.$refs["app"]
      .get(`${this.$root.$refs["app"].apiUrl}/catalog`)
      .then((data) => {
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
      <GoodsItem @add-to-cart="$emit('add-to-cart', $event)" v-for="good in filteredGoods" :good="good" />
    </div>
  `,
};
