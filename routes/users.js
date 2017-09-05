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

router.post('/:name', (req, res, next) => {
  models.User.create({ name: req.params.name })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(next);
});

module.exports = router
