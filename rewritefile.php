<?php
$myFile = "station.js";
$file = fopen($myFile, 'r') or die("can't open file");
$Contactno="=["."\"".$_GET['Contactno']."\",";
$StName="\"".$_GET['StName']."\",";
$StN="\"".$_GET['StN']."\",";
$StE="\"".$_GET['StE']."\",";
$StRL="\"".$_GET['StRL']."\""."]";
$stationdata=$Contactno.$StName.$StN.$StE.$StRL;
//echo $stationdata;
//echo "<br />";
//echo "<br />";
//echo "<br />";
//function Checkstationdata($tempdata)
//{
//echo "$fname Refsnes.<br>";

//$j=strlen($tempdata)

//strchr($tempdata,205);


//}








$filedata=array();
$i=0;
while(!feof($file))
  {
  $tempdata=fgets($file);
  //echo $tempdata;
  $filedata[] = rtrim(strchr($tempdata,61));
  $i=$i+1;
  }
fclose($file);
 $dataend=$i; 
$filenewdata=array();
$j=1;
for ($i=10; $i<=$dataend; $i++)
    {
    $filenewdata[$j]="st[".$j."]".$filedata[$i];
    if ($filedata[$i] == $stationdata)
    {
    $j=$j-1;
    $rewritefile="YES";
    }
    $j=$j+1;
    }
//for ($j=1; $j<=$dataend-12; $j++)
  //  {
    //echo $filenewdata[$j]."<br />";    
    //}

if ($rewritefile == "YES")
{
echo "Ready For Delete";
//$fh = fopen('output.txt', 'w');
//$stringData =""."\r\n";
//fwrite($fh,$stringData);
//$stringData ="//JavaScript Limit of Station 1000"."\r\n";
//fwrite($fh,$stringData);
//$stringData ="//Station Data Input"."\r\n";
//fwrite($fh,$stringData);
//$stringData =""."\r\n";
//fwrite($fh,$stringData);
//$stringData =""."\r\n";
//fwrite($fh,$stringData);
//$stringData =""."\r\n";
//fwrite($fh,$stringData);
//$stringData ="//Contact Number HY-2008-11"."\r\n";
//fwrite($fh,$stringData);
//$stringData =""."\r\n";
//fwrite($fh,$stringData);
//$stringData ="var st=new Array()"."\r\n";
//fwrite($fh,$stringData);
//$stringData = "st[0]=["."\""."Station Name"."\"".","."\""."\""."]"."\r\n";
//fwrite($fh,$stringData);





//for ($j=1; $j<=$dataend-10; $j++)
 //{
 //fwrite($fh,$filenewdata[$j]."\r\n");
// }


//fclose($fh);
}


header( 'Location: Check Station2.html' ) ;

?>


