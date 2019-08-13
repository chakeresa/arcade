var express = require("express");
var router = express.Router();
var Store = require ('../../../models').Store;

/* GET all stores */
router.get("/", function (req, res, next) {
  Store.findAll()
  // Store.findAll({
  //   include: [{
  //     model: Games
  //   }]
  // })
    .then(stores => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(stores));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

/* GET one store */
router.get("/:storeId", function (req, res, next) {
  Store.findByPk(req.params.storeId)
    .then(store => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(store));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

/*POST new store*/
router.post("/", function (req, res, next) {
  Store.create({
    title: req.body.title,
    price: req.body.price,
    releaseYear: req.body.releaseYear,
    active: req.body.active
  })
    .then(store => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(store));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/*PUT update existing store*/
router.put("/:storeId", function (req, res, next) {
  Store.update(
    {
      title: req.body.title,
      price: req.body.price,
      releaseYear: req.body.releaseYear,
      active: req.body.active
    }, 
    {
      returning: true,
      where: {
        id: req.params.storeId
      }
    }
  )
    .then(([affectedCount, affectedRows]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(affectedRows[0]));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/*DELETE existing store*/
router.delete("/:storeId", function (req, res, next) {
  Store.destroy({
    where: {
      id: req.params.storeId
    }
  })
    .then(store => {
      res.setHeader("Content-Type", "application/json");
      res.status(204).send(JSON.stringify());
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router; //this should stay at the bottom of the file
