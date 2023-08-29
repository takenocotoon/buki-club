<!DOCTYPE html>
<html lang="ja">

<head>
<?php
    $date=date("ymdHis");
    $title='ブキあつめ部';
    $title_en='Weapon Collection Club';
    $description='ブキの熟練度★の取得状況をメモするツール';
    $url='https://takenocotoon.github.io/buki-stars/';
    $twitter='@takenocotoon';
    $theme_color='#6695e0';
    $cssPaths=['./css/style.css', 'https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css'];
    $modulePaths=['./js/main.js'];
    $scriptPaths=[];
    $base_folder='./';
    include(__DIR__ . '/parts/head.php');
?>
</head>

<body>
<div id="l-main-container">

<?php
    include(__DIR__ . '/parts/header.php');
    include(__DIR__ . '/parts/menu.php');
    include(__DIR__ . '/parts/contents.php');
    include(__DIR__ . '/parts/footer.php');
?>

</div>
</body>

</html>
