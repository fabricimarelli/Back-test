const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const routerProducts = require('./Router/routeProducts');
const { ConnectionDB } = require('./DataBase/config');
const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());
app.use(cors());

app.use('/products', routerProducts);


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ConnectionDB();
});

//OK