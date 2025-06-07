const mysql = require('mysql2');

// Create a database connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'GLITCHGOD',
  database: 'cas2',
});

// Export the pool
module.exports = db;
