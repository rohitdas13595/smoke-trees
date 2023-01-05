import db from '../../db/mysql';


export default function handler(req, res) {
    const { name, mobile } = req.body;
    if (name === null || name === undefined) {
        return res.status(406).json({
            success: false,
            msg: 'name is required!',
            data: {}
        })
    }
    if (mobile === null || mobile === undefined) {
        return res.status(406).json({
            success: false,
            msg: 'mobile is required!',
            data: {}
        })
    }
    const query = `insert into users(name, mobile) values(?,?);`;
    db.query(query, [name, mobile], function (error, results, fields) {
        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
                data: {}
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: 'User Created!',
                data: {}
            });
        }
    });
}
