export default {
  props: ["good"],
  template: `
    <div class="goods-item">
      <h3>{{ good.name }}</h3>
      <p>{{ good.price }}</p>
      <button @click="$emit('add-to-cart', good)" class="buy-btn">Добавить</button>
      <button @click="$root.$refs['app'].goTo('#product', {good})">Подробнее</button>
    </div>
  `,
};
