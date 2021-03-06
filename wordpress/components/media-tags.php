<!DOCTYPE html>
<html lang="uk" class="custom">

<head>
  <meta charset="utf-8">
  <title><?php echo get_field('заголовок_страницы');?></title>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="viewport"
    content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1  maximum-scale=1, user-scalable=no">
  <meta name="theme-color" content="#131116">
  <link rel="icon" href="<?php echo get_template_directory_uri()?>/img/metaimgs/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" type="image/x-icon"
    href="<?php echo get_template_directory_uri()?>/img/metaimgs/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri()?>/img/metaimgs/1024x1024.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?php echo get_field('заголовок_страницы');?>">
  <meta name="twitter:description" content="<?php echo get_field('описание_страницы');?>">
  <meta name="twitter:image" content="<?php echo get_template_directory_uri()?>/img/metaimgs/1200x630.png">
  <meta name="description" content="<?php echo get_field('описание_страницы');?>">
  <meta property="og:title" content="<?php echo get_field('заголовок_страницы');?>">
  <link rel="stylesheet" media="all" href="<?php echo get_template_directory_uri()?>/css/app.css">
</head>