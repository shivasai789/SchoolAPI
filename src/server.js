'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mysql = require('mysql2');
const school = require('./routes/school')

let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

const connection = mysql.createConnection({
    host: 'bke0yfbakk3qqmf6z3lx-mysql.services.clever-cloud.com', // Or the IP address/domain of your server
    user: 'ulqhgsnuaji96bwq',
    password: 'INhxf20szilb5DDkVv0U',
    database: 'bke0yfbakk3qqmf6z3lx'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id', connection.threadId);
  });

  app.use('/api/v1', school);

app.listen(port, () => {
    console.log(`Server Listining On port : ${port}`)
});