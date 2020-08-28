<?php

function c19t_get_hashed_assets() {
	$scripts = array(
		'graph-view' => '485633053120bf0f3e1c',
		'map-view'   => '5430325c820bc1594265',
		'table-view' => 'b062714cc1d199865142',
	);
	$styles  = array(
		'map-view'   => '965c1381bcba998d7b40',
		'table-view' => '11a47a5ef010d49caf51',
	);

	return array(
		'scripts' => $scripts,
		'styles'  => $styles,
	);
}
