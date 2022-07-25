const mysql = require('mysql');

class Connection {

    static createConnection() {
        let configToMySQL = {
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'Case_study'
        };
        return mysql.createConnection(configToMySQL);
    }
}
module.exports = Connection;
