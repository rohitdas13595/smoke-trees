import db from '../../db/mysql';


export default function handler(req, res) {
    const { user_id, address1, address2, address3, city, state, pincode } = req.body;
    if (user_id === null || user_id === undefined) {
        return res.status(406).json({
            success: false,
            msg: 'user_id is required!',
            data: {}
        })
    }
    const query  =  `insert  into addresses(user_id ,address1, address2, address3, city, state, pincode)
    values(?,?,?,?,?,?,?)`;
    db.query(query, [user_id, address1, address2, address3, city, state, pincode], function (error, results, fields) {
        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
                data: {}
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: 'Address Created!',
                data: {}
            });
        }
    });
    
  
}
