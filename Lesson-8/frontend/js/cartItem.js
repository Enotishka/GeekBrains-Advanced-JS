export default {
  props: ["good"],
  template: `
    <div class="cart-item">
      <p>( {{ good.id }} )</p>
      <h3>{{ good.name }}</h3>
      <p>{{ good.price }} руб.</p>
      <p>x {{ good.count }}</p>
      <button @click="$emit('remove-from-cart', good)" >Удалить</button>
    </div>
  `,
};
