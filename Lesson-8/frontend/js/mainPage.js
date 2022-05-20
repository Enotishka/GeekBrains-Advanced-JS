import ErrorMessage from "./errorMessage";
import GoodsSearch from "./goodsSearch";
import Cart from "./cart";
import GoodsList from "./goodsList";

export default {
  components: {
    ErrorMessage,
    GoodsSearch,
    Cart,
    GoodsList,
  },
  template: `
    <div>
      <header>
        <ErrorMessage ref="error-message" />
        <div class="header">
          <GoodsSearch
            @search="$refs['goods-list'].filterGoods($event)"
          />
          <Cart ref="cart" />
        </div>
      </header>
      <main class="container">
        <GoodsList
          @add-to-cart="$refs['cart'].add($event)"
          ref="goods-list"
        />
      </main>
    </div>
  `,
};
