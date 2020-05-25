<?php

function upload_allow_types( $mimes ) {
	// разрешаем новые типы
	$mimes['svg']  = 'text/plain'; // image/svg+xml
	$mimes['svg'] = 'image/svg+xml';
	$mimes['doc']  = 'application/msword'; 
	$mimes['woff'] = 'font/woff';
	$mimes['psd']  = 'image/vnd.adobe.photoshop'; 
	$mimes['djv']  = 'image/vnd.djvu';
	$mimes['djvu'] = 'image/vnd.djvu';

	return $mimes;
}
add_filter( 'upload_mimes', 'upload_allow_types' );

function mytheme_customize_register( $wp_customize ) {
	/*
	Добавляем секцию в настройки темы
	*/
	$wp_customize->add_section(
		'data_site_section',
		array(
			'title' => 'Даные о компании',
			'capability' => 'edit_theme_options',
			'description' => "Здесь можно указать данные о компании"
		)
	);

  		/*
	Добавляем поле фейсбук
	*/
	$wp_customize->add_setting(
		'site_fb',
		array(
			'default' => '',
			'type' => 'option'
		)
	);
	$wp_customize->add_control(
		'site_fb_control',
		array(
			'type' => 'text',
			'label' => "Ссылка на фейсбук",
			'section' => 'data_site_section',
			'settings' => 'site_fb'
		)
	);
		$wp_customize->add_setting(
		'site_insta',
		array(
			'default' => '',
			'type' => 'option'
		)
	);
	$wp_customize->add_control(
		'site_insta_control',
		array(
			'type' => 'text',
			'label' => "Ссылка на инстаграм",
			'section' => 'data_site_section',
			'settings' => 'site_insta'
		)
	);

	$wp_customize->add_setting(
		'site_contact',
		array(
			'default' => '',
			'type' => 'option'
		)
	);
	$wp_customize->add_control(
		'site_contact_control',
		array(
			'type' => 'text',
			'label' => "Контакт для связи",
			'section' => 'data_site_section',
			'settings' => 'site_contact'
		)
	);

	}
	add_action( 'customize_register', 'mytheme_customize_register' );



function onwp_disable_content_editor() {
	$post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;
	if( !isset( $post_id ) ) return;
	$template_file = get_post_meta($post_id, '_wp_page_template', true);
			if ( $template_file == 'about.php' ) {
			remove_post_type_support( 'page', 'editor' );
			} elseif ( $template_file == 'main.php' ){
				remove_post_type_support( 'page', 'editor' );
			} elseif ( $template_file == 'contacts.php' ){
				remove_post_type_support( 'page', 'editor' );
			} elseif ( $template_file == 'review.php' ){
				remove_post_type_support( 'page', 'editor' );
			} elseif ( $template_file == 'tour.php' ){
				remove_post_type_support( 'page', 'editor' );
			} elseif($template_file == 'singular.php'){
				remove_post_type_support( 'page', 'editor' );
			}
	}
add_action( 'admin_init', 'onwp_disable_content_editor' );


add_action('admin_menu', 'remove_admin_menu');
function remove_admin_menu() {
	remove_menu_page('edit.php'); // Посты блога
	remove_menu_page('edit-comments.php'); // Комментарии	

}

// //Infinite Scroll
// function wp_infinitepaginate(){
// 	$loopFile = $_POST['loop_file'];
// 	$paged = $_POST['page_no'];
// 	$action = $_POST['what'];
// 	$value = $_POST['value'];

// 	if($action == 'author_name'){
// 			$arg = array('author_name' => $value, 'paged' => $paged, 'post_status' => 'publish');
// 	} elseif ($action == 'category_name'){
// 			$arg = array('category_name' => $value, 'paged' => $paged, 'post_status' => 'publish' );
// 	} elseif ($action == 'search'){
// 			$arg = array('s' => $value, 'paged' => $paged, 'post_status' => 'publish' );
// 	} else {
// 			$arg = array('paged' => $paged, 'post_status' => 'publish');
// 	}
// 	# Load the posts
// 	query_posts(array('post_type' => 'interview', 'paged' => 1, 'post_status' => 'publish'));
// 	get_template_part( $loopFile );

// 	exit;
// }
// add_action('wp_ajax_infinite_scroll', 'wp_infinitepaginate'); // for logged in user
// add_action('wp_ajax_nopriv_infinite_scroll', 'wp_infinitepaginate'); // if user not logged in



?>