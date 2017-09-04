const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

/*
GET /offices 
DELETE /offices/:id
POST /offices
*/

module.exports = router
