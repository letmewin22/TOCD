<?php
get_header();
?>
<div class="site-wrapper" data-router-wrapper>
  <div data-router-view="interview">
    <div class="interview-randomizer">
      <div class="interview-randomizer__ui">
        <div class="interview-randomizer__filter-btn filter-btn">
          <?php include get_theme_file_path( '/components/filter-btn.php' ); ?>
        </div>
        <div class="interview-randomizer__random-btn">
          <?php include get_theme_file_path( '/components/random.php' ); ?>
        </div>
      </div>
      <div class="interview-randomizer__items">
        <div class="interview-randomizer__items-wrapper">
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
          <a href="<?php the_permalink();?>" class="interview-randomizer__item">
            <div class="interview-randomizer__photo">
              <div class="interview-randomizer__img" style='background-image: url(<?php echo get_field('аватарка');?>)'>
              </div>
            </div>
            <div class="interview-randomizer__text">
              <h3 class="interview-randomizer__header"><?php echo the_title();?></h3>
              <span class="interview-randomizer__description"><?php echo get_field('описание_короткое');?></span>
            </div>
          </a>
          <?php             
        }            
      }       
      wp_reset_postdata(); 
    ?>
        </div>
      </div>
    </div>
    <div id="articles">
      <?php get_template_part( 'components/post', get_post_format() ); ?>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <!-- <script type="text/javascript">

    jQuery(document).ready(function($) {
      var count = 2;
      // var total = <?php echo $wp_query -> max_num_pages; ?>;
      var total = 2;
      $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
          if (count > total) {
            return false;
          } else {
            loadArticle(count);
          }
          count++;
        }
      });

      function loadArticle(pageNumber) {
        $('a#inifiniteLoader').show('fast');
        $.ajax({
          url: "<?php echo admin_url(); ?>admin-ajax.php",
          type: 'POST',
          data: "action=infinite_scroll&page_no=" + pageNumber + '&loop_file=components/post',
          success: function(html) {
            $('li#inifiniteLoader').hide('1000');
            $("#articles").append(html);
          }
        });
        return false;
      }
    });
    </script> -->
    <?php get_footer(); ?>