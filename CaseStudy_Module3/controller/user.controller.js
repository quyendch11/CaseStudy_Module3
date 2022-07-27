const User = require('../model/user.model');
const fs = require('fs');
const qs = require('qs');
const url = require("url");
const users = new User();


class UserController {
    constructor() {
    }

    showUserListPage(req, res) {
        fs.readFile('view/user/list.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('file is not')
            } else {
                let user = await users.getUser();
                let tBody = '';
                for (let index = 0; index < user.length; index++) {
                    tBody += `<tr>
                                     <td>${index + 1}</td>
                                     <td>${user[index].usename}</td>
                                     <td>${user[index].password}</td>
                                     <td>${user[index].status}</td>                                  
                                     <td >
                                    <a href="/user/edit/${user[index].id}" class="btn btn-primary" >Edit</a>
                                    <input hidden name="id" value="${user[index].id}" >
                                     <a href="/user/delete/${user[index].id}" class=" btn btn-danger" onclick="confirm('Bạn có thực sự muốn xóa? ')"> Delete</a>

                                     </td>
                                 </tr>`
                }
                data = data.replace('{user}', tBody);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    };

    showDeletePage(req, res) {
        fs.readFile('view/user/delete.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('file is not')
            } else {
                let id = req.params.id;
                data = data.replace('{id}', id);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    };

    deleteUserById(req, res) {
        let idDelete = req.params.id
        users.delete(idDelete)
        res.writeHead(301, {location: '/user'});
        return res.end()
    }

    searchUser(req, res) {
        fs.readFile('view/user/search.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('file is not')
            } else {
                let user = await users.getUser();
                let tBody = '';
                for (let index = 0; index < user.length; index++) {
                    tBody += `<tr>
                                     <td>${index + 1}</td>
                                     <td>${user[index].usename}</td>
                                     <td>${user[index].password}</td>
                                     <td>${user[index].status}</td>                                                                    
                                 </tr>`
                }
                data = data.replace('{user}', tBody);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    showUserEdit(req, res) {
        fs.readFile('view/user/edit.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('file is not')
            } else {
                let idUpdate = req.params.id
                let user = await users.getUsers(idUpdate);
                if (user.length > 0) {
                    data = data.replace('{id}', user[0].id);
                    data = data.replace('{username}', user[0].usename);
                    data = data.replace('{password}', user[0].password);
                    data = data.replace('{status}', user[0].status);
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }

    editUser(req, res) {
        let data = '';
        let id = req.params.id
        req.on('data', chunk => {
            data += chunk
        });
        req.on('end', () => {
            let user = qs.parse(data);
            users.userUpdate(id, user);
            res.writeHead(301, {
                    location: '/user'
                });
            return res.end();
        })

    }
}

module.exports = UserController;