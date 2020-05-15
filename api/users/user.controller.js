const {create} = require('./user.service');
const bcrypt = require('bcrypt');

module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt= bcrypt.genSalt()
        const hashedPassword= bcrypt.hash(body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        create(body, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    }
}

