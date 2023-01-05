import { createConnection } from "mysql";
var connection = createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect();

connection.query('SELECT 1+1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is:', results[0].solution);
});

// //connection.end();s



export default connection;