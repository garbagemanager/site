<?php
$file = 'messages.txt';

if (file_exists($file) && filesize($file) > 0) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines) {
        foreach (array_reverse($lines) as $line) {
            echo "<p>" . htmlspecialchars($line) . "</p>";
        }
    } else {
        echo "<p>Сообщений пока нет.</p>";
    }
} else {
    echo "<p>Сообщений пока нет.</p>";
}
?>