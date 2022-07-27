const mysql = require("mysql");

class Connection {
  static createConnection() {
    let configToMySQL = {
      host: "localhost",
      user: "root",
      password: "123456",
      database: "case_study",
    };
    return mysql.createConnection(configToMySQL);
  }
}
module.exports = Connection;
