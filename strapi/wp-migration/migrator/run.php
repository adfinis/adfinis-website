<?php

class Migrator
{
  public function __construct(
    private array $rawData = [],
  )
  {
    $this->run();
  }

  private function run(): void
  {
    $this
      ->loadCsv('Posts-Export-2025-July-29-1331.csv')
      ->stripLocales('fr');
    echo "Hoi";
    var_dump($this->rawData);
  }

  private function loadCsv(string $filename): self
  {
    if (!file_exists($filename) || !is_readable($filename)) {
      die("CSV-file not found or unreadable.\n");
    }

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
          $this->rawData[] = $item;
        } else {
          error_log("warning: row with different column count on line " . (count($this->rawData)+2));
        }
      }
      fclose($handle);
    }

    return $this;
  }

  private function stripLocales(string $locale): self
  {
    $data = [];
    foreach ($this->rawData as $row) {
      if ($row['_wpml_import_language_code'] !== $locale) {
        $data[] = $row;
      }
    }
    $this->rawData = $data;

    return $this;
  }
}

(new Migrator());
