const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );
const bodyParser = require( 'body-parser' );
const routesUsers = require( './routes/users' );
const routesOffices = require( './routes/offices' );
const methodOverride = require( 'method-override' );
const morgan = require( 'morgan' );

const db = require( './db' );
const models = db.models;

swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/source', express.static(path.join(__dirname, 'source')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use('/vendor/jquery', express.static(path.join(__dirname, 'node_modules/jquery')));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', routesUsers);
app.use('/offices', routesOffices);

app.get('/seed', (req, res, next) => {
  Promise.all([
    models.User.findAll({
      include: [models.Office],
      order: [['id']]
    }),
    models.Office.findAll({
      include: [models.User],
      order: [['id']]
    })
  ])
  .then(results => {
    res.send(results);
  })
})

app.get('/', (req, res, next) => {
  res.render('index');
})

// ......our error middleware.......

app.use((req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', { error: err });
});

module.exports = app;
