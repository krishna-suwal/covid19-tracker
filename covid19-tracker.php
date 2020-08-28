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

class C19T_Shortcodes {
	public static $shortcodes = array(
		'c19t_map'   => array(
			'script'   => 'main',
			'callback' => 'c19t_render_map',
		),
		'c19t_table' => array(
			'script'   => 'main',
			'callback' => 'c19t_render_table',
		),
		'c19t_graph' => array(
			'script'   => 'main',
			'callback' => 'c19t_render_graph',
		),
	);
}

add_action(
	'init',
	function() {
		// React Assets.
		$react_js     = includes_url( 'js/dist/vendor/react.min.js' );
		$react_dom_js = includes_url( 'js/dist/vendor/react-dom.min.js' );

		wp_register_script( 'c19t-react-js', $react_js, array(), '16.9.0', true );
		wp_register_script( 'c19t-react-dom-js', $react_dom_js, array(), '16.9.0', true );
	}
);

function c19t_enqueue_shortcode_script( $shortcode ) {
	$shortcode = C19T_Shortcodes::$shortcodes[ $shortcode ];

	// Local Assets.
	$c19t_js_asset_url  = sprintf( '%s/%s.js', C19T_JS_DIR_URL, $shortcode['script'] );
	$c19t_css_asset_url = sprintf( '%s/%s.css', C19T_CSS_DIR_URL, $shortcode['script'] );

	wp_enqueue_script( 'c19t-js', $c19t_js_asset_url, array( 'c19t-react-js', 'c19t-react-dom-js' ), false, true );
	wp_enqueue_style( 'c19t-css', $c19t_css_asset_url );
}

function c19t_render_map( $atts ) {
	c19t_enqueue_shortcode_script( 'c19t_map' );

	return '<div id="c19t-map-container">Covid19 map should render here.</div>';
}

function c19t_render_table( $atts ) {
	c19t_enqueue_shortcode_script( 'c19t_table' );

	return '<div id="c19t-table-container">Covid19 table should render here.</div>';
}

function c19t_render_graph( $atts ) {
	c19t_enqueue_shortcode_script( 'c19t_graph' );

	return '<div id="c19t-graph-container">Covid19 graph should render here.</div>';
}

function c19t_register_shortcodes( $shortcodes ) {
	foreach ( $shortcodes as $shortcode => $args ) {
		add_shortcode( $shortcode, $args['callback'] );
	}
}
c19t_register_shortcodes( C19T_Shortcodes::$shortcodes );
