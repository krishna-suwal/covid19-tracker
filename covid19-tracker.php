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
} else {
	define( 'C19T_JS_DIR_URL', plugin_dir_url( __FILE__ ) . 'assets/js' );
	define( 'C19T_CSS_DIR_URL', plugin_dir_url( __FILE__ ) . 'assets/css' );
}

require_once __DIR__ . '/_inc/hash-registry.php';
require_once __DIR__ . '/functions.php';

class C19T_Shortcodes {
	public static $shortcodes = array(
		'c19t_map'   => array(
			'script'   => 'map-view',
			'style'    => 'map-view',
			'callback' => 'c19t_render_map',
		),
		'c19t_table' => array(
			'script'   => 'table-view',
			'style'    => 'table-view',
			'callback' => 'c19t_render_table',
		),
		'c19t_graph' => array(
			'script'   => 'graph-view',
			'style'    => 'graph-view',
			'callback' => 'c19t_render_graph',
		),
	);
}

// Register Style and Scripts.
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

// Register Shortcodes.
c19t_register_shortcodes( C19T_Shortcodes::$shortcodes );
