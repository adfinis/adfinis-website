<?php

class Migrator
{
  private const DEBUG = true;

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
      ->stripLocales('fr')
      ->downloadImages('assets/images');
      echo "Done";
//    var_dump($this->rawData);
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

  private function downloadImages(string $path): self
  {
    $rawImages = [];
    foreach ($this->rawData as $row) {
      if (empty($row['Image ID'])) {
        continue;
      }
      $ids = explode('|', $row['Image ID']);
      $urls = explode('|', $row['Image URL']);

      foreach (array_combine($ids, $urls) as $id => $url) {
        $hash = md5($url);
        if (!isset($rawImages[$hash])) {
          $rawImages[$hash] = [
            'url' => $url,
            'ids' => [],
          ];
        }
        $rawImages[$hash]['ids'] = array_unique(array_merge($rawImages[$hash]['ids'], [$id]));
      }
    }

    foreach ($rawImages as $rawImage) {
      $this->checkAndOrDownloadImage($path, $rawImage['url']);
    }

    return $this;
  }

  private function checkAndOrDownloadImage(string $path, string $url, bool $download = true): bool
  {
    $saveDir = __DIR__ . '/' . $path;

    if (!is_dir($saveDir)) {
      mkdir($saveDir, 0755, true);
    }

    $filename = basename(parse_url($url, PHP_URL_PATH));

    if (file_exists($saveDir . '/' . $filename)) {
      return true;
    }

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

    $isSuccessful = $httpCode >= 200 && $httpCode < 300;

    if (self::DEBUG) {
      if ($isSuccessful) {
        echo "{$url} => ✅ 2xx (Success)\n";
      } else {
        echo "{$url}: Error ({$httpCode})\n";
      }
    }

    if ($isSuccessful && $download) {
      if (!pathinfo($filename, PATHINFO_EXTENSION)) {
        if (str_contains($contentType, 'image/jpeg')) {
          $filename .= '.jpg';
        } elseif (str_contains($contentType, 'image/png')) {
          $filename .= '.png';
        } elseif (str_contains($contentType, 'image/gif')) {
          $filename .= '.gif';
        } else {
          $filename .= '.bin';
        }
      }
      file_put_contents($saveDir . '/' . $filename, $response);
    }

    return $isSuccessful;
  }
}

(new Migrator());
