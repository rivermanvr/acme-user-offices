const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.get('/', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

router.put('/:id', (req, res, next) => {

});

router.post('/', (req, res, next) => {
  if (req.body.name) {
    models.User.create({ name: req.body.name })
      .then(() => {
        res.sendStatus(201)
      })
      .catch(next);
  } else {
    res.sendStatus(204)
  }
});

module.exports = router
