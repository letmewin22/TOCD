<div class="slideshow-wrapper">
  <div class="slideshow__content">
    <div class="slideshow">
      <?php
    $terms = get_terms(['taxonomy' => 'intreview_photo_tax', 'name' => get_the_title(), 'pad_counts' => 1, 'parent' => 0, 'hide_empty' => false, ]);
    foreach ($terms as $term):
        $args = ['post_type' => 'interview_photo', 'orderby' => 'id', 'order' => 'ASC', 'tax_query' => [['taxonomy' => 'intreview_photo_tax', 'field' => 'term_id', 'terms' => $term->term_id, 'include_children' => false, ], ], ];
        $posts_with_term = new WP_Query($args);
        while ($posts_with_term->have_posts()):
            $posts_with_term->the_post(); ?>
      <div class="slide">
        <div class="slide__wrap">
          <div class="slide__img" style="background-image: url(<?php echo get_field('фото');?>);"></div>
          <div class="slide__title-wrap"></div>
        </div>
      </div>
      <?php
      endwhile;
      wp_reset_postdata();
  endforeach;
  ?>
    </div>
    <!-- /slideshow -->
    <nav class="boxnav">
      <div class="container">
        <div class="boxnav__item boxnav__item--prev">
          <svg class="icon icon--caret" fill="#D3D1CF">
            <path
              d="M5.41406 10.6094L5.88281 10.1641C5.97656 10.0469 5.97656 9.85938 5.88281 9.76562L1.64062 5.5L5.88281 1.25781C5.97656 1.16406 5.97656 0.976562 5.88281 0.859375L5.41406 0.414062C5.29688 0.296875 5.13281 0.296875 5.01562 0.414062L0.09375 5.3125C0 5.42969 0 5.59375 0.09375 5.71094L5.01562 10.6094C5.13281 10.7266 5.29688 10.7266 5.41406 10.6094Z" />
          </svg>
        </div>
        <div class="boxnav__item boxnav__item--next">
          <svg class="icon icon--caret-rot" fill="white">
            <path
              d="M0.5625 0.414062L0.09375 0.859375C0 0.976562 0 1.16406 0.09375 1.25781L4.33594 5.5L0.09375 9.76562C0 9.85938 0 10.0469 0.09375 10.1641L0.5625 10.6094C0.679688 10.7266 0.84375 10.7266 0.960938 10.6094L5.88281 5.71094C5.97656 5.59375 5.97656 5.42969 5.88281 5.3125L0.960938 0.414062C0.84375 0.296875 0.679688 0.296875 0.5625 0.414062Z" />
          </svg>
        </div>
      </div>
      <div class="boxnav__item--label">
        <div class="boxnav__label--current">1</div>
        <div class="boxnav__label boxnav__label--total"></div>
      </div>
    </nav>
  </div>
  <div class="slideshow-close">
    <svg width="9" height="9" viewBox="0 0 9 9" fill="#205A8E" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M0.115172 8.04797C-0.0371323 8.20027 -0.0371324 8.44721 0.115172 8.59951L0.355589 8.83993C0.507893 8.99223 0.754828 8.99223 0.907132 8.83993L4.4771 5.26996L8.04797 8.84083C8.20027 8.99314 8.4472 8.99314 8.59951 8.84083L8.83993 8.60042C8.99223 8.44811 8.99223 8.20118 8.83992 8.04887L5.26906 4.478L8.84087 0.906188C8.99317 0.753883 8.99317 0.506949 8.84087 0.354645L8.60045 0.114228C8.44815 -0.0380762 8.20121 -0.038076 8.04891 0.114228L4.4771 3.68604L0.906188 0.115134C0.753883 -0.03717 0.506949 -0.0371701 0.354645 0.115134L0.114228 0.355551C-0.0380762 0.507855 -0.038076 0.75479 0.114228 0.907094L3.68514 4.478L0.115172 8.04797Z" />
    </svg>
  </div>
</div>