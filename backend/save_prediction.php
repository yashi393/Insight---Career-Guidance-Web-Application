<?php
require 'db.php';

$user_id = $_POST['user_id'];
$answers = $_POST['answers']; // JSON string
$total_score = $_POST['score'];
$predicted_domain = $_POST['domain'];

$stmt = $db->prepare("
INSERT INTO predictions (user_id, answers, total_score, predicted_domain)
VALUES (?, ?, ?, ?)");

$stmt->execute([$user_id, $answers, $total_score, $predicted_domain]);

echo "success";
?>

<?php
require 'db.php'; // assumes this file exists and connects to ../database/insight.db

// Accept only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Only POST allowed']);
    exit;
}

// Read POST data
// We accept JSON body or form-encoded
$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!$data) {
    // try form fields
    $answers = isset($_POST['answers']) ? $_POST['answers'] : null;
    $score = isset($_POST['score']) ? intval($_POST['score']) : null;
    $domain = isset($_POST['domain']) ? $_POST['domain'] : null;
    $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : null;
} else {
    $answers = isset($data['answers']) ? json_encode($data['answers']) : null;
    $score = isset($data['score']) ? intval($data['score']) : null;
    $domain = isset($data['domain']) ? $data['domain'] : null;
    $user_id = isset($data['user_id']) ? intval($data['user_id']) : null;
}

// ensure answers and domain exist
if (!$answers || !$domain) {
    echo json_encode(['status'=>'error','message'=>'Missing answers or domain']);
    exit;
}

try {
    $stmt = $db->prepare("INSERT INTO predictions (user_id, answers, total_score, predicted_domain) VALUES (?, ?, ?, ?)");
    $stmt->execute([$user_id, is_array($answers) ? json_encode($answers) : $answers, $score, $domain]);
    echo json_encode(['status'=>'success','message'=>'Saved']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
