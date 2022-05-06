class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <h3>${this.title}</h3>
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
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ];
  }
  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price);
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

const list = new GoodsList();
list.fetchGoods();
list.render();
