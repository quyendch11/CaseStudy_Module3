const mysql = require('mysql2')
class Connection{
    static createConnection(){
        let configmysql = {
            'host': 'localhost',
            'user': 'root',
            'password': '123456',
            'database': 'case_study',
        };
        return mysql.createConnection(configmysql);
    }
}
module.exports = Connection;