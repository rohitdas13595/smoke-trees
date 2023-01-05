import db from '../../db/mysql';


export default function handler(req, res) {
    const {user_id} = req.body;
    if(user_id === null  || user_id ===  undefined){
        return res.status(406).json({
            success: false,
            msg: 'user_id is required!',
            data: {}
        })
    }
    const query = `select * from addresses where user_id = ?`;
    db.query(query,user_id, function (error, results, fields) {
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
                    msg: 'User Addresses!',
                    data: results || []
                });
            }
            return res.status(200).json({
                success: true,
                msg: 'No user found!',
                data: {}
            });
            
        }
    });
}
