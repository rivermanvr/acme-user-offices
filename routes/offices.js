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

  router.post('/:name/:lat/:lng', (req, res, next) => {
    models.Office.create({ name: req.params.name, lat: req.params.lat, lng: req.params.lng })
      .then(office => {
        return models.Office.findAll({
          where: { id: office.id },
          include: [models.User],
          order: [['id']]
        })
      })
      .then(office => {
        res.status(201).send(office);
      })
      .catch(next);
  });

module.exports = router
