
// -------------------------------------------
// -- Utility Class/Methods

function Util() {}

Util.disableTag = function( tag, isDisable )
{
	tag.prop('disabled', isDisable);
}

Util.sortByKey = function( array, key ) {
	return array.sort( function( a, b ) {
		var x = a[key]; var y = b[key];
		return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
	});
}

Util.trim = function( input )
{
	return input.replace( /^\s+|\s+$/gm, '' );
}

Util.stringSearch = function( inputString, searchWord )
{
	if( inputString.search( new RegExp( searchWord, 'i' ) ) == 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
}


// -------
// Check Variable or List Related

Util.getNotEmpty = function( input ) {

	if ( Util.checkDefined( input ) )
	{
		return input
	}
	else return "";
}

Util.checkDefined = function( input ) {

	if( input !== undefined && input != null ) return true;
	else return false;
}

Util.checkValue = function( input ) {

	if ( Util.checkDefined( input ) && input.length > 0 ) return true;
	else return false;
}

Util.checkDataExists = function( input ) {

	return Util.checkValue( input );
}

Util.checkData_WithPropertyVal = function( arr, propertyName, value ) 
{
	var found = false;

	if ( Util.checkDataExists( arr ) )
	{
		for ( i = 0; i < arr.length; i++ )
		{
			var arrItem = arr[i];
			if ( Util.checkDefined( arrItem[ propertyName ] ) && arrItem[ propertyName ] == value )
			{
				found = true;
				break;
			}
		}
	}

	return found;
}

Util.getFromListByName = function( list, name )
{
	var item;

	for( i = 0; i < list.length; i++ )
	{
		if ( list[i].name == name )
		{
			item = list[i];
			break;
		}
	}

	return item;
}

Util.getFromList = function( list, value, propertyName )
{
	var item;

	// If propertyName being compare to has not been passed, set it as 'id'.
	if ( propertyName === undefined )
	{
		propertyName = "id";
	}

	for( i = 0; i < list.length; i++ )
	{
		var listItem = list[i];

		if ( listItem[propertyName] == value )
		{
			item = listItem;
			break;
		}
	}

	return item;
}

// $.inArray( item_event.trackedEntityInstance, personList ) == -1

Util.checkExistInList = function( list, id, idPropertyName )
{
	var item = Util.getFromList( list, id, idPropertyName );

	if ( item === undefined ) return false;
	else return true;
}

Util.copyProperties = function( source, dest )
{
	for ( var key in source )
	{
		dest[ key ] = source[ key ];
	}
}

// Check Variable or List Related
// -------

// -------
// Seletet Tag Populate, Etc Related

Util.populateSelect = function( selectObj, selectName, json_Data )
{							
	selectObj.empty();

	selectObj.append( '<option value="">Select ' + selectName + '</option>' );

	if ( json_Data !== undefined )
	{
		$.each( json_Data, function( i, item ) {

			selectObj.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
		});
	}
}

Util.populateSelect_WithDefaultName = function( selectObj, selectName, json_Data, defaultName )
{
	selectObj.empty();

	selectObj.append( $( '<option value="">Select ' + selectName + '</option>' ) );

	$.each( json_Data, function( i, item ) {

		if( item.name == defaultName )
		{
			selectObj.append( $( '<option selected></option>' ).attr( "value", item.id ).text( item.name ) );
		}
		else
		{
			selectObj.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
		}
	});
}


Util.selectOption_WithOptionalInsert = function ( selectObj, id, list )
{
	if ( selectObj.find( "option" ).length > 0 )
	{
		selectObj.val( id );				
	}

	// If not found, add the item.
	if ( selectObj.val() != id )
	{
		if ( list !== undefined && list != null )
		{
			// If list is provided, get item (name & id pair) from the list
			var item = Util.getFromList( list, id );

			if ( item !== undefined )
			{
				selectObj.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
			}
		}
		else
		{
			// If list is not provided, simply add this id - as value & name
			selectObj.append( $( '<option></option>' ).attr( "value", id ).text( id ) );
		}

		selectObj.val( id );
	}
}


Util.setSelectDefaultByName = function( ctrlTag, name )
{
	ctrlTag.find( "option:contains('" + name + "')" ).attr( 'selected', true );
}

Util.getSelectedOptionName = function( ctrlTag )
{
	return ctrlTag.options[ ctrlTag.selectedIndex ].text;
}

// Seletet Tag Populate, Etc Related
// -------


// -------
// Write Message, Paint, Toggle Related

Util.write = function( data )
{
	$( "#testData" ).append( " [" + data + "] <br><br>" );
}


Util.paintControl = function( ctrlTarget, color ) 
{
	ctrlTarget.css( "background-color", color );
}


Util.paintWarning = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "LightCoral" );
}

