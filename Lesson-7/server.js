const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { rejects } = require("assert");
const app = express();
app.use(express.static("."));
app.use(bodyParser.json());

app.get("/catalog", (req, res) => {
  console.log("GET /catalog");
  fs.readFile("json/catalog.json", "utf8", (err, data) => {
    console.log(`data: ${data}`);
    res.send(data);
  });
});
app.get("/cart", (req, res) => {
  console.log("GET /cart");
  fs.readFile("json/cart.json", "utf8", (err, data) => {
    console.log(`data: ${data}`);
    res.send(data);
  });
});
app.post("/cart", (req, res) => {
  console.log("POST /cart");
  fs.readFile("json/cart.json", "utf8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
      return;
    }
    console.log(`req.body: ${req.body}, str: ${JSON.stringify(req.body)}`);
    const cart = JSON.parse(data);
    const item = req.body;
    cart.push(item);
    fs.writeFile("json/cart.json", JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
        writeStats({
          action: "add",
          product: item.name,
          timestamp: new Date().toString(),
        });
      }
    });
  });
});
app.put("/cart", (req, res) => {
  console.log("PUT /cart");
  fs.readFile("json/cart.json", "utf8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
      return;
    }
    console.log(`req.body: ${req.body}, str: ${JSON.stringify(req.body)}`);
    const cart = JSON.parse(data);
    const item = req.body;
    const found = cart.find(({ id }) => item.id == id);
    if (!found) {
      res.send('{"result": 0}');
      return;
    }
    Object.assign(found, item);
    fs.writeFile("json/cart.json", JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
      }
    });
  });
});
app.delete("/cart", (req, res) => {
  console.log("DELETE /cart");
  fs.readFile("json/cart.json", "utf8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
      return;
    }
    console.log(`req.body: ${req.body}, str: ${JSON.stringify(req.body)}`);
    const cart = JSON.parse(data);
    const item = req.body;
    const index = cart.findIndex(({ id }) => item.id == id);
    if (index === -1) {
      res.send('{"result": 0}');
      return;
    }
    const deleted = cart.splice(index, 1)[0];
    fs.writeFile("json/cart.json", JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
        writeStats({
          action: "delete",
          product: deleted.name,
          timestamp: new Date().toString(),
        });
      }
    });
  });
});

function writeStats(item) {
  return new Promise((resolve, reject) => {
    fs.readFile("json/stats.json", "utf8", (err, data) => {
      if (err) {
        reject("Could not read file stats.json");
        return;
      }
      const stats = JSON.parse(data);
      stats.push(item);
      fs.writeFile("json/stats.json", JSON.stringify(stats), (err) => {
        if (err) {
          reject("Could not write file stats.json");
          return;
        } else {
          resolve();
        }
      });
    });
  });
}

app.listen(3000, function () {
  console.log("server is running on port 3000!");
});
