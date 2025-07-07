<?php
$filename = 'snippet.csv';

if (!file_exists($filename) || !is_readable($filename)) {
  die("CSV-bestand niet gevonden of niet leesbaar.\n");
}
error_log("wut");
$data = [];
if (($handle = fopen($filename, 'r')) !== false) {
  $rawHeader = fgets($handle);
  $rawHeader = preg_replace('/^\xEF\xBB\xBF/', '', $rawHeader);
  $header = str_getcsv($rawHeader, ',', '"', '\\');

  while (($row = fgetcsv($handle, 0, ',', '"', '\\')) !== false) {
    // Overslaan van volledig lege regels
    if (count(array_filter($row, function($v){ return $v !== null && $v !== ''; })) === 0) {
      continue;
    }
    // Alleen combineren als aantal kolommen klopt
    if (count($row) === count($header)) {
      $data[] = array_combine($header, $row);
    } else {
      // Hier kun je optioneel rijen met afwijkende kolom-aantallen loggen of corrigeren
      error_log("Waarschuwing: rij met afwijkend kolom-aantal op regel " . (count($data)+2));
    }
  }
  fclose($handle);
}

echo "<pre>";
  print_r($data);
echo "</pre>";

