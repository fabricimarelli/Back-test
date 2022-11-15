const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const routerProducts = require('./Router/routeProducts');
const seeder = require('./Helpers/seeder')
const { ConnectionDB } = require('./DataBase/config');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res
    .type('text/plain')
    .send(
      'Server OK, use "https://products-rest-node.herokuapp.com/products" to redirect products'
    );
});

app.use('/products', routerProducts);


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ConnectionDB();
  await seeder();
});
