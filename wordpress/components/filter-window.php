<div class="filter-window">
  <div class="filter-window__loader">
    <svg width="2000" height="2000" viewBox="0 0 2000 2000" stroke="#DBDBE0" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="1000" cy="1000" r="500" stroke-width="1000" />
    </svg>
  </div>
  <div class="filter-window__items">
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
    <a href="<?php the_permalink();?>" class="filter-window__item is-visible" data-transition="toInterview"
      data-city="<?php echo get_field('город');?>" data-occupation="<?php echo get_field('сфера_деятельности');?>" data-key="<?php echo get_field('ключевое_слово');?>">
      <div class="filter-window__text">
        <h2 class="filter-window__h2 br"><?php echo the_title();?></h2>
        <p class="filter-window__description"><?php echo get_field('описание');?></p>
      </div>
      <div class="filter-window__image" data-bglazy="<?php echo get_template_directory_uri()?>/img/3.jpg"></div>
    </a>
    <?php             
        }            
      }       
      wp_reset_postdata(); 
    ?>
  </div>
</div>