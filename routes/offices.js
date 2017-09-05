const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

  router.delete('/:id', (req, res, next) => {
    models.Office.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(204).send(req.params.id);
      })
      .catch(next);
  });

  router.post('/:name', (req, res, next) => {
    models.Office.create({ name: req.params.name })
      .then(office => {
        res.status(201).send(office);
      })
      .catch(next);
  });

module.exports = router
