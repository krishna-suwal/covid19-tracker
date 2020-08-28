<?php

function c19t_prepare_data_attrs( $attrs = array() ) {
	$attrs        = (array) $attrs;
	$attrs_string = '';

	foreach ( $attrs as $key => $value ) {
		$attrs_string .= ' data-' . $key . '="' . esc_attr( $value ) . '" ';
	}
	return $attrs_string;
}

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

	$placeholder = 'Covid19 tracker map should appear here';
	$all_attrs   = c19t_prepare_data_attrs( $atts );

	return sprintf( '<div class="c19t-map-container" %s>%s</div>', $all_attrs, $placeholder );
}

function c19t_render_table( $atts ) {
	c19t_enqueue_shortcode_script( 'c19t_table' );

	$placeholder = 'Covid19 tracker table should appear here';
	$all_attrs   = c19t_prepare_data_attrs( $atts );

	return sprintf( '<div class="c19t-table-container" %s>%s</div>', $all_attrs, $placeholder );
}

function c19t_render_graph( $atts ) {
	c19t_enqueue_shortcode_script( 'c19t_graph' );

	$placeholder = 'Covid19 tracker graph should appear here';
	$all_attrs   = c19t_prepare_data_attrs( $atts );

	return sprintf( '<div class="c19t-graph-container" %s>%s</div>', $all_attrs, $placeholder );
}

function c19t_register_shortcodes( $shortcodes ) {
	foreach ( $shortcodes as $shortcode => $args ) {
		add_shortcode( $shortcode, $args['callback'] );
	}
}
