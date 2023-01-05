import db from '../../db/mysql';


export default function handler(req, res) {
    const { address_id } = req.body;
    if (address_id === null || address_id === undefined) {
        return res.status(406).json({
            success: false,
            msg: 'address_id is required!',
            data: {}
        })
    }
    const query  =  `delete from addresses where id = ?`;
    db.query(query, address_id, function (error, results, fields) {
        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
                data: {}
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: 'Address Deleted!',
                data: {}
            });
        }
    });
    
  
}
