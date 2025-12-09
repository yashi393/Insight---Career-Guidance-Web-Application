<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../login.html");
    exit();
}

$first = trim($_POST['first_name'] ?? '');
$last  = trim($_POST['last_name'] ?? '');
$email = trim($_POST['email'] ?? '');
$user  = trim($_POST['username'] ?? '');
$pass  = $_POST['password'] ?? '';

if (!$first || !$last || !$email || !$user || !$pass) {
    header("Location: ../login.html?reg_error=missing");
    exit();
}

try {
    // check duplicates
    $check = $db->prepare("SELECT id, email, username FROM users WHERE email = ? OR username = ? LIMIT 1");
    $check->execute([$email, $user]);
    $row = $check->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        if ($row['email'] === $email) {
            header("Location: ../login.html?reg_error=email_exists");
            exit();
        }
        if ($row['username'] === $user) {
            header("Location: ../login.html?reg_error=username_exists");
            exit();
        }
    }

    // insert new user (fixed NOW())
    $hashed = password_hash($pass, PASSWORD_DEFAULT);
    $stmt = $db->prepare("
        INSERT INTO users 
        (first_name, last_name, email, username, password, created_at) 
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$first, $last, $email, $user, $hashed]);

    header("Location: ../register.html?registered=1");
    exit();

} catch (PDOException $e) {
    error_log("Register error: " . $e->getMessage());
    header("Location: ../login.html?reg_error=server");
    exit();
}
?>
