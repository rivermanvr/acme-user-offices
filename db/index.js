const db = require( './db' );
const User = require( './User' );
const Office = require( './Office' );

User.belongsTo(Office);
Office.hasMany(User);

const sync = () => db.sync({ force: true });

const seed = () => {
  return sync()
    .then(() => {
      // const promiseArr = [
      // ]
      // return Promise.all(promiseArr);
    }
  )
};

module.exports = {seed, sync, models: { User, Office } };

