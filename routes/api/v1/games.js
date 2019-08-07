var express = require("express");
var router = express.Router();
var Game = require ('../../../models').Game;

/* GET all games */
router.get("/", function (req, res, next) {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

/* GET one game */
router.get("/:gameId", function (req, res, next) {
  Game.findByPk(req.params.gameId)
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

/*POST new game*/
router.post("/", function (req, res, next) {
  Game.create({
    title: req.body.title,
    price: req.body.price,
    releaseYear: req.body.releaseYear,
    active: req.body.active
  })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/*PUT update existing game*/
router.put("/:gameId", function (req, res, next) {
  Game.findByPk(req.params.gameId)
    .then(game => {
      game.update({
        title: req.body.title,
        price: req.body.price,
        releaseYear: req.body.releaseYear,
        active: req.body.active
      });
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/*DELETE existing game*/
router.delete("/:gameId", function (req, res, next) {
  Game.destroy({
    where: {
      id: req.params.gameId
    }
  })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(204).send(JSON.stringify());
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router; //this should stay at the bottom of the file
