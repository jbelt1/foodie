const jwt = require('jsonwebtoken');
const config = require('./config.json');
const mysql = require('mysql');
const bcrypt = require('bcrypt');


const {database, secret} = config;
const con = mysql.createConnection(database);

function userExists(username,callback) {
    const sql = "SELECT username FROM Users";
    con.query(sql, function(err, result) {
        let exists = false;
        result.forEach(res => {
            if (res.username === username){
                exists = true;
            }
        })
        callback(exists);        
    });
}

function register(req, res) {
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = "INSERT INTO Users VALUES ?";
    userExists(username, (exists) => {
        if (!exists){
            const values = [
                [username, hashedPassword, email]
            ];
            con.query(sql, [values], function (err, result, fields) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    return res.status(200).json({
                        message: "New user succesfully registed"
                    });
                }
            });
        }
        else {
            res.json({
                message: "Username already exists"
            })
        }
    })
}

function login(req, res) {
    const {username, password} = req.body;
    let ret = {};
    const sql = "SELECT username, hashed_password, email FROM Users WHERE username = ?";
    con.query(sql, [username], (err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            const {hashed_password, username, email} = result[0];
            bcrypt.compare(password, hashed_password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                else if (result) {
                    const JWTToken = jwt.sign({
                        email: email,
                        username: username,
                    },
                    secret,
                    {
                        expiresIn: "24h"
                    });
                    return res.status(200).json({
                        success: "Authorized",
                        email: email,
                        token: JWTToken
                    })
                }
                else {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
            });
        }
    })
}

module.exports = {
    register,
    login,
}