Util.paintAttention = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "#CDEBFF" );
	//Util.paintControl( ctrlTarget, "#AFEEEE" );
}


Util.paintLightGreen = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "#EEFEEE" );
}
	

Util.paintClear = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "White" );
}
		

Util.paintResult = function( ctrlTarget, result ) 
{
	if( result )
	{
		Util.paintControl( ctrlTarget, "#BBEEBB" );
	}
	else 
	{
		Util.paintControl( ctrlTarget, "#FFFFFF" );
	}
}


Util.toggleTarget = function( toggleAnchor, target, expand )
{

	// If 'expand' it is defined, display accordingly.
	// If not, toggle based on current display setting.
	if ( expand !== undefined )
	{
		if ( expand )
		{
			target.show( "fast" );					
			toggleAnchor.text( '[-]' );
		}
		else
		{
			target.hide( "fast" );
			toggleAnchor.text( '[+]' );
		}
	}
	else
	{
		if( toggleAnchor.text() == '[+]' )
		{
			target.show( "fast" );					
			toggleAnchor.text( '[-]' );
		}
		else if( toggleAnchor.text() == '[-]' )
		{
			target.hide( "fast" );
			toggleAnchor.text( '[+]' );
		}
	}

	// remove the last url '#'
	//s = s.substring(0, s.length - 1) //removes last character
	//window.location.href
	//var thisUrl = $(this).data("url");

	// TEST THIS ON THUY EXAMPLE

	// Since this is Anchor, return false;
	//return false;
}

Util.setRowRemoval = function( trCurrent, runFunc )
{
	trCurrent.slideUp( 200, function() {

		trCurrent.remove();

		if ( runFunc !== undefined )
		{
			runFunc();
		}
	
	});
}

// Write Message, Paint, Toggle Related
// -------

Util.checkInteger = function( input )
{
	var intRegex = /^\d+$/;
	return intRegex.test( input );
}

Util.checkCalendarDateStrFormat = function( inputStr )
{
	if( inputStr.length == 10
		&& inputStr.substring(4, 5) == '/'
		&& inputStr.substring(7, 8) == '/'
		&& Util.checkInteger( inputStr.substring(0, 4) )
		&& Util.checkInteger( inputStr.substring(5, 7) )
		&& Util.checkInteger( inputStr.substring(8, 10) )
		)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// -------
// Date Formatting Related

Util.formatDate = function( strDate )
{
	var returnVal = "";

	if( strDate.length == 10 )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8);

		returnVal = year + "-" + month + "-" + date;
	}

	return returnVal;
}


Util.formatDateBack = function( strDate )
{
	if ( Util.checkValue( strDate ) )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8, 10);

		return year + "/" + month + "/" + date;
	}
	else
	{
		return "";
	}
}


Util.getDate_FromYYYYMMDD = function( strDate )
{
	var date;

	if ( Util.checkValue( strDate ) )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8, 10);

		date = new Date( year, month - 1, date );
	}

	return date;
}


Util.getDateStrYYYYMMDD_FromDate = function( date )
{
	return $.format.date( date, _dateFormat_YYYYMMDD);
}


Util.formatDate_LongDesc = function( date )
{
	return $.format.date( date, _dateFormat_DDMMMYYYY );
}

// Date Formatting Related
// -------


