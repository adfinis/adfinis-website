<?php
$filename = 'snippet.csv';

if (!file_exists($filename) || !is_readable($filename)) {
  die("CSV-bestand niet gevonden of niet leesbaar.\n");
}

$data = [];
$skipped = [];

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
      } else {
        $skipped[] = $item;
      }
    } else {
      error_log("warning: row with different column count on line " . (count($data)+2));
    }
  }
  fclose($handle);
}

//echo "<pre>";
//print_r($data);
//echo "</pre>";

foreach ($data as $index => $row) {
  // Haal de gewenste velden op
  $category  = $row['Categories'] ?? '';   // fallback naar lege string als key ontbreekt
  $permalink = $row['Permalink']  ?? '';

  // Verwerk ze bijvoorbeeld door ze af te drukken
//  echo sprintf(
//    "Record %d: Category = %s, Permalink = %s\n",
//    $index + 1,
//    $category,
//    $permalink
//  );
//    echo sprintf(
//    "Record %d: Status = %s, Permalink = %s\n",
//    $index + 1,
//    $row['Status'],
//    $permalink
//  );
}
//


$grouped = [];

foreach ($data as $row) {
  // Haal de groeps-ID op (fallback naar lege string als key ontbreekt)
  $groupId = $row['_wpml_import_translation_group'] ?? '';

  if ($row['Status'] !== 'publish') {
    continue;
  }

  // Initialiseer de groep als deze nog niet bestaat
  if (!isset($grouped[$groupId])) {
    $grouped[$groupId] = [];
  }

//  if ($row['ID'] === '14233') {
//    var_dump($row);
//  }

  // Voeg alleen Categories en Permalink toe
  $grouped[$groupId][] = [
    'id' => $row['ID'] ?? '',
    'title' => $row['Title'] ?? '',
    'locale' => $row['_wpml_import_language_code'] ?? '',
    'slug' => $row['Slug'] ?? '',
    'permalink' => $row['Permalink'] ?? '',
    'categories' => $row['Categories'] ?? '',
    'status' => $row['Status'] ?? '',
    'image_urls' => $row['Image URL'] ?? '',
    'image_ids' => $row['Image ID'] ?? '',
    'image_titles' => $row['Image Title'] ?? '',
    'image_caption' => $row['Image Caption'] ?? '',
    'attachments' => $row['Attachment URL'] ?? '',
    'attachment_ids' => $row['Attachment ID'] ?? '',
    'attachment_titles' => $row['Attachment Title'] ?? '',
    'content' => $row['Content'] ?? '',
//    'Tags' => $row['Tags']
  ];
//  $grouped[$groupId][] = ['tag' => $row['Tags']];
}

//print_r($grouped);

$incomplete = [];

foreach ($grouped as $groupKey => $item) {
  if (count($item) < 3) {
    $incomplete[$groupKey] = $item;
  }
}

//print_r($incomplete);
//die;

$complete = array_diff_key($grouped, $incomplete);
print_r(
  [
    'total' => count($data),
    'skipped' => count($skipped),
    'grouped' => count($grouped),
    'incomplete' => count($incomplete),
    'complete' => count($complete),
  ]
);

//die();
//foreach ($complete as $groupKey => $items) {

$news = $blog = $uncategorized = [];

foreach ($complete as $groupKey => $items) {
  $newsItems = 0;
  $blogItems = 0;
  $maxItems = count($items);

  foreach ($items as $item) {
    if (
      str_contains(strtolower($item['Categories'] ?? ''), 'news')
    ) {
      $newsItems++;
    }

    if (
      str_contains(strtolower($item['Categories'] ?? ''), 'blog')
    ) {
      $blogItems++;
    }
  }

  if ($newsItems === $maxItems) {
    $news[] = $items;
    continue;
  }

  if ($blogItems === $maxItems) {
    $blog[] = $items;
    continue;
  }

  $uncategorized[] = $items;

//  if ($groupKey === 108293) {
//    var_dump($items, $groupKey);
//  }
}


//print_r($uncategorized);

$locales = ['en', 'nl', 'de'];
$header = [];
foreach ($locales as $loc) {
  $header[] = 'ID_' . $loc;
  $header[] = 'Title_' . $loc;
  $header[] = 'Permalink_' . $loc;
  $header[] = 'Slug_' . $loc;
}

/**
 * @param array $header
 * @param array $uncategorized
 * @param array $row
 * @return void
 */
function saveToCsv(array $header, array $data, string $filename): void
{
  $fp = fopen($filename, 'w');
  fputcsv($fp, $header, ',', '"', '\\');
  foreach ($data as $group) {
    $row = array_fill_keys($header, '');

    foreach ($group as $entry) {
      $loc = $entry['locale'];
      $row['ID_' . $loc] = $entry['id'];
      $row['Title_' . $loc] = $entry['title'];
      $row['Permalink_' . $loc] = $entry['permalink'];
      $row['Slug_' . $loc] = $entry['slug'];
    }

    $ordered = [];
    foreach ($header as $col) {
      $ordered[] = $row[$col];
    }
    fputcsv($fp, $ordered, ',', '"', '\\');
  }

  fclose($fp);

  echo "CSV exported to {$filename}.csv\n";
}

//saveToCsv($header, $uncategorized, 'normalized_uncategorized.csv');
//saveToCsv($header, $complete, 'normalized_complete.csv');
//saveToCsv($header, $incomplete, 'normalized_incomplete.csv');
//saveToCsv($header, $news, 'normalized_news.csv');
//saveToCsv($header, $blog, 'normalized_blog.csv');
saveToCsv($header, $grouped, 'normalized_grouped.csv');



