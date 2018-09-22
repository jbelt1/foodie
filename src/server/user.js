const config = require('./config.json');
const crypto = require('crypto');
const mysql = require('mysql');

const {database} = config;
const con = mysql.createConnection(database);

function getRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
}

function sha256(password, salt){
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword
}

function hashPassword(password) {
    const salt = getRandomString(16);
    const hashedPassword = sha256(password, salt);
    return {
        salt: salt,
        hashedPassword: hashedPassword
    }
}

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

function register(username, email, password) {
    const {salt, hashedPassword} = hashPassword(password);
    const sql = "INSERT INTO Users VALUES ?";
    userExists(username, (exists) => {
        if (!exists){
            const values = [
                [username, salt, hashedPassword, email]
            ];
            con.query(sql, [values], function (err, result, fields) {
                if (err) throw err;
            });
        }
        else {
        console.log("User Exists!");
        }
    })
}

function validatePassword(username, password, callback){
    const sql = "SELECT salt, hashed_password, email FROM Users WHERE username = ? "
    con.query(sql, [username], function (err, result) {
        if (err) throw err;
        const {salt, hashed_password, email} = result[0];
        const hashedPassword1 = sha256(password, salt);
        let validated = false;
        if (hashed_password === hashedPassword1) {
            validated = true;
        }
        callback(validated, email)
    });
}

function login(username, password, callback) {
    let ret = {};
    validatePassword(username, password, (validated, email) => {
        if (validated) {
            ret = {
                success: true,
                user: {
                    username: username,
                    email: email,
                }
            }
        }
        else {
            ret = {
                success: false
            }
        }
        callback(ret)
    })
}

module.exports = {
    register,
    login,
}