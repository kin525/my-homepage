<?php
$myFile = "station.js";
$file = fopen($myFile, 'r') or die("can't open file");
$Contactno="\"".$_GET['Contactno']."\",";
$StName="\"".$_GET['StName']."\",";
$StN="\"".$_GET['StN']."\",";
$StE="\"".$_GET['StE']."\",";
$StRL="\"".$_GET['StRL']."\""."]";
$i=0;
while(!feof($file))
  {
  fgets($file). "<br />";
  $i=$i+1;
  }
fclose($file);
  $Stationno=$i-10;
  $Stno="st[".$Stationno."]"."=[";
$fh = fopen($myFile, 'a') or die("can't open file"); 
$stationdata=$Stno.$Contactno.$StName.$StN.$StE.$StRL;
//echo "stationdata  : ".$stationdata;
$stringData =$stationdata."\r\n";

fwrite($fh,$stringData);

fclose($fh);

header( 'Location: Add Station.html' ) ;

?>




