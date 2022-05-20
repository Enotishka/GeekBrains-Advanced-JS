Vue.component("product-page", {
  props: ["good"],
  template: `
    <div>
      <goods-item @add-to-cart="$emit('add-to-cart', $event)" :good="good"></goods-item>
    </div>
  `,
});
