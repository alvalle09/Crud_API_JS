var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router
  .route("/products")
  .get((req, res) => {
    res.send(db.get("products").value());
  })
  .post((req, res) => {
    const newProduct = req.body;
    res.send(db.get("products").insert(newProduct).write());
  });

  router.route("/products/search").get((req, res) => {
    const keywords = req.query.keywords.split(" ");
    console.log(keywords);
    const result = db.get("products").filter((_) => {
      const fullText = _.description + _.name + _.color;

      return keywords.every((_) => fullText.indexOf(_) !== -1);
    });

    res.send(result);
  });
  
  router
  .route('/products/:id')
  .delete((req, res) => {
    db.get("products").remove({id: req.params.id}).write();
    res.status(204).send();
  })
  .get((req, res) => {
    const result = db.get("products").find({id: req.params.id}).value();
    if (result) {
      res.send(result);
    }
    else {
      res.status(404).send();
    }
  })
  .patch((req, res) => {
      db.get("products").find({id: req.params.id}).assign(req.body).write();
  });
  
  return router;
};

