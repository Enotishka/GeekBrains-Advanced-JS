const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
      </div>
      `;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }
  getTotalSum() {
    return this.goods.reduce((sum, good) => sum + good.price, 0);
  }
  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
      cb();
    });
  }

  render() {
    let listHtml = "";
    this.filteredGoods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

class Cart {
  constructor() {
    this.items = {};
  }
  addItem(title, price) {
    let item = this.items[title];
    if (!item) {
      item = new CartItem(title, price);
      this.items[title] = item;
    }
    item.count++;
  }
}

class CartItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.count = 0;
  }
}

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    cart: {},
    searchLine: "",
    isVisibleCart: false,
  },
  methods: {
    makeGETRequest(url, callback) {
      const API_URL =
        "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    },

    filterGoods(value) {
      const regexp = new RegExp(value, "i");
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },

    onSearch() {
      this.filterGoods(this.searchLine);
    },
  },
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
    });
    this.makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
      this.cart = JSON.parse(goods);
    });
  },
});
