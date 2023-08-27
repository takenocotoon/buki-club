<meta charset="utf-8">
    <title><?php echo $title; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="og:title" content="<?php echo $title; ?>">
    <meta name="description"    content="<?php echo $description ?>">
    <meta name="og:description" content="<?php echo $description; ?>">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <link rel="canonical"      href="<?php echo $url; ?>">
    <link rel="INDEX" href="<?php echo $base_folder; ?>"><?php if (isset($start_file)) {
    echo "\n    <link rel=\"START\" href=\""  . $start_file . "\">"; } ?><?php if (isset($next_file)) {
    echo "\n    <link rel=\"NEXT\" href=\""  . $next_file . "\">"; } ?><?php if (isset($prev_file)) {
    echo "\n    <link rel=\"PREV\" href=\""  . $prev_file . "\">"; } ?><?php if (isset($contents_file)) {
    echo "\n    <link rel=\"CONTENTS\" href=\""  . $contents_file . "\">"; } ?><?php if (isset($chapter_file)) {
    echo "\n    <link rel=\"CHAPTER\" href=\""  . $chapter_file . "\">"; } ?><?php if (isset($section_file)) {
    echo "\n    <link rel=\"SECTION\" href=\""  . $section_file . "\">"; } ?><?php if (isset($gelp_file)) {
    echo "\n    <link rel=\"HELP\" href=\""  . $help_file . "\">"; } ?>
    <meta property="og:url" content="<?php echo $url; ?>">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="<?php echo $twitter; ?>">
    <meta name="theme-color" content="<?php echo $theme_color; ?>">
    <meta name="og:image"          content="<?php echo $url; ?>icon.png">
    <link rel="icon" type="image/png" href="<?php echo $base_folder; ?>favicon.png">
    <link rel="apple-touch-icon"      href="<?php echo $base_folder; ?>icon.png">
    <link rel="manifest" href="<?php echo $base_folder; ?>manifest.json">
<?php
foreach ($cssPaths as $path) {
    echo "    <link rel=\"stylesheet\" href=\"{$path}?{$date}\">\n";
} ?>
<?php
foreach ($modulePaths as $path) {
    echo "    <script type=\"module\" src=\"{$path}?{$date}\"></script>\n";
} ?>
<?php
foreach ($scriptPaths as $path) {
    echo "    <script src=\"{$path}?{$date}\"></script>\n";
} ?>
