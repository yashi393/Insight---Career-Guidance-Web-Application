<?php
$host = "sql100.infinityfree.com";
$dbname = "if0_40568713_insight_database";
$user = "if0_40568713";
$pass = "JVyn126327"; // your XAMPP password, usually empty

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("DB Error: " . $e->getMessage());
}
?>
