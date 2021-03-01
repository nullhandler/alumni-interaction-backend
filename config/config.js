const fs = require('fs');

module.exports = {
  "development": {
    "username": "postgres",
    "password": "1234",
    "database": "selva",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "timezone": "Asia/Kolkata"
  },
  "test": {
    "username": "selva",
    "password": "1234",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "timezone": "Asia/Kolkata"
  },
  "production": {
    "username": "selva",
    "password": "1234",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "timezone": "Asia/Kolkata"
  }
}