var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "saketh@123",
  database: "mydb"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM customers LIMIT 2, 5";
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log( result);
    });
  });

  