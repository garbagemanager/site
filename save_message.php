<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    if (!empty($name) && !empty($email) && !empty($message)) {
        $timestamp = date('Y-m-d H:i:s');
        $log = $timestamp . " - Имя: " . $name . ", Email: " . $email . ", Сообщение: " . $message . "\n";
        $file = 'messages.txt';

        if (!file_exists($file)) {
            file_put_contents($file, '');
        }

        if (file_put_contents($file, $log, FILE_APPEND | LOCK_EX)) {
            echo "Сообщение сохранено!";
        } else {
            http_response_code(500);
            echo "Ошибка сохранения сообщения.";
        }
    } else {
        http_response_code(400);
        echo "Заполните все поля.";
    }
} else {
    http_response_code(405);
    echo "Метод не разрешен.";
}
?>