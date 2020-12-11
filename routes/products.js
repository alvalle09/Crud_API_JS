var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router.get("/products", (req, res) => {
    res.send(db.get("products").value());
  });

  router.post("/products", (req, res) => {
    const newProduct = req.body;
    res.send(db.get("products").insert(newProduct).write());
  });

  return router;
};

