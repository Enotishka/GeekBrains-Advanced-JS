Vue.component("main-page", {
  template: `
    <div>
      <header>
        <error-message ref="error-message"></error-message>
        <div class="header">
          <goods-search
            @search="$refs['goods-list'].filterGoods($event)"
          ></goods-search>
          <cart ref="cart"></cart>
        </div>
      </header>
      <main>
        <goods-list
          @add-to-cart="$refs['cart'].add($event)"
          ref="goods-list"
        ></goods-list>
      </main>
    </div>
  `,
});
