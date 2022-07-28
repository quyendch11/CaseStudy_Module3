const Connection = require("./connection");
const _ = require("lodash");
class UserModel {
  constructor() {
    this.connection = Connection.createConnection();
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connect success!");
      }
    });
  }
  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query("select * from users", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  create(user) {
    console.log(user);
    let insertQuery = `INSERT INTO users(username, password)
    VALUE('${user.username}','${user.password}');`;
    this.connection.query(insertQuery, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Insert success");
      }
    });
  }
  async findUserByUsername(username) {
    let users = await this.getAll();
    let user = _.find(users, (o) => o.username == username);
    return user;
  }
  getRoleUser(id) {
    let query = ` select roles.name
                  from users
                  join userrole on userrole.user_id = users.id
                  join roles on roles.id = userrole.role_id where users.id = ${id} ;`;
    return new Promise((resole, rejeect) => {
      this.connection.query(query, (err, data) => {
        if (err) {
          rejeect(err);
        } else {
          resole(data);
        }
      });
    });
  }
}
module.exports = UserModel;
