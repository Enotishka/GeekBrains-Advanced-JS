import GoodsItem from "./goodsItem";

export default {
  components: {
    GoodsItem,
  },
  props: ["good"],
  template: `
    <div>
      <button @click="$root.goTo('')">Назад</button>
      <GoodsItem @add-to-cart="$emit('add-to-cart', $event)" :good="good" />
    </div>
  `,
};
