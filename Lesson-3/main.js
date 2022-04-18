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
  }
  getTotalSum() {
    return this.goods.reduce((sum, good) => sum + good.price, 0);
  }
  fetchGoods() {
    return new Promise((resolve, reject) => {
      makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
        this.goods = JSON.parse(goods);
        resolve();
      });
    });
  }
  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
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
    return new Promise((resolve, reject) => {
      makeGETRequest(`${API_URL}/addToBasket.json`).then((data) => {
        const { result } = JSON.parse(data);
        if (result === 1) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
  removeItem(title) {
    return new Promise((resolve, reject) => {
      makeGETRequest(`${API_URL}/deleteFromBasket.json`).then((data) => {
        const { result } = JSON.parse(data);
        if (result === 1) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
  getItems() {
    return new Promise((resolve, reject) => {
      makeGETRequest(`${API_URL}/getBasket.json`).then((data) => {
        const { contents } = JSON.parse(data);
        resolve(
          contents.map((product) => {
            const { id_product, product_name, price, quantity } = product;
            return new CartItem(id_product, product_name, price, quantity);
          })
        );
      });
    });
  }
}

class CartItem {
  constructor(id, title, price, count) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.count = count;
  }
}

function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr.responseText);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
}

const list = new GoodsList();
list.fetchGoods().then(() => {
  list.render();
});

const cart = new Cart();
cart.addItem("product1", 10).then(() => {
  console.log("Продукт product1 добавлен");
});
cart.addItem("product2", 20).then(() => {
  console.log("Продукт product2 добавлен");
});
cart.getItems().then((products) => {
  console.log(products);
});
