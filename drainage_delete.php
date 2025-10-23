<?php
$myFile = "drainage_DATA.js";
$file = fopen($myFile, 'r') or die("can't open file");


$Manhole1="=["."\"".$_GET['Manhole1']."\",";
$Pipe="\"".$_GET['Pipe']."\",";
$StN="\"".$_GET['StN']."\",";
$StE="\"".$_GET['StE']."\",";
$StIL="\"".$_GET['StIL']."\",";
$Manhole2="\"".$_GET['Manhole2']."\",";
$EN="\"".$_GET['EN']."\",";
$EE="\"".$_GET['EE']."\",";
$EIL="\"".$_GET['EIL']."\""."]";









$stationdata=$Manhole1.$Pipe.$StN.$StE.$StIL.$Manhole2.$EN.$EE.$EIL;

// echo $stationdata;







$filedata=array();
$i=0;
while(!feof($file))
  {
  $tempdata=fgets($file);
  
  $temp= rtrim(strchr($tempdata,61));   
  echo $temp;
  
  $filedata[] = rtrim(strchr($tempdata,61));
  $i=$i+1;
  }
fclose($file);
 $dataend=$i; 
$filenewdata=array();
$j=1;
for ($i=9; $i<=$dataend; $i++)
    {
    $filenewdata[$j]="Drainageinput[".$j."]".$filedata[$i];
    if ($filedata[$i] == $stationdata)
    {
    $j=$j-1;
        }
    $j=$j+1;
    }
//for ($j=1; $j<=$dataend-12; $j++)
  //  {
    //echo $filenewdata[$j]."<br />";    
    //}

$fh = fopen('drainage_DATA.js', 'w');
$stringData =""."\r\n";
fwrite($fh,$stringData);
$stringData ="//JavaScript Limit of Station 1000"."\r\n";
fwrite($fh,$stringData);
$stringData ="//Station Data Input"."\r\n";
fwrite($fh,$stringData);
$stringData =""."\r\n";
fwrite($fh,$stringData);
$stringData =""."\r\n";
fwrite($fh,$stringData);
$stringData =""."\r\n";
fwrite($fh,$stringData);
$stringData ="//Contact Number HY-2013-03"."\r\n";
fwrite($fh,$stringData);
$stringData =""."\r\n";
fwrite($fh,$stringData);
$stringData ="var Drainageinput=new Array()"."\r\n";
// fwrite($fh,$stringData);
// $stringData = "st[0]=["."\""."Station Name"."\"".","."\""."\""."]"."\r\n";
fwrite($fh,$stringData);





for ($j=1; $j<=$dataend-11; $j++)
{
fwrite($fh,$filenewdata[$j]."\r\n");
 }


fclose($fh);



 header( 'Location: drainage.html' ) ;

?>


