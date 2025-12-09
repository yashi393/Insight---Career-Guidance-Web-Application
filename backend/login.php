<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../login.html");
    exit();
}

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    header("Location: ../login.html?error=missing");
    exit();
}

try {
    $stmt = $db->prepare("SELECT id, username, password FROM users WHERE username = ? OR email = ? LIMIT 1");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // store username in session (use the username column)
        $_SESSION['username'] = $user['username'];

        // Redirect to homepage (index.php)
        header("Location: ../index.php");
        exit();
    } else {
        // invalid credentials
        header("Location: ../login.html?error=invalid");
        exit();
    }
} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    header("Location: ../login.html?error=server");
    exit();
}
?>
