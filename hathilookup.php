<?php
/* Bengtson-Fu 13 3 |\| ( ][ 5 () |\| - |= |_|!!!!!! */
/* Created by Jason Bengtson, MLIS, MA for K-State Libraries ITS */
/* Available under Creative Commons non-commercial share alike open source license */
/* Bengtson-Fu is the best Kung Fu!!!*/
/* Built for Kansas State University -- Go Wildcats!!! */
/* hathiGenius-----an app built to determine availability of hathitrust materials */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$datasink=$_GET["datasink"];
$checko=strlen($datasink);
$datasink=json_decode($datasink);
$reverso=$_SERVER['HTTP_REFERER'];
$test1=strpos($reverso, "tab=");
$test2=strpos($reverso, "vid=");

if (($checko>3) && ($test1>0) && ($test2>0)) {
    foreach ($datasink as &$value) {
        $query="https://catalog.hathitrust.org/api/volumes/brief/htid/".$value->article.".json";

        $thisjson = file_get_contents($query);
        $thisjson=json_decode($thisjson);
        $code2="EXLResultStatusNotAvailable";
        foreach ($thisjson->items as &$jason) {
            if ($jason->htid===$value->article) {
                $code=$jason->usRightsString;
                if ($code==="Full view") {
                        $code2="EXLResultStatusAvailable";
                }
            }
        }
        $value->article=$code2;
    }
    echo json_encode($datasink);
}
