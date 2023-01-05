import db from '../../db/mysql';


export default function handler(req, res) {
    const {mobile} = req.body;
    if(mobile === null  || mobile ===  undefined){
        return res.status(406).json({
            success: false,
            msg: 'mobile is required!',
            data: {}
        })
    }
    const query = `select * from users where mobile = ? ;`;
    db.query(query, mobile , function (error, results, fields) {
        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
                data: {}
            })
        } else {
            if(results[0]){
                return res.status(200).json({
                    success: true,
                    msg: 'User found!',
                    data: results[0]
                });
            }
            return res.status(200).json({
                success: false,
                msg: 'No user found!',
                data: {}
            });
            
        }
    });
}
