const fs = require("fs");
const qs = require("qs");
const UserModel = require("../../model/user.model");
let bcrypt = require("bcrypt");
var cookie = require("cookie");
const userModel = new UserModel();
class UserController {
  // constructor() {
  //   this.user = new UserModel();
  // }
  showRegisterPage(req, res) {
    fs.readFile("view/client/register.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }
  showLoginPage(req, res) {
    fs.readFile("view/client/login.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }
  regiter(req, res) {
    let data = "";
    req.on("data", (chuck) => {
      data += chuck;
    });

    req.on("end", async () => {
      let userdata = qs.parse(data);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(userdata.password, salt);
      let user = {
        username: userdata.username,
        password: hashed,
      };
      userModel.create(user);
      res.end();
    });
  }
  login(req, res) {
    let data = "";
    req.on("data", (chuck) => {
      data += chuck;
    });

    req.on("end", async () => {
      let userdata = qs.parse(data);
      let user = await userModel.findUserByUsername(userdata.username);
      const validPassword = await bcrypt.compare(
        userdata.password,
        user.password
      );
      if (user && validPassword) {
        let expires = Date.now() + 60 * 60 * 60 * 24 * 7;
        let role = await userModel.getRoleUser(user.id);
        let tokenSession =
          '{"id":"' +
          user.id +
          '","role":"' +
          role[0].name +
          '","expires":' +
          expires +
          "}";
        fs.writeFile("token/" + expires + ".txt", tokenSession, (err) => {
          console.log(err);
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("Token", String(expires), {
              httpOnly: true,
            })
          );
          res.writeHead(301, { Location: "/" });
          res.end();
        });
      }
    });
  }
  logout(req, res) {
    let cookies = cookie.parse(req.headers.cookie || "");
    let fileName = "token/" + cookies.Token + ".txt";
    fs.unlink(fileName, (err) => {
      if (err) throw err;
      console.log("File deleted!");
    });
    res.writeHead(301, { location: "/login" });
    res.end();
  }
  readSession(req, res, next) {
    let cookies = cookie.parse(req.headers.cookie || "");
    if (cookies.Token) {
      var sessionString = "";
      let expires = 0;
      fs.readFile("token/" + cookies.Token + ".txt", "utf8", (err, data) => {
        if (err) {
          console.error("error" + err.message);
          return;
        }
        sessionString = String(data);
        expires = JSON.parse(sessionString).expires;
        var now = Date.now();
        if (now < expires) {
          next();
        } else {
          res.writeHead(301, { location: "/login" });
          res.end();
        }
      });
    } else {
      res.writeHead(301, { location: "/login" });
      res.end();
    }
  }
}
module.exports = UserController;
