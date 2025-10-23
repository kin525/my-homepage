<?php
$myFile = "drainage_DATA.js";
$file = fopen($myFile, 'r') or die("can't open file");


$Manhole1="\"".$_GET['Manhole1']."\",";
$Pipe="\"".$_GET['Pipe']."\",";
$StN="\"".$_GET['StN']."\",";
$StE="\"".$_GET['StE']."\",";
$StIL="\"".$_GET['StIL']."\",";
$Manhole2="\"".$_GET['Manhole2']."\",";
$EN="\"".$_GET['EN']."\",";
$EE="\"".$_GET['EE']."\",";
$EIL="\"".$_GET['EIL']."\""."]";
















$i=0;
while(!feof($file))
  {
  fgets($file). "<br />";
  $i=$i+1;
  }
fclose($file);
  $Stationno=$i-9;
  $Stno="Drainageinput[".$Stationno."]"."=[";
$fh = fopen($myFile, 'a') or die("can't open file"); 
$stationdata=$Stno.$Manhole1.$Pipe.$StN.$StE.$StIL.$Manhole2.$EN.$EE.$EIL;



//echo "stationdata  : ".$stationdata;
$stringData =$stationdata."\r\n";

fwrite($fh,$stringData);

fclose($fh);

header( 'Location: Add DrainageData.html' ) ;

?>




