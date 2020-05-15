const pool = require('../../config/db');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(first_name,last_name,email,username,password)
            values(?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.username,
                data.password
            ],
            (err,results,fields)=>{
                if(err){
                    return callBack(err);
                }
                return callBack(null, results)
            }
        )

    }
}