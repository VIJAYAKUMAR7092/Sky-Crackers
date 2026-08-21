$files = @(
  "public/images/home/hero-night-explosion.jpg",
  "public/images/home/hero-golden-sparkler.jpg",
  "public/images/home/hero-family-festival.jpg",
  "public/images/home/hero-sivakasi-showcase.jpg"
)
$b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
$bytes = [Convert]::FromBase64String($b64)
foreach ($file in $files) {
  [System.IO.File]::WriteAllBytes("$PWD/$file", $bytes)
}
