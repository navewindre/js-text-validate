//true = set color to the specified on failed check
const CLR_INVALID_ENABLE = true;
const CLR_INVALID_INPUT  = "#ff0000";
const CLR_VALID_INPUT	 = "#000000";

class c_validate {
	//dumb
	constructor( classname, 
		min_length, 
		censored, 
		required ) {
		assert( Array.isArray( censored ), "censored must be an array" );
		assert( Array.isArray( required ), "required must be an array" );
		assert( classname.length != 0, 	   "class name cant be empty" );
        	assert( min_length >= 0,           "min length must be > 0" );
		
		this.m_classname  = classname;
		this.m_min_length = min_length;
		this.m_censored   = censored;
		this.m_required   = required;
		
		this.m_email 	  = false;
	}
	
	set_is_email( is ) {
		this.m_email = is;
	}
}

function invalid_msg( e, txt ) {
	alert( "error in: " + e.name + ": " + txt );
}

c_validate.prototype.check_object = function( e ) {
	var message = "";
	if( e.value.length < this.m_min_length ) {
		message = "text too short " + "(min: " + this.m_min_length + ")";
		invalid_msg( e, message ); return false;
	}
	
	for( var i = 0; i < this.m_censored.length; ++i ) {
		var str = this.m_censored[ i ];
		if( e.value.search( str ) != -1 ) {
			message = "string \"" + str + "\"" + " is not allowed";
			invalid_msg( e, message ); return false;
		}
	}
	
	for( var i = 0; i < this.m_required.length; ++i ) {
		var str = this.m_required[ i ];
		if( e.value.search( str ) == -1 ) {
			message = "must contain \"" + str + "\"";
			invalid_msg( e, message ); return false;
		}
	}
	
	if( this.m_email ) {
		var at = e.value.search( "@" );
		if( at == -1 ) {
			message = "enter a valid email";
			invalid_msg( e, message ); return false;
		}
	
		var e_domain = e.value.substring( at );
		var dot = e_domain.indexOf( "." );
		
		if( dot == -1 ) {
			message = "enter a valid email";
			invalid_msg( e, message ); return false;
		}
		
		var tld = e_domain.substring( dot );
		if( tld.length < 2 ) {
			message = "enter a valid email";
			invalid_msg( e, message ); return false;
		}
	}
	
	return true;
}

c_validate.prototype.validate = function( ) {
	var objects = document.querySelectorAll( this.m_classname );
	var ret     = true;
	
	for( var i = 0; i < objects.length; ++i ) {
		var it = objects[ i ];
		if( !this.check_object( it ) && CLR_INVALID_ENABLE ) {
			it.style.color = CLR_INVALID_INPUT;
			ret = false;
		}
		else
			it.style.color = CLR_VALID_INPUT;
	}
	
	return ret;
}
