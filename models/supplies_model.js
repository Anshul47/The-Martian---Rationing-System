const mysql = require('../db/dbconn.js');


var getAllSupplies = () => {
    
    var promise = new Promise((resolve, reject) => {
        var sql = 'select *, DATE_FORMAT(expiry_date, "%d %b, %Y")  as expiry_date from supplies';
        mysql.dbCon.query(sql, (err, rows, fields) => {
            
            if (!err) {
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            } else {
                reject({
                    data: rows,
                    err: 1,
                    err_msg: err
                })
            }
        });

    });
    return promise;
};


var getWaterSupplies = (waterArr) => {
    
    var promise = new Promise((resolve, reject) => {
        var sql = 'select sid, packet_id, packet_type, qty_in_litres from supplies where sid NOT IN (?) and packet_type = 2 Order by qty_in_litres ASC';
        if(waterArr.length <= 0 ){
            waterArr = '';
        }
        mysql.dbCon.query(sql, [waterArr], (err, rows, fields) => {
            
            if (!err) {
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            } else {
                reject({
                    data: rows,
                    err: 1,
                    err_msg: err
                })
            }
        });

    });
    return promise;
};


var getFoodSuppliesWithCurrentDate = (date, foodArr) => {
    
    var promise = new Promise((resolve, reject) => {
        var sql = 'select *, DATE_FORMAT(expiry_date, "%d %b, %Y")  as expiry_date from supplies where DATEDIFF(expiry_date, ?) = 0 and sid NOT IN (?) and packet_type = 1 Order by calories ASC';
        if(foodArr.length <= 0 ){
            foodArr = '';
        }
        mysql.dbCon.query(sql, [date, foodArr], (err, rows, fields) => {
            
            if (!err) {
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            } else {
                reject({
                    data: rows,
                    err: 1,
                    err_msg: err
                })
            }
        });

    });
    return promise;
};

var getFoodSupplies = (foodArr) => {
    
    var promise = new Promise((resolve, reject) => {
        var sql = 'select *, DATE_FORMAT(expiry_date, "%d %b, %Y")  as expiry_date from supplies where sid NOT IN (?) and packet_type = 1 Order by calories DESC';
        if(foodArr.length <= 0 ){
            foodArr = '';
        }
        mysql.dbCon.query(sql, [foodArr], (err, rows, fields) => {
            
            if (!err) {
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            } else {
                reject({
                    data: rows,
                    err: 1,
                    err_msg: err
                })
            }
        });

    });
    return promise;
};

var insertSupplies = (packet_id, packet_type, packet_content, calories, expiry_date, qty_in_litres) => {
    
    var promise = new Promise((resolve, reject) => {
        var sql = 'insert into supplies (sid, packet_id, packet_type, packet_content, calories, expiry_date, qty_in_litres, cdate) values (UUID(), ?, ?, ?, ?, ?, ?, NOW())';
        mysql.dbCon.query(sql, [packet_id, packet_type, packet_content, calories, expiry_date, qty_in_litres], (err, rows, fields) => {
            
            if (!err) {
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            } else {
                reject({
                    data: rows,
                    err: 1,
                    err_msg: err
                })
            }
        });

    });
    return promise;
};

var deleteSupplies = (sid) => {
    
    var promise = new Promise((resolve, reject) => {
        var sql = 'DELETE from supplies where sid = ?';
        mysql.dbCon.query(sql, [sid], (err, rows, fields) => {
            
            if (!err) {
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            } else {
                reject({
                    data: rows,
                    err: 1,
                    err_msg: err
                })
            }
        });

    });
    return promise;
};



module.exports = {
    getAllSupplies,
    getWaterSupplies,
    getFoodSuppliesWithCurrentDate,
    getFoodSupplies,
    insertSupplies,
    deleteSupplies
};