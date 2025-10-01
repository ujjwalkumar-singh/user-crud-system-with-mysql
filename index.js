// const { faker } = require("@faker-js/faker");
const mysql = require("mysql2")
const express = require('express')
const app = express();
const path = require('path')
const methodOverride = require("method-override");
const { log } = require("console");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta',
    password: "nitapturta"
})



//HOME ROUTE
app.get("/", (req, res) => {
    let q = "SELECT count(*) from user;"
    try {
        connection.query(q, (err, result) => {
            let count = result[0]['count(*)']
            res.render("home.ejs", { count });
        })
    } catch (error) {
        console.log(err);

    }
})

//SHOW ROUTE
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user;`;
    try {
        connection.query(q, (err, result) => {
            res.render("showUsers.ejs", { result })
        })
    } catch (error) {

    }
})


//EDIT ROUTE
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `select * from user where id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            let user = result[0];
            res.render("edit.ejs", { user })
        })
    } catch (error) {

    }
})

//UPDATE DATA ROUTE
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    const password = req.body.pass;
    const username = req.body.username;
    let q = `select * from user where id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (password === result[0].password) {
                let q2 = 'UPDATE user SET username = ? WHERE id= ?;'
                try {
                    connection.query(q2, [username, id], (err, result) => {
                        if (err) throw err;
                        res.redirect("/user");
                    })
                } catch (error) {
                    console.log(err);

                }
            }
            else {
                res.send("Incorrect password");
            }

        })
    } catch (error) {
        console.log(err);

    }
})

//CREATE USER ROUTE
app.get("/user/create", (req, res) => {
    res.render("addUser.ejs")
})

//ADDING NEW USER ROUTE
app.post("/user/create", (req, res) => {
    console.log(req.body);
    const { id, username, email, password } = req.body;
    const q = 'INSERT INTO user (id, username,email, password) VALUES (?,?,?,?);'
    const data = [id, username, email, password];
    try {
        connection.query(q, data, (err, result) => {
            if (err) throw err;
            res.redirect("/user");
        });
    } catch (error) {
        console.log(error);

    }

})

//DELETE FORM ROUTE
app.get("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `select * from user where id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            let user = result[0];
            res.render("deleteUser.ejs", { user });
        })
    } catch (error) {
        console.log(error);

    }


})

//DELETEING USER ROUTE
app.delete("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    console.log(req.body);
    let q = `select * from user where email=? AND password=?`;
    try {
        connection.query(q, [email, password], (err, result) => {
            if (err) throw err;
            console.log(":kiju");
            console.log(result);
            if (result.length === 0) {
                return res.redirect(`/user/${id}/delete`)
            }
            let q2 = "DELETE FROM user WHERE email=? AND password=?"
            connection.query(q2, [email, password], (err, result) => {
                res.redirect("/")
            })
        })
    } catch (error) {
        console.log(error);
    }


})
app.listen("8000", () => {
    console.log(`server is listening on port 8000`);

})

// let createRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password(),
//     ]
// };