const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.delete('/:id', (req, res, next) => {
  models.User.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(204).send(req.params.id);
    })
    .catch(next);
});

router.put('/:id/office/:officeId', (req, res, next) => {
  models.User.findById(req.params.id)
    .then(user => {
      console.log(req.params.officeId, typeof req.params.officeId)
      if (req.params.officeId === '0') return user.setOffice(null);
      else return user.setOffice(req.params.officeId);
    })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(next);

});

router.post('/:name', (req, res, next) => {
  models.User.create({ name: req.params.name })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
});

module.exports = router
