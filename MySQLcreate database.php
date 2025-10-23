<html>
<body>
<?php
$con = mysql_connect("sql113.byethost32.com","b32_7792303","96542244");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

// Create database
if (mysql_query("CREATE DATABASE b32_7792303_station_db",$con))
  {
  echo "Database created";
  }
else
  {
  echo "Error creating database: " . mysql_error();
  }

// Create table
mysql_select_db("b32_7792303_station_db", $con);
$sql = "CREATE TABLE Persons
(
Contractnumber varchar(20),
Stationname varchar(20),
Nx int
Ex int
Rl int
)";

// Execute query
mysql_query($sql,$con);

mysql_close($con);
?>
</body>
</html>