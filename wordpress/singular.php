<?php
get_header();

$url = get_page_link();
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
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <article class="content" data-city='<?php echo get_field('город');?>'
        data-occupation="<?php echo get_field("сфера_деятельности");?>"
        data-key='<?php echo get_field('ключевое_слово');?>'>
        <div class="interview-header">
          <div class="container">
            <div class="interview-header__left">
              <div class="h1-wrapper">
                <h1 class="interview-header__h1 entry-title">
                  <?php $name = get_the_title();echo preg_replace('/\s+/', '<br>', $name);?></h1>
              </div>
              <div class="description-wrapper">
                <div class="interview-header__description"><?php echo get_field('описание');?></div>
              </div>
            </div>
            <div class="interview-header__right">
              <div class="interview-header__image-rewealer"></div>
              <div class="interview-header__image"
                style="background-image: url(<?php echo get_field('фото_на_первый_экран');?>);"></div>
            </div>
            <div class="interview-header__bottom">
              <span class="interview-header__location">Локація<br>
                <strong><?php echo get_field('город');?></strong>
              </span>
              <span class="interview-header__photograph">Фотограф<br>
                <strong><?php echo get_field('фотограф');?></strong>
              </span>
            </div>
          </div>
        </div>
        <div class="article">
          <div class="container">
            <div class="article__top">
              <div class="article__left">
                <div class="article__date"><?php echo get_field('дата_интервью');?></div>
                <div class="article-social article__social">
                  <a href="https://www.facebook.com/sharer.php?u=<?php echo $url;?>" target="_blank" rel="noopener noreferrer"
                    class="article-social__social-item article__social-item facebook">
                    <?php include get_theme_file_path( '/components/facebook.php' ); ?>
                  </a>
                  <a href="https://twitter.com/intent/tweet?url=<?php echo $url;?>" target="_blank" rel="noopener noreferrer"
                    class="article-social__social-item article__social-item twitter">
                    <?php include get_theme_file_path( '/components/twitter.php' ); ?>
                  </a>
                  <a href="https://t.me/share/url?url=<?php echo $url;?>" target="_blank" rel="noopener noreferrer"
                    class="article-social__social-item article__social-item telegram">
                    <?php include get_theme_file_path( '/components/telegram.php' ); ?>
                  </a>
                </div>
              </div>
              <div class="article__right">
              <?php the_content();?>
              </div>
            </div>
          </div>
          <div class="article__bottom">
            <div class="article__tags">
              <div class="article__tags-wrapper">
                <div class="article__tag by-city">Київ</div>
                <div class="article__tag by-occupation">Дизайн і розробка</div>
                <div class="article__tag by-key">Малий бізнес</div>
              </div>
            </div>
            <div class="article-social article__tags-social">
              <a href="https://www.facebook.com/sharer.php?u=<?php echo $url;?>" target="_blank" rel="noopener noreferrer" class="article-social__social-item facebook">
                <?php include get_theme_file_path( '/components/facebook.php' ); ?>
              </a>
              <a href="https://twitter.com/intent/tweet?url=<?php echo $url;?>" target="_blank" rel="noopener noreferrer" class="article-social__social-item twitter">
                <?php include get_theme_file_path( '/components/twitter.php' ); ?>
              </a>
              <a href="https://t.me/share/url?url=<?php echo $url;?>" target="_blank" rel="noopener noreferrer" class="article-social__social-item telegram">
                <?php include get_theme_file_path( '/components/telegram.php' ); ?>
              </a>
            </div>
          </div>
        </div>
        <?php include get_theme_file_path( '/components/slider.php' ); ?>
      </article>
      <?php endwhile; else : ?>
      <p>Записей нет.</p>
      <?php endif; ?>
    </div>
    <?php get_footer(); ?>