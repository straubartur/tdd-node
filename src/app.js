const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
const knex = require('knex')
const knexFile = require('../knexfile.js');

app.db = knex(knexFile.test);
const consign = require('consign');


consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app)


app.get('/', (req, res) => {
  res.send('okkay').status(200)
})

module.exports = app