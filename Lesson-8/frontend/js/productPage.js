import GoodsItem from "./goodsItem";

export default {
  components: {
    GoodsItem,
  },
  props: ["good"],
  template: `
    <div>
      <GoodsItem @add-to-cart="$emit('add-to-cart', $event)" :good="good" />
    </div>
  `,
};
