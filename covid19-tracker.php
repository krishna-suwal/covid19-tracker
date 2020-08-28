<?php
/**
 * Plugin Name: Covid19 Tracker
 * Plugin URI: https://wordpress.org/plugins/covid19-tracker/
 * Description: Embed covid 19 stats on your website.
 * Version: 1.0.0
 * Author: Krishna Suwal
 * Requires PHP: 5.6
 * Requires at least: 4.9
 * License: GPL-2.0+
 *
 * @package Covid19 Tracker
 */

if ( defined( 'C19T_ENV_DEV' ) && C19T_ENV_DEV ) {
	define( 'C19T_JS_DIR_URL', 'http://localhost:3000/static/js' );
	define( 'C19T_CSS_DIR_URL', 'http://localhost:3000/static/css' );

	define( 'C19T_MAIN_JS_ASSET_FILENAME', 'main.js' );
	define( 'C19T_MAIN_CSS_ASSET_FILENAME', 'main.css' );
} else {
	define( 'C19T_JS_DIR_URL', plugin_dir_url( __FILE__ ) . 'assets/js' );
	define( 'C19T_CSS_DIR_URL', plugin_dir_url( __FILE__ ) . 'assets/css' );

	define( 'C19T_MAIN_JS_ASSET_FILENAME', 'main.[].js' );
	define( 'C19T_MAIN_CSS_ASSET_FILENAME', 'main.[].css' );
}

function render_c19t( $atts ) {
	// React Assets.
	$react_js     = includes_url( 'js/dist/vendor/react.min.js' );
	$react_dom_js = includes_url( 'js/dist/vendor/react-dom.min.js' );

	// Local Assets.
	$c19t_js_asset_url  = C19T_JS_DIR_URL . '/' . C19T_MAIN_JS_ASSET_FILENAME;
	$c19t_css_asset_url = C19T_CSS_DIR_URL . '/' . C19T_MAIN_CSS_ASSET_FILENAME;

	wp_enqueue_script( 'c19t-react-js', $react_js, array(), '16.9.0', true );
	wp_enqueue_script( 'c19t-react-dom-js', $react_dom_js, array(), '16.9.0', true );
	wp_enqueue_script( 'c19t-js', $c19t_js_asset_url, array( 'c19t-react-js', 'c19t-react-dom-js' ), false, true );
	wp_enqueue_style( 'c19t-css', $c19t_css_asset_url );

	return '<div id="c19t-all-stats-container">wassup</div>';
}

add_shortcode( 'c19t_all_stats', 'render_c19t' );
