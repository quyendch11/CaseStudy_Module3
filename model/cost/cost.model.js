const Connection = require("../connection");

class Cost {
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

  getdetailCost(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `select * from Costs where costcategorieid = ${id}; `,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  createCost(cost) {
    let insertQuery = `insert into Costs(costdate, note, money, costcategorieid, userid)
                           VALUES ('${cost.costdate}', '${cost.note}', ${cost.money}, ${cost.costcategorieid}, ${cost.userid})`;
    this.connection.query(insertQuery, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Insert success");
      }
    });
  }

  getCost(id) {
    return new Promise((resolve, reject) => {
      let query = `select * from Costs where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  getAllCost() {
    return new Promise((resolve, reject) => {
      let query = `select * from Costs`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  updateCost(id, cost) {
    let query = `update costs set costdate = '${cost.costdate}', note = '${cost.note}', money= ${cost.money}, userid= ${cost.userid} where id = ${id}`;
    this.connection.query(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Update success");
      }
    });
  }

  getcostcategorieid(id) {
    let query = `select * from costs where id = ${id}`;
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  updatePage() {}
  deleteCost(id) {
    let query = `delete from Costs where id = ${id}`;
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Cost;
