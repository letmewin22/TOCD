<?php $url = get_page_link();?>

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