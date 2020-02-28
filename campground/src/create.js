var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saketh@123",
    database: "p1"
  });

  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO user values()`;
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log( result);
    });
  });
