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
  filterGoods(value) {
    const regexp = new RegExp(value, "i");
    this.filteredGoods = this.goods.filter((good) =>
      regexp.test(good.product_name)
    );
    this.render();
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

function makeGETRequest(url, callback) {
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
}

searchButton.addEventListener("click", (e) => {
  const value = searchInput.value;
  list.filterGoods(value);
});

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});
