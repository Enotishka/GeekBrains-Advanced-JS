const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

const rootPath = `${__dirname}/../..`;
const frontendPath = `${rootPath}/frontend`;
const backendPath = `${rootPath}/backend`;

app.use(express.static(frontendPath));
app.use(bodyParser.json());

app.get("/api/catalog", (req, res) => {
  console.log("GET /catalog");
  const jsonPath = `${backendPath}/json/catalog.json`;
  fs.readFile(jsonPath, "utf8", (err, data) => {
    console.log(`data: ${data}`);
    res.send(data);
  });
});
app.get("/api/cart", (req, res) => {
  console.log("GET /cart");
  const jsonPath = `${backendPath}/json/cart.json`;
  fs.readFile(jsonPath, "utf8", (err, data) => {
    console.log(`data: ${data}`);
    res.send(data);
  });
});
app.post("/api/cart", (req, res) => {
  console.log("POST /cart");
  const jsonPath = `${backendPath}/json/cart.json`;
  fs.readFile(jsonPath, "utf8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
      return;
    }
    console.log(`req.body: ${req.body}, str: ${JSON.stringify(req.body)}`);
    const cart = JSON.parse(data);
    const item = req.body;
    cart.push(item);
    fs.writeFile(jsonPath, JSON.stringify(cart), (err) => {
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
app.put("/api/cart", (req, res) => {
  console.log("PUT /cart");
  const jsonPath = `${backendPath}/json/cart.json`;
  fs.readFile(jsonPath, "utf8", (err, data) => {
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
    fs.writeFile(jsonPath, JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
      }
    });
  });
});
app.delete("/api/cart", (req, res) => {
  console.log("DELETE /cart");
  const jsonPath = `${backendPath}/json/cart.json`;
  fs.readFile(jsonPath, "utf8", (err, data) => {
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
    fs.writeFile(jsonPath, JSON.stringify(cart), (err) => {
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
    const jsonPath = `${backendPath}/json/stats.json`;
    fs.readFile(jsonPath, "utf8", (err, data) => {
      if (err) {
        reject("Could not read file stats.json");
        return;
      }
      const stats = JSON.parse(data);
      stats.push(item);
      fs.writeFile(jsonPath, JSON.stringify(stats), (err) => {
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
