<?php
// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Get stopIds from query parameter
$stopIds = isset($_GET['stopIds']) ? $_GET['stopIds'] : '';

if (empty($stopIds)) {
    http_response_code(400);
    echo json_encode(['error' => 'No stopIds provided']);
    exit;
}

// Build API URL
$stopIdsArray = explode(',', $stopIds);
$params = array_map(function($id) {
    return 'stopId=' . urlencode(trim($id));
}, $stopIdsArray);
$apiUrl = 'https://www.wienerlinien.at/ogd_realtime/monitor?' . implode('&', $params);

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Handle errors
if ($error) {
    http_response_code(500);
    echo json_encode(['error' => 'API request failed', 'details' => $error]);
    exit;
}

// Return response
http_response_code($httpCode);
echo $response;
?>