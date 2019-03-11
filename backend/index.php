<?php
$out = "wrong params!";
if (isset($_POST['email'], $_POST['pwd'])){
    $out = $_POST['email'] . " : " . $_POST['pwd'];
}

echo $out;
?>