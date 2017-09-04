const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
};

const defineOptions = {};

const User = db.define('user', defineAttr, defineOptions);

module.exports = User;
