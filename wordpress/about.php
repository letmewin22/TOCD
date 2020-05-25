<?php
/*
Template Name: About
*/
get_header();
?>
<div class="site-wrapper" data-router-wrapper>
  <div data-router-view="about">
<header class="about-header">
  <div class="container">
    <h1 class="about-h"><?php echo get_field('заголовок');?></h1>
  </div>
</header>
<main>
  <section class="section about-section">
    <div class="container">
      <div class="about-section__right">
        <h3 class="about-section__left-content"><?php echo get_field('vtoroj_zagolovok');?></h3>
        <div class="about-section__right-content">
          <p><?php echo get_field('vtoraja_sekcija_tekst');?></p>
        </div>
      </div>
    </div>
    <div class="container with-margin">
      <div class="about-section__right">
        <h3 class="about-section__left-content"><?php echo get_field('tretja_sekcija_zagolovok');?></h3>
        <div class="about-section__right-content">
        <p>
        <?php echo get_field('tretja_sekcija_pervyj_abzac');?>
        </p>
        <p class="with-margin">
        <?php echo get_field('tretja_sekcija_vtoroj_abzac');?>
        </p>
        </div>
      </div>
    </div>
  </section>
  <section class="section h2-section">
  <div class="container">
    <h2 class="about-h about-h2"><?php echo get_field('bolshoj_zagolovok');?></h2>
  </div>
  </section>
  <section class="section team-section">
    <div class="container">
      <div class="team-section__wrapper">
      <?php   
          $args = array(
            'post_type' => 'team',
            'posts_per_page' => 5,
            'order' => 'ASC'
          );    
          $my_query = new WP_Query( $args ); 
            if ( $my_query->have_posts() ) {
              while ( $my_query->have_posts() ) {
                  $my_query->the_post();
          ?>
        <div class="team-section__item">
          <div class="team-section__img" style="background-image: url(<?php echo get_field('фото_участника');?>)"></div>
          <h4 class="team-section__name"><?php echo get_field('имя_участника');?></h4>
          <span class="team-section__occupation"><?php echo get_field('род_деятельности_участника');?></span>
        </div>
        <?php             
        }  
      }       
      wp_reset_postdata(); 
    ?>
      </div>
    </div>
  </section>
  <section class="section about-section">
    <div class="container">
      <div class="about-section__right">
        <h3 class="about-section__left-content"><?php echo get_field('pjataja_sekcija_zagolovok');?></h3>
        <div class="about-section__right-content">
          <?php echo get_field('pjataja_sekcija_pervyj_abzac');?>
          <img class="team-img" src="<?php echo get_field('pjataja_sekcija_foto');?>" alt="hexagon-team">
          <p class="with-margin"><?php echo get_field('pjataja_sekcija_vtoroj_abzac');?></p>
        </div>
      </div>
    </div>
        <div class="container with-margin">
      <div class="about-section__right">
        <h3 class="about-section__left-content"><?php echo get_field('shestaja_sekcija_zagolovok');?></h3>
        <div class="about-section__right-content">
        <?php echo get_field('shestaja_sekcija_abzac');?>
        </div>
      </div>
    </div>
    <div class="container with-margin">
      <div class="about-section__right">
        <h3 class="about-section__left-content">Ми в соцмережах</h3>
        <div class="about-section__right-content">
          <a href="<?php echo get_option('site_fb');?>" target="_blank" rel="noopener noreferrer" class="about-section__social link">Facebook</a>
          <a href="<?php echo get_option('site_insta');?>" target="_blank" rel="noopener noreferrer" class="about-section__social link">Instagram</a>
        </div>
      </div>
    </div>
    <div class="container with-margin">
      <div class="about-section__right">
        <h3 class="about-section__left-content">Співпраця</h3>
        <div class="about-section__right-content">
          <span class="medium">Для співпраці зв’яжіться, будь ласка, <span><a class="link" href="<?php echo get_option('site_contact');?>" target="_blank" rel="noopener noreferrer">з <span><?php echo get_field('imja_cheloveka_dlja_svjazi');?></span></a></span></span>
        </div>
      </div>
    </div>
        <div class="container with-margin">
      <div class="about-section__right">
        <h3 class="about-section__left-content">Розробка сайту</h3>
        <div class="about-section__right-content">
         <span><a class="link" href="https://hexagon.agency" target="_blank" rel="noopener noreferrer">Hexagon Agency</a></span>
        </div>
      </div>
    </div>
  </section>
</main>
<footer class="about-footer">
  <div class="container">
  <span class="rights">© 2020 Час зачинених дверей</span>
  </div>
</footer>
<?php get_footer(); ?>