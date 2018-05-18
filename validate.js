/*
js-text-validate
copyright 2018 navewindre
*/

var g_validate_list = [ ];

function validate_impl_field( name, min_length, censored, required ) {
	g_validate_list[ g_validate_list.length ] = new c_validate( name, min_length, censored, required );
}

function validate_impl_email( name, min_length, censored ) {
	var new_item = new c_validate( name, min_length, censored, [ ] );
	new_item.set_is_email( true );
	
	g_validate_list[ g_validate_list.length ] = new_item;
}

function validate_all( ) {
	var ret = true;
	
	for( var i = 0; i < g_validate_list.length; ++i ) {
		if( !g_validate_list[ i ].validate( ) )
			ret = false;
	}
	
	return ret;
}