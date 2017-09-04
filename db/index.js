const db = require( './db' );
const User = require( './User' );
const Office = require( './Office' );

User.belongsTo(Office);
Office.hasMany(User, { foreignKey: 'officeId' });

const sync = () => db.sync({ force: true });

const seed = () => {
  return sync()
    .then(() => {
      const promiseArr = [];
      const address = [
        '5 Hanover Square, New York, NY, USA',
        '390 7th Ave, New York, NY 10001, USA',
        '2 Penn Plaza, New York, NY',
      ];
      const lat = [
        '40.7050758',
        '40.749728',
        '40.750076',
      ];
      const lng = [
        '-74.00916039999998',
        '-73.99167499999999',
        '-73.992194',
      ];
      for (let i = 0; i<address.length; i++) {
        promiseArr.push(
          Office.create({
            name: address[i],
            lat: lat[i],
            lng: lng[i]
          })
        )
      }
      return Promise.all(promiseArr);
    })
    .then(() => {
      const users = ['Moe', 'Larry', 'Curly', 'Vince'];
      const promiseArr = users.map(user => {
        return User.create({ name: user });
      })
      return Promise.all(promiseArr);
    })
    .then(users => {
      return Promise.all([
        users[0].setOffice(3),
        users[1].setOffice(1),
        users[2].setOffice(3),
        users[3].setOffice(2),
      ])
    })
};

module.exports = {seed, sync, models: { User, Office } };
