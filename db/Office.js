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

const Office = db.define('office', defineAttr, defineOptions);

// .....class methods.....

module.exports = Office;