Util.setupDatePicker = function( ctrl, onSelectFunc, dateFormat, type )
{
	if ( !Util.checkValue( dateFormat ) )
	{
		dateFormat = _dateFormat_Picker_YYMMDD;
	}

	if ( !Util.checkDefined( onSelectFunc ) )
	{
		onSelectFunc = function() 
		{
			$( this ).focus();
		}
	}

	var maxDate = null;
	var yearRangeStr = "";
	var yearRangeStr = "";
	var currentYear = (new Date()).getFullYear();

	if ( type !== undefined && type == "birthdate" )
	{
		yearRangeStr = '1930:' + currentYear;
		maxDate = 0;
	}
	else if ( type !== undefined && type == "upToToday" )
	{
		yearRangeStr = '' + (currentYear - 15) + ':' + currentYear;
		maxDate = 0;
	}
	else
	{
		yearRangeStr = '' + (currentYear - 15) + ':' + (currentYear + 2);
	}

	// set Datepickers
	ctrl.datepicker( 
	{
		onSelect: onSelectFunc
		,beforeShow: function()
		{
			setTimeout( function() 
			{ 
				$( 'select.ui-datepicker-month' ).first().focus(); 

			}, 200 );
		}
		,dateFormat: dateFormat 
		,changeMonth: true
		,changeYear: true
		,yearRange: yearRangeStr
		,maxDate: maxDate
	});
}

// -------
// Non-Genertic Util Helper Methods

Util.setSelectTagOptions_YesNo = function( ctrlTag )
{
	ctrlTag.append('<option value="">[Please select]</option>');
	ctrlTag.append('<option selected="selected" value="true">Yes</option>');
	ctrlTag.append('<option value="false">No</option>');
}

Util.getStr_Views = function()
{
	return "input[" + _view + "='" + _view_Y + "'],select[" + _view + "='" + _view_Y + "']";
}


Util.setTabBackgroundColor_Switch = function( ctrlTags )
{

	ctrlTags.focus( function()
	{
		$( this ).closest( 'td' ).css('background-color', '#F7F7F7');
	});

	ctrlTags.focusout( function()
	{
		$( this ).closest( 'td' ).css('background-color', 'white');
	});

}

Util.getFormattedAttributeValue = function( attributeObj )
{
	var attributeValue = attributeObj.value;

	if ( attributeObj.type == "date" )
	{
		attributeValue = attributeValue.substring( 0, 10 );
	}

	return attributeValue;
}

Util.getNextRowFocus_Event = function( trCurrent )
{
	var nextRowEventTag;

	var trTable = trCurrent.closest( 'table' );
	var trCurrent_EventRowNo = parseInt( trCurrent.attr( 'eventrowno' ) );

	
	trTable.find( 'tr.trEventData' ).each( function()
	{
		var eventRowNo = parseInt( $( this ).attr( 'eventrowno' ) );

		if( eventRowNo > trCurrent_EventRowNo )
		{
			var list = $( this ).find( 'input,select' ).filter( ':visible' ).filter( ':enabled' );
			if ( list.length > 0 )
			{
				nextRowEventTag = list.first();
				return false;
			}
		}
	});

	
	// If next row active tags were not found, focus on the button.
	if ( nextRowEventTag === undefined )
	{
		var buttonTag = trTable.parent().find( '.personEvent_addNewRow' );

		if ( buttonTag.length == 1 )
		{
			nextRowEventTag = buttonTag;
		}
	}


	return nextRowEventTag;
}


Util.getNextRowFocus_Person = function( trCurrent )
{
	var nextRowPersonTag;

	var trTable = trCurrent.closest( 'table' );
	var trCurrent_PersonRowNo = trCurrent.attr( 'personrowno' );

	
	trTable.find( 'tr.trPerson' ).each( function()
	{
		var personRowNo = $( this ).attr( 'personrowno' );

		if( personRowNo > trCurrent_PersonRowNo )
		{
			var list = $( this ).find( 'input,select' ).filter( ':visible' ).filter( ':enabled' );
			if ( list.length > 0 )
			{
				nextRowPersonTag = list.first();
				return false;
			}
		}
	});


	// If next row active tags were not found, focus on the button.
	if ( nextRowPersonTag === undefined )
	{
		var buttonTag = $( '#person_addNewRow' );

		nextRowPersonTag = buttonTag;
	}


	return nextRowPersonTag;
}

