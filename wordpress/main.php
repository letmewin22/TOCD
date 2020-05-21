<?php
/*
Template Name: Main
*/
get_header();
?>
<div class="site-wrapper" data-router-wrapper>
  <div data-router-view="main">
    <header class="header custom">
      <div class="header__clock">
        <?php include get_theme_file_path( '/components/clock.php' ); ?>
      </div>
      <div class="header__time-wrapper">
        <h1 class="header__time">
          <span class="days-1"></span>
          <span class="days-2"></span>
          <span class="dots">:</span>
          <span class="hours-1"></span>
          <span class="hours-2"></span>
          <span class="dots">:</span>
          <span class="minutes-1"></span>
          <span class="minutes-2"></span>
        </h1>
      </div>
      <div class="header__names">
        <div class="container">
          <div class="first-strip">
          <?php  
          $args = array(
              'post_type' => 'interview',
              'posts_per_page' => 150
          );    
          $my_query = new WP_Query( $args ); 
          if ( $my_query->have_posts() ) {
              while ( $my_query->have_posts() ) {
                  $my_query->the_post();
                  ?>
            <a data-transition="toInterview" href="<?php the_permalink();?>"
              class="header__name-wrapper is-visible default-layout">
              <h2 class="header__name br"><?php echo the_title();?></h2>
              <p class="header__description"><?php echo get_field('описание');?></p>
            </a>
            <?php             
                }            
              }      
            wp_reset_postdata(); 
            ?>
          </div>
        </div>
      </div>
    </header>
    <footer class="footer">
      <div class="container">
        <div class="footer__left">
          <a class="link" href="https://gate.agency/" target="_blank" rel="noopener noreferrer">© The Gate Agency</a>
        </div>
        <div class="footer__right">
          <span>Дизайн</span>
          <a class="link" href="https://hexagon.agency/" target="_blank" rel="noopener noreferrer">Hexagon Agency</a>
        </div>
      </div>
    </footer>
    <?php get_footer(); ?>