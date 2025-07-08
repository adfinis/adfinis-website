<?php
// 1. XML inladen (pas pad aan indien nodig)
$xml = simplexml_load_file(__DIR__ . '/export.xml', 'SimpleXMLElement', LIBXML_NOCDATA);

// Namespaces registreren voor content en excerpt
$xml->registerXPathNamespace('content','http://purl.org/rss/1.0/modules/content/');
$xml->registerXPathNamespace('excerpt','http://wordpress.org/export/1.2/excerpt/');
$xml->registerXPathNamespace('wp','http://wordpress.org/export/1.2/');

// 2. Loop over items
foreach ($xml->channel->item as $item) {
  // 2a. Check of het een "news"-item is
  $isNews = false;
  foreach ($item->category as $cat) {
    $attrs = $cat->attributes();
    if ((string)$attrs['domain'] === 'category' && (string)$attrs['nicename'] === 'news') {
      $isNews = true;
      break;
    }
  }
  if (! $isNews) {
    continue;
  }

  // 2b. Velden uit XML halen
  $title   = trim((string)$item->title);
  $excerpt = trim((string)$item->children('http://wordpress.org/export/1.2/excerpt/')->encoded);
  $slug    = trim((string)$item->children('http://wordpress.org/export/1.2/')->post_name);
  if ($slug === '') {
    // fallback: maak slug van title
    $slug = strtolower(preg_replace('/[^A-Za-z0-9]+/', '-', $title));
    $slug = trim($slug, '-');
  }
  $content = trim((string)$item->children('http://purl.org/rss/1.0/modules/content/')->encoded);

  // 2c. Reading time uit Yoast-meta halen (of default 0)
  $minutesRead = 0;
  foreach ($item->xpath('wp:postmeta') as $meta) {
    if ((string)$meta->meta_key === '_yoast_wpseo_estimated-reading-time-minutes') {
      $minutesRead = (int)$meta->meta_value;
      break;
    }
  }

  // 3. Payload voor Strapi samenstellen
  $payload = [
    'data' => [
      'metadata_title'       => $title,
      'metadata_description' => $excerpt,
      'slug'                 => $slug,
      'card_title'           => $title,
      'card_subtitle'        => $title,
      'minutes_read'         => $minutesRead,
      'main_blog'            => $content,
    ],
  ];

  // 4. POST naar Strapi
  $ch = curl_init('http://localhost:1337/api/news-pages?locale=en');
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
  ]);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

  $response = curl_exec($ch);
  if ($response === false) {
    fwrite(STDERR, "Error migrating '{$title}': " . curl_error($ch) . PHP_EOL);
  } else {
    echo "Migrated: {$title}\n";
    var_dump($response);
  }
  curl_close($ch);
}
