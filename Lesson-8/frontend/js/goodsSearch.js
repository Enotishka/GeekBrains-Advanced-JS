export default {
  data() {
    return {
      searchLine: "",
    };
  },
  template: `
    <div class="goods-search">
      <input v-model="searchLine" type="text" class="search-input" />
      <button @click="$emit('search', searchLine)" class="search-button" type="button">Искать</button>
    </div>
  `,
};
