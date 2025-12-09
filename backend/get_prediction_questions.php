<?php
header('Content-Type: application/json');

// path to questions.json (adjust if your structure differs)
$questionsFile = __DIR__ . '/../data/questions.json';

if (!file_exists($questionsFile)) {
    echo json_encode(['error' => 'questions.json not found']);
    exit;
}

$content = file_get_contents($questionsFile);
$data = json_decode($content, true);

if (!isset($data['prediction_test'])) {
    echo json_encode(['error' => 'prediction_test not found in JSON']);
    exit;
}

echo json_encode($data['prediction_test']);
