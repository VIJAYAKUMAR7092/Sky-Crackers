$dirs = @(
  "public/images/home",
  "public/images/categories",
  "public/images/products",
  "public/images/banners"
)
foreach ($dir in $dirs) {
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
}

$files = @(
  "public/images/home/hero-bg.jpg",
  "public/images/home/about-legacy.jpg",
  "public/images/home/youtube-thumbnail.jpg",
  "public/images/categories/sparklers.jpg",
  "public/images/categories/flower-pots.jpg",
  "public/images/categories/rockets.jpg",
  "public/images/categories/chakkars.jpg",
  "public/images/categories/fancy-shots.jpg",
  "public/images/categories/sound-crackers.jpg",
  "public/images/categories/kids-collection.jpg",
  "public/images/categories/gift-boxes.jpg",
  "public/images/banners/diwali-offers.jpg",
  "public/images/banners/family-combos.jpg",
  "public/images/banners/bulk-orders.jpg"
)

$b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
$bytes = [Convert]::FromBase64String($b64)

foreach ($file in $files) {
  [System.IO.File]::WriteAllBytes("$PWD/$file", $bytes)
}
