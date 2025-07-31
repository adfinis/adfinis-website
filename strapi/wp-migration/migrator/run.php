<?php

class Migrator
{
  private const DEBUG = true;
  private array $rawData = [];
  private array $groupedByLocale = [];
  private array $wpUploadedFiles = [];
  private array $wpUploadedFilesMappedWithStrapi = [];
  private array $newsPosts = [];
  private array $blogPosts = [];

  public function __construct(
  )
  {
    $this->run();
  }

  private function run(): void
  {
    $this
      ->loadCsv('Posts-Export-2025-July-29-2150.csv')
      ->stripLocales('fr')
      ->downloadImages('assets/images')
      ->downloadAttachments('assets/attachments')
      ->groupRawDataByLocale()
      ->splitByCategoryNewsOrBlog()
      ->getStrapiWpUploadsMap()
      ->prepContent()
    ;
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

    $this->wpUploadedFiles[md5($url)] = [
      'wp_upload_url' => $url,
      'wp_upload_file' => $filename
    ];

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

  private function downloadAttachments(string $path)
  {
    $grouped = [];
    foreach ($this->rawData as $row) {
      if (empty($row['Attachment ID'])) {
        continue;
      }
      $ids = explode('|', $row['Attachment ID']);
      $urls = explode('|', $row['Attachment URL']);

      foreach (array_combine($ids, $urls) as $id => $url) {
        $hash = md5($url);
        if (!isset($grouped[$hash])) {
          $grouped[$hash] = [
            'url' => $url,
            'ids' => [],
          ];
        }
        $grouped[$hash]['ids'] = array_unique(array_merge($grouped[$hash]['ids'], [$id]));
      }
    }

    foreach ($grouped as $group) {
      $this->checkAndOrDownloadAttachment($path, $group['url']);
    }

    return $this;
  }

  private function checkAndOrDownloadAttachment(string $path, string $url)
  {
    $saveDir = __DIR__ . '/' . $path;

    if (!is_dir($saveDir)) {
      mkdir($saveDir, 0755, true);
    }

    $filename = basename(parse_url($url, PHP_URL_PATH));

    $this->wpUploadedFiles[md5($url)] = [
      'wp_upload_url' => $url,
      'wp_upload_file' => $filename
    ];

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

    if ($isSuccessful) {
      file_put_contents($saveDir . '/' . $filename, $response);
    }

    return $isSuccessful;
  }

  private function groupRawDataByLocale(): self
  {
    foreach ($this->rawData as $row) {
      $this->groupedByLocale[$row['_wpml_import_translation_group']][] = $row;
    }

    return $this;
  }

  private function splitByCategoryNewsOrBlog(): self
  {
    foreach ($this->groupedByLocale as $translationId => $group) {
      if (str_contains($group[0]['Categories'], 'blog')){
        $this->blogPosts[] = $group;
      } else {
        $this->newsPosts[] = $group;
      }
    }

    return $this;
  }

  private function prepContent(): self
  {
    foreach ($this->newsPosts as $index => $group) {
      foreach ($group as $groupIndex => $row) {
        $newRow = $this->replaceWpUploadsUrls($row);
        $this->newsPosts[$index][$groupIndex] = $newRow;
      }
    }

    foreach ($this->blogPosts as $index => $group) {
      foreach ($group as $groupIndex => $row) {
        $newRow = $this->replaceWpUploadsUrls($row);
        $this->blogPosts[$index][$groupIndex] = $newRow;
      }
    }

    var_dump($this->newsPosts);

    return $this;
  }

  private function replaceWpUploadsUrls(array $row): array
  {
    $hasMedia = false;
    if ($row['Image URL'] !== '') {
      $hasMedia = true;
    }

    if ($row['Attachment URL'] !== '') {
      $hasMedia = true;
    }

    if ($hasMedia) {
      $content = $row['Content'];

      foreach ($this->wpUploadedFilesMappedWithStrapi as $item) {
        $content = str_replace($item['find'], $item['replace'], $content);
      }

      $row['Content'] = $content;
    }
    return $row;
  }

  private function hasParagraphs(string $content): bool
  {
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($content);
    libxml_clear_errors();

    $xpath = new DOMXPath($dom);
    $paragraphs = $xpath->query('//p');

    return $paragraphs->length > 0;
  }

  private function getStrapiWpUploadsMap(): self
  {
    $map = [];

    $endpoint = 'http://localhost:1337/api/upload/files';
    $strapiCache = __DIR__ . '/strapi-uploaded-files.json';

    if (!file_exists($strapiCache)) {
      $response = file_get_contents($endpoint);
      if ($response === false) {
        die("Error no response");
      }
      $strapiFiles = json_decode($response, true);
      if (!is_array($strapiFiles)) {
        die("Invalid JSON response");
      }
      file_put_contents($strapiCache, $response);
    } else {
      $response = file_get_contents($strapiCache);
      $strapiFiles = json_decode($response, true);
    }

    foreach ($strapiFiles as $file) {
      foreach ($this->wpUploadedFiles as $index => $wpFile) {
        if ($wpFile['wp_upload_file'] == $file['name']) {
          $map[] = [
            'find' => $wpFile['wp_upload_url'],
            'replace' => $file['url'],
          ];
          unset($this->wpUploadedFiles[$index]);
        }
      }
    }

    $this->wpUploadedFilesMappedWithStrapi = $map;

    return $this;
  }
}

(new Migrator());
