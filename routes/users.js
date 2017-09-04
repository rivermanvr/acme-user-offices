const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

/*
GET /users 
DELETE /users/:id
PUT /users/:id
POST /users
*/

module.exports = router
