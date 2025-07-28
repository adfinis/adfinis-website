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
/*
 * ID
 * Date
 * Title
 * Slug
 * _wpml_import_language_code
 * _wpml_import_source_language_code
 * _wpml_import_translation_group
 * Categories
 * Tags
 * Status
 * "Image URL"
 * "Image Filename"
 * "Image Path"
 * "Image ID"
 * "Image Title"
 * "Image Caption"
 * "Image Description"
 * "Image Alt Text"
 * "Image Featured"
 * "Attachment URL"
 * "Attachment Filename"
 * "Attachment Path"
 * "Attachment ID"
 * "Attachment Title"
 * "Attachment Caption"
 * "Attachment Description"
 * "Attachment Alt Text"
 * Permalink
 * Content
 */

$images = [];
$i = 0;
foreach ($data as $index => $row) {
  if ("" !== $row['Image ID']) {
    $images[] = [
      'url' => $row['Image URL'],
      'ids' => $row['Image ID'],
    ];
  }
}

$list = [];
$total = [];
foreach ($images as $image) {
  $urls = explode('|', $image['url']);
  $ids = explode('|', $image['ids']);


  $total = array_merge($total, array_combine($ids, $urls));
}

var_dump(
  $images,
  $total,
  count(array_unique($total)),
);

$filenames = [];

$saveDir = __DIR__ . '/assets';

if (!is_dir($saveDir)) {
  mkdir($saveDir, 0755, true);
}

foreach (array_unique($total) as $id => $url) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_NOBODY, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
  curl_close($ch);

  if ($httpCode >= 200 && $httpCode < 300) {
    echo "$url => ✅ 2xx (Success)\n";

    $filename = basename(parse_url($url, PHP_URL_PATH));

    if (!pathinfo($filename, PATHINFO_EXTENSION)) {
      if (str_contains($contentType, 'image/jpeg')) {
        $filename .= '.jpg';
      } elseif (str_contains($contentType, 'image/png')) {
        $filename .= '.png';
      } elseif (str_contains($contentType, 'image/gif')) {
        $filename .= '.gif';
      } else {
        $filename .= '.bin'; // fallback
      }
    }
    file_put_contents($saveDir . '/' . $filename, $response);
    echo "  ➜ Opgeslagen als ./assets/$filename\n";
    $filenames[$id] = $filename;
  } elseif ($httpCode >= 400 && $httpCode < 500) {
    echo "$url => ⚠️ 4xx (Client error)\n";
  } elseif ($httpCode >= 500 && $httpCode < 600) {
    echo "$url => ❌ 5xx (Server error)\n";
  } else {
    echo "$url => ℹ️ Andere statuscode: $httpCode\n";
  }
}

var_dump($filenames);

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
