<?php
//$filename = 'snippet.csv';
$filename = 'no-emoji-img.csv';

if (!file_exists($filename) || !is_readable($filename)) {
  die("CSV-bestand niet gevonden of niet leesbaar.\n");
}

$data = [];

if (($handle = fopen($filename, 'r')) !== false) {
  $rawHeader = fgets($handle);
  $rawHeader = preg_replace('/^\xEF\xBB\xBF/', '', $rawHeader);
  $header = str_getcsv($rawHeader, ',', '"', '\\');

  while (($row = fgetcsv($handle, 0, ',', '"', '\\')) !== false) {
    if (count(array_filter($row, function($v){ return $v !== null && $v !== ''; })) === 0) {
      continue;
    }
    if (count($row) === count($header)) {
      $item = array_combine($header, $row);
      if ($item['_wpml_import_language_code'] !== 'fr') {
        $data[] = $item;
      }
    } else {
      error_log("warning: row with different column count on line " . (count($data)+2));
    }
  }
  fclose($handle);
}


$noEmoji = [];
$i = 0;
foreach ($data as $index => $row) {
  $content = $row['Content'];
  $hasBlockquote = hasBlockquote($content);
  $hasEmoji = hasEmoji($content);

  if ($hasEmoji || $hasBlockquote) {
    $i++;
    echo sprintf(
      'Record %s hasEmoji: %s and hasBlockquote: %s',
      $row['ID'],
      $hasEmoji ? 'yes' : 'no',
      $handle  ? 'yes' : 'no'
    ) . PHP_EOL;
  }
  if ($hasEmoji) {
    $content = replaceEmojiImagesWithUnicode($content);
  }

  $noEmoji[] = array_merge($row, ['Content' => htmlspecialchars($content, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')]);
}

echo $i . " items to be checked from total: " . count($data) . PHP_EOL;

//var_dump(
//  array_keys($data[0]),
//  $noEmoji
//);

//storeCSV(array_keys($data[0]), $noEmoji, 'no-emoji-img.csv');

function hasBlockquote(string $html): bool
{
//  return stripos($html, '<blockquote') !== false;
  return stripos($html, '&lt;blockquote') !== false;
}

function hasEmoji(string $html): bool
{
  return preg_match(
      '/<img[^>]*class="emoji"[^>]*src="https:\/\/codimd\.adfinis\.com\/build\/emojify\.js\/[^"]+"[^>]*>/i',
      $html
    ) === 1;
}

function replaceEmojiImagesWithUnicode(string $html): string
{
  return preg_replace_callback(
    '/<img[^>]*class="emoji"[^>]*src="https:\/\/codimd\.adfinis\.com\/build\/emojify\.js\/[^"]+"[^>]*alt="([^"]+)"[^>]*>/i',
    function ($matches) {
      $emojiMap = [
        ':bulb:' => '💡',
        ':warning:' => '⚠️',
        ':rocket:' => '🚀',
      ];

      return $emojiMap[$matches[1]] ?? $matches[1]; // fallback: alt tekst
    },
    $html
  );
}

function storeCSV(array $header, array $data, string $filename): void
{
  $fp = fopen($filename, 'w');
  fputcsv($fp, $header, ',', '"', '\\');
  foreach ($data as $row) {
    fputcsv($fp, $row, ',', '"', '\\');
  }
  fclose($fp);
  echo "CSV exported to {$filename}\n" . PHP_EOL;
}
