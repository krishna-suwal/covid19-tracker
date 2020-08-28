<?php

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
