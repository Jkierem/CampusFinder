// server/index.js
'use strict';

const app = require('./app');

const PORT = process.env.REACT_APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
