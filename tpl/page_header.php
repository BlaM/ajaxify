<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?PHP echo $title ?: 'Ajaxifier Demo'; ?></title>
  </head>
  <body>

<nav data-ajaxlinks>
<span style="float:right;"><?PHP echo date('Y-m-d H:i:s'); ?></span><a href="index.php">Home</a> | <a href="secret.php">Secret</a>
</nav